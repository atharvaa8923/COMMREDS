import {Routes, Route} from "react-router-dom"
import LandingPage from "./pages/LandingPage";
import RoadmapsPage from "./pages/RoadmapsPage";
import RoadmapDetailsPage from './pages/RoadmapDetailsPage';
import HackathonsPage from "./pages/HackathonsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import MainLayout from "./layout/MainLayout";

const App = () => {
  return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element = {<RegisterPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/roadmaps" element={<RoadmapsPage />} />
        <Route path="/roadmaps/:id" element={<RoadmapDetailsPage />} />
        <Route path="/hackathons" element={<HackathonsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;