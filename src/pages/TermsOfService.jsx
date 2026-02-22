import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsOfService() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-8 py-20">
        <h1 className="text-3xl font-bold text-[#0080FF] mb-8">
          Terms of Service
        </h1>

        <p className="text-gray-600 mb-8">
          Last Updated: February 2026
        </p>

        <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-600 mb-6">
          By accessing or using ScholarAI, you agree to comply with these Terms
          of Service.
        </p>

        <h2 className="text-xl font-semibold mb-4">2. Description of Service</h2>
        <p className="text-gray-600 mb-6">
          ScholarAI provides AI-powered scholarship eligibility evaluation.
          We do not guarantee scholarship approval.
        </p>

        <h2 className="text-xl font-semibold mb-4">3. User Responsibilities</h2>
        <p className="text-gray-600 mb-6">
          Users must provide accurate information and must not misuse the
          platform.
        </p>

        <h2 className="text-xl font-semibold mb-4">4. Intellectual Property</h2>
        <p className="text-gray-600 mb-6">
          All content, AI systems, branding, and design elements belong to
          ScholarAI and may not be copied without permission.
        </p>

        <h2 className="text-xl font-semibold mb-4">5. Limitation of Liability</h2>
        <p className="text-gray-600 mb-6">
          ScholarAI is not responsible for decisions made by scholarship
          providers or third-party platforms.
        </p>

        <h2 className="text-xl font-semibold mb-4">6. Termination</h2>
        <p className="text-gray-600 mb-6">
          We reserve the right to suspend accounts that violate these terms.
        </p>

        <h2 className="text-xl font-semibold mb-4">7. Changes to Terms</h2>
        <p className="text-gray-600">
          We may revise these terms at any time. Continued use indicates
          acceptance of updated terms.
        </p>
      </div>

      <Footer />
    </div>
  );
}