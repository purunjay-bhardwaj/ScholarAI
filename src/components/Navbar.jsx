import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleFAQClick = () => {
    navigate("/home", { state: { scrollTo: "faq" } });
  };

  const linkClass = ({ isActive }) =>
    `animated-link transition ${
      isActive ? "text-[#0080FF]" : "text-gray-700 hover:text-[#0080FF]"
    }`;

  return (
    <nav className="w-full bg-white shadow-md px-10 py-4 flex justify-between items-center sticky top-0 z-50">

      {/* Logo */}
      <NavLink to="/home">
        <h1 className="text-2xl font-bold text-[#0080FF] cursor-pointer">
          ScholarAI
        </h1>
      </NavLink>

      {/* Links */}
      <div className="flex space-x-8 text-base font-medium items-center">

        <NavLink to="/scholarships" className={linkClass}>
          Scholarships
        </NavLink>

        <NavLink to="/results" className={linkClass}>
          Results
        </NavLink>

        <NavLink to="/profile" className={linkClass}>
          Profile
        </NavLink>

        <NavLink to="/contact" className={linkClass}>
          Contact Us
        </NavLink>

        <span
          onClick={handleFAQClick}
          className="animated-link cursor-pointer text-gray-700 hover:text-[#0080FF] transition"
        >
          FAQ
        </span>

      </div>
    </nav>
  );
}