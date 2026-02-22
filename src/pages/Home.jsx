import Navbar from "../components/Navbar";
import heroImage from "../assets/hero1.jpg";
import FAQ from "../components/FAQ";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import { FileText, BrainCircuit, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn, StaggerContainer, FadeItem } from "../components/FadeIn";


export default function Home() {
  const location = useLocation();
  const sliderRef = useRef(null);

  const scholarships = [
    {
      id: 1,
      title: "National Merit Scholarship",
      description: "For high-performing undergraduate students.",
    },
    {
      id: 2,
      title: "STEM Excellence Grant",
      description: "Supporting science and technology students.",
    },
    {
      id: 3,
      title: "Need-Based Aid Program",
      description: "Financial assistance for eligible students.",
    },
    {
      id: 4,
      title: "Global Research Fellowship",
      description: "For students pursuing research excellence.",
    },
  ];

  useEffect(() => {
    if (location.state?.scrollTo === "faq") {
      const section = document.getElementById("faq-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <div
        className="relative w-full h-[85vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>

        <FadeIn>
          <div className="relative text-center text-white px-6 max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Find Scholarships You’re Eligible For in Seconds
            </h2>

            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Instantly check eligibility across 500+ government and private scholarships using AI-powered reasoning.
            </p>

            <Link to="/scholarships">
  <button className="bg-[#0080FF] text-white px-8 py-3 text-lg font-semibold rounded-lg hover:bg-blue-600 transition duration-300">
    Check Eligibility
  </button>
</Link>

            <p className="text-sm text-gray-300 mt-4">
              Trusted by 10,000+ students nationwide
            </p>
          </div>
        </FadeIn>
      </div>

      {/* SCHOLARSHIP SLIDER */}
      <div className="py-20 px-8 max-w-6xl mx-auto">

        {/* Left Button */}
        <div className="flex justify-start mb-8">
          <Link to="/scholarships">
            <button className="bg-[#0080FF] text-white px-8 py-3 text-lg font-semibold rounded-lg hover:bg-blue-600 transition shadow-md hover:shadow-lg">
              Check Other Scholarships
            </button>
          </Link>
        </div>

        {/* Slider Controls */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold text-[#0080FF]">
            Featured Scholarships
          </h3>

          <div className="flex space-x-3">
            <button
              onClick={scrollLeft}
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition shadow-sm"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={scrollRight}
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition shadow-sm"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex space-x-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {scholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="min-w-[300px] snap-start bg-gray-50 p-8 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-[#0080FF] mb-3">
                {scholarship.title}
              </h3>

              <p className="text-gray-600 mb-6">
                {scholarship.description}
              </p>

              <Link to={`/scholarship/${scholarship.id}`}>
                <button className="bg-[#0080FF] text-white px-6 py-2 rounded hover:bg-blue-600 transition">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>

      </div>

      {/* HOW IT WORKS */}
      <div className="py-20 px-8 max-w-6xl mx-auto text-center">
        <FadeIn>
          <h3 className="text-3xl font-bold text-[#0080FF] mb-16">
            How It Works
          </h3>
        </FadeIn>

        <StaggerContainer>
          <div className="grid md:grid-cols-3 gap-16">

            <FadeItem>
              <div className="flex flex-col items-center">
                <div className="bg-[#0080FF]/10 p-6 rounded-full mb-6">
                  <FileText size={40} className="text-[#0080FF]" />
                </div>
                <h4 className="text-xl font-semibold mb-4">
                  1. Enter Your Details
                </h4>
                <p className="text-gray-600 max-w-xs">
                  Fill in your academic and financial information in a simple form.
                </p>
              </div>
            </FadeItem>

            <FadeItem>
              <div className="flex flex-col items-center">
                <div className="bg-[#0080FF]/10 p-6 rounded-full mb-6">
                  <BrainCircuit size={40} className="text-[#0080FF]" />
                </div>
                <h4 className="text-xl font-semibold mb-4">
                  2. AI Evaluates Eligibility
                </h4>
                <p className="text-gray-600 max-w-xs">
                  MegaLLM analyzes complex scholarship guidelines intelligently.
                </p>
              </div>
            </FadeItem>

            <FadeItem>
              <div className="flex flex-col items-center">
                <div className="bg-[#0080FF]/10 p-6 rounded-full mb-6">
                  <CheckCircle size={40} className="text-[#0080FF]" />
                </div>
                <h4 className="text-xl font-semibold mb-4">
                  3. Get Clear Results
                </h4>
                <p className="text-gray-600 max-w-xs">
                  Instantly see eligible scholarships with detailed explanations.
                </p>
              </div>
            </FadeItem>

          </div>
        </StaggerContainer>
      </div>

      {/* ABOUT */}
      <FadeIn>
        <div className="bg-gray-50 py-20 px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-[#0080FF] mb-6">
              What We Do
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              ScholarAI uses advanced AI to interpret scholarship guidelines,
              evaluate eligibility, and provide clear, explainable results so
              students never miss financial opportunities.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* STATS */}
      <StaggerContainer>
        <div className="py-20 px-8 text-center bg-gray-50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">

            {["500+", "₹50 Cr+", "10,000+", "95%"].map((stat, i) => (
              <FadeItem key={i}>
                <div className="bg-white shadow-md rounded-xl p-8 hover:shadow-lg transition">
                  <h4 className="text-4xl font-bold text-[#0080FF] mb-2">
                    {stat}
                  </h4>
                  <p className="text-lg text-gray-600">
                    {i === 0 && "Scholarships Covered"}
                    {i === 1 && "Funding Tracked"}
                    {i === 2 && "Students Assisted"}
                    {i === 3 && "Eligibility Accuracy"}
                  </p>
                </div>
              </FadeItem>
            ))}

          </div>
        </div>
      </StaggerContainer>

      {/* FAQ */}
      <FadeIn>
        <div id="faq-section" className="py-20 px-8 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-[#0080FF] mb-12">
            Frequently Asked Questions
          </h3>
          <FAQ />
        </div>
      </FadeIn>

      {/* CTA */}
      <FadeIn>
        <div className="bg-[#0080FF] py-20 text-center text-white">
          <h3 className="text-3xl font-bold mb-6">
            Ready to find scholarships you qualify for?
          </h3>
          <Link to="/form">
            <button className="bg-white text-[#0080FF] px-8 py-3 text-lg font-semibold rounded-lg hover:bg-gray-100 transition">
              Get Started
            </button>
          </Link>
        </div>
      </FadeIn>

      <Footer />
    </div>
  );
}