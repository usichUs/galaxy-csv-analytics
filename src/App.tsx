import Base from "./layouts/Base";
import GeneratePage from "./pages/GeneratePage";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Base />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/generate-csv" element={<GeneratePage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
