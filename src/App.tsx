import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Authorization from "@components/Authorization";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="Authorization" replace />} />
        <Route path="/authorization" element={<Authorization />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
