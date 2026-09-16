import { Route, Routes } from "react-router";

import { CaseStudyPage } from "../pages/CaseStudyPage";
import { HomePage } from "../pages/HomePage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/:slug" element={<CaseStudyPage />} />
    </Routes>
  );
}
