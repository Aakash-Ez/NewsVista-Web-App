import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LatestNewsPage from "./pages/LatestNewsPage";
import AboutPage from "./pages/AboutPage";
import ArticlesPage from "./pages/ArticlesPage";
import BlindSpotPage from "./pages/BlindSpotPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import VoiceNavigation from "./components/VoiceNavigation";

const App: React.FC = () => {
  return (
    <Router>
      <VoiceNavigation />
      <div className="font-sans" style={{ width: "100vw", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/latest-news" element={<LatestNewsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/article" element={<ArticlesPage />} />
            <Route path="/blindspots" element={<BlindSpotPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;