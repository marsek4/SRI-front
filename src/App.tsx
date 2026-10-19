import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Authorization from "@components/Authorization";
import Overview from "@components/Overview";
import Notifications from "@components/Notifications";
import ProtectedLayout from "@components/ProtectedLayout";
import Laboratories from "@components/Laboratories";
import Experiments from "./components/Experiments";
import MyBookings from "./components/MyBookings";
import NewExperiment from "./components/NewExperiment";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="Authorization" replace />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/overview" element={<Overview />} />
          <Route path="/laboratories" element={<Laboratories />} />
          <Route path="/laboratories/:labId" element={<Laboratories />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route
            path="/experiments/new-experiment"
            element={<NewExperiment />}
          />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
