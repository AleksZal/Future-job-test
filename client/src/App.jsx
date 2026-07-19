import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Test from "./components/test";
import Results from "./components/results";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
