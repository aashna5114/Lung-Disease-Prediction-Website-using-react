import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header";
import Banner from "./components/banner";
import ApplicationForm from "./components/ApplicationForm";
import FacilitiesSection from "./components/FacilitiesSection";
import Dashboard from "./pages/dashboard";
import ConsultantsSection from "./components/ConsultantsSection";
import ClientFeedback from "./components/ClientFeedback";
import RecentResearchSection from "./components/RecentResearchSection";
import Blogs from "./pages/Blogs";
import Footer from "./components/Footer";

import 'bootstrap/dist/css/bootstrap.min.css';

function Layout() {
  const location = useLocation();
  const hideHeader = location.pathname === "/dashboard";

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Banner />
              <ApplicationForm />
              <FacilitiesSection />
              <ConsultantsSection />
              <ClientFeedback />
              <RecentResearchSection />
            </>
          } 
        />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>

      {!hideHeader && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
