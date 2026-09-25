---
title: File Analysis Modernization
summary: I worked on turning an older browser-side pixel analysis into a reusable file-analysis package for PDF, PNG and JPEG, with clearer boundaries, safer processing and stronger verification.
role: Software Engineer
---

## Context

At Druckhaus Bochum GmbH we have applications where customers upload files that later need to be printed.

Before those files can be used for things like product classification and pricing, we need information about them: their physical size, how much printable content they contain, and whether that content is colored or grayscale.

The original implementation for this was much smaller and mainly focused on pixel analysis.

While working on it, it became clear that this was not really just a "count some pixels" problem. If the result influences later business logic, a wrong result that still looks valid can be worse than a clear failure.

That changed how I approached the modernization.

## What I wanted to improve

PDF, PNG and JPEG all come through the same upload flow, but technically they are very different.

PNG and JPEG already contain raster images, but they have different metadata and decoding behavior. A PDF can contain text, vectors, images, fonts, annotations and other resources that first have to be rendered before there are pixels to analyse.

I did not want every application using the analyzer to understand those details.

The application should give the package a file and receive either a useful result or a failure it can handle.

## The package boundary

The public API is intentionally small. Applications mainly work with `analyzeFile` and `analyzeFiles`.

The package owns things like file detection, decoding, PDF.js setup, WASM resources, processing limits and the actual analysis.

The application still owns its upload workflow, UI state, persistence and pricing logic.

This boundary became more important as the analyzer grew.

<!-- TODO: Replace this part with a proper architecture diagram later. -->

## Detecting the real file type

The package does not trust the filename or MIME type to decide what a file is.

It looks at the file content and detects PDF, PNG or JPEG from its binary signature.

This gives the rest of the system one normalized file type instead of letting different consumers guess it again from the extension or `file.type`.

Unsupported files return a structured failure.

## PDF

PDF became the most complicated format.

I separated the main PDF-analysis logic from PDF.js behind a runtime boundary. The analyzer decides how the document should be processed and how the result is built. PDF.js handles opening and rendering the actual PDF.

One important rule was that weaker hardware should not silently produce a lower-quality analysis.

Reducing the rendering resolution would make large PDFs easier to process, but it can also remove thin lines. That matters especially for technical drawings.

Large supported pages can therefore be rendered in smaller regions instead. Their statistics are combined afterwards, without changing the analysis resolution.

If a file still cannot be processed safely, the package returns a capacity failure instead of quietly changing the quality of the result.

## PNG

PNG changed quite a lot during this work.

The earlier implementation relied on the browser to decode the complete image. That was simple, but it also meant that memory use and parts of the decoding behavior were controlled by the browser.

I replaced that path with a package-owned `libspng` decoder compiled to WebAssembly and running inside a Worker.

PNG fits this approach well because it can be decoded progressively. The decoder processes scanlines, or passes for interlaced PNGs, and sends the pixel statistics forward without keeping the complete decoded image in memory.

The actual rules for calculating coverage still stay in TypeScript. The WASM part is responsible for decoding the PNG, not deciding what the pixels mean.

The same path is used for both smaller and larger supported PNG files. There is no second lower-quality mode and no downscaling.

This also gives the package control over processing limits and cancellation. If the user aborts the analysis, the Worker can be terminated.

## JPEG

JPEG uses a similar idea, but with a different decoder.

The current implementation uses package-owned `libjpeg-turbo` WebAssembly inside its own Worker instead of depending on the browser's native JPEG decoder.

The image is processed progressively in small row batches.

This gives the package more predictable decoding behavior across browsers and lets it control resource limits and cancellation itself.

## Coverage is not just one number

I ended up keeping two different ideas of coverage.

`pixelCoverage` is the simple one: a pixel either contains printable content or it does not.

That is useful for keeping very thin content such as CAD lines visible to the analysis.

But it also means that a very light gray pixel and a black pixel both count as covered.

`effectivePrintCoverage` also considers how strongly the pixel differs from white.

It is still an approximation, not a simulation of real ink or toner usage.

I deliberately keep these measurements separate from pricing rules. The package measures the file. The product decides what those measurements mean for pricing.

## Failures are part of the API

The underlying technologies can fail in many different ways.

PDF.js can fail while loading or rendering. A decoder can reject malformed input. WASM resources might not be available. A file might simply exceed the safe limits.

I did not want consumers to understand all of those internal errors.

The package maps them to a smaller set of stable failures such as unsupported files, malformed files, password-protected PDFs, capacity problems, rejected processing, cancellation or unexpected analysis failures.

The application can then decide how those should be shown to the user.

## Multiple files and cancellation

`analyzeFiles` can process a batch of files.

Files inside one batch are analysed sequentially and results stay in the same order as the input. One failed file does not stop the remaining files.

Separate batches are independent. If an application only wants one upload batch running at a time, that stays an application decision.

Cancellation is also part of the API. PDF processing receives the abort signal directly, while the JPEG and PNG Workers can be terminated.

## Verification

Testing became a large part of this work.

There are fixtures around PDF rendering, fonts, annotations, images, thin geometry, malformed files, PNG formats and interlacing, JPEG metadata, capacity limits and other cases that came up while developing the analyzers.

For browser-sensitive behavior I use Chromium, Firefox and Playwright WebKit.

I do not treat Playwright WebKit as proof that Safari on macOS or iOS behaves exactly the same. It is useful evidence, but it is not the same environment.

Another important check happens after the package is actually built and packed.

That verifies the artifact a consuming application receives, including PDF.js resources and the JPEG and PNG WASM Workers.

The packed package is also tested with the Vite versions used by the consuming applications.

## Current state

The main file-analysis architecture is now implemented, but I still consider the overall modernization ongoing.

The consumer migration and validation with representative production files still have to be completed.

PDF also has a few difficult cases where PDF.js can technically finish rendering while some internal fallback may still make the result less trustworthy than I want for this type of analysis.

I prefer keeping those limits explicit instead of treating every technically successful render as a trustworthy result.

## What I learned from it

At the beginning I mostly saw this as a file and pixel analysis task.

The deeper I got into it, the more important the boundaries became: what the package should own, what the application should own, what can actually be trusted, and when processing should stop instead of trying to produce a result at any cost.

One idea stayed especially important throughout the work:

If producing a result means silently changing what the analysis measures, returning no result can be the more correct solution.
