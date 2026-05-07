import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SplashCursor from "./components/SplashCursor";

function App() {
  return (
    <>
      <SplashCursor
        DENSITY_DISSIPATION={9}
        VELOCITY_DISSIPATION={8}
        PRESSURE={0.3}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={5}
        SHADING={true}
        RAINBOW_MODE={true}
        COLOR="#55f793"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
