import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Results from "./pages/Results";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Scholarships from "./pages/Scholarships";
import ScrollToTop from "./components/ScrollToTop";
import ScholarshipDetails from "./pages/ScholarshipDetails";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/scholarship/:id" element={<ScholarshipDetails />} />

        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/form" element={<Form />} />
        <Route path="/results" element={<Results />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;