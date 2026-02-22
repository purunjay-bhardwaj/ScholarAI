import { Link, useNavigate } from "react-router-dom";
import AvatarGroupDemo from "./AvatarGroupDemo";

export default function Footer() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFAQClick = () => {
    navigate("/home", { state: { scrollTo: "faq" } });
  };

  return (
    <footer className="bg-[#0B1E2D] text-white pt-16 pb-8 px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">

        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#0080FF] mb-4">
            ScholarAI
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Empowering students with AI-powered scholarship eligibility
            evaluation to unlock financial opportunities effortlessly.
          </p>

          {/* Avatar Social Section */}
          <div className="mt-6">
            <AvatarGroupDemo />
          </div>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#0080FF]">
            Site Map
          </h3>

          <div className="space-y-2 text-gray-300">

            <span
              onClick={handleHomeClick}
              className="block hover:text-white cursor-pointer transition"
            >
              Homepage
            </span>

            <Link to="/scholarships" className="block hover:text-white transition">
              Scholarships
            </Link>

            <Link to="/results" className="block hover:text-white transition">
              Results
            </Link>

            <Link to="/profile" className="block hover:text-white transition">
              Profile
            </Link>

            <span
              onClick={handleFAQClick}
              className="block hover:text-white cursor-pointer transition"
            >
              FAQ
            </span>

            <Link to="/contact" className="block hover:text-white transition">
              Contact Us
            </Link>

          </div>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#0080FF]">
            Legal
          </h3>

          <div className="space-y-2 text-gray-300">

            <Link
              to="/privacy-policy"
              className="block hover:text-white transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="block hover:text-white transition"
            >
              Terms of Service
            </Link>

          </div>

          {/* Back To Top */}
          <div className="mt-8">
            <button
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="border border-gray-500 px-6 py-2 rounded hover:bg-[#0080FF] hover:border-[#0080FF] transition"
            >
              Back to Top
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400 text-sm">
        © 2026 ScholarAI. All rights reserved.
      </div>
    </footer>
  );
}