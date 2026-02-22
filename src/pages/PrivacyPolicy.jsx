import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-8 py-20">
        <h1 className="text-3xl font-bold text-[#0080FF] mb-8">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-8">
          Last Updated: February 2026
        </p>

        <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
        <p className="text-gray-600 mb-6">
          ScholarAI values your privacy and is committed to protecting your
          personal data. This policy explains how we collect, use, and safeguard
          your information.
        </p>

        <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
        <p className="text-gray-600 mb-6">
          We may collect personal details such as your name, email address,
          academic records, financial background, and scholarship preferences.
        </p>

        <h2 className="text-xl font-semibold mb-4">3. How We Use Information</h2>
        <p className="text-gray-600 mb-6">
          Information is used to evaluate scholarship eligibility, improve AI
          reasoning accuracy, enhance user experience, and communicate relevant
          updates.
        </p>

        <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
        <p className="text-gray-600 mb-6">
          We implement technical and organizational measures to protect your
          information from unauthorized access or disclosure.
        </p>

        <h2 className="text-xl font-semibold mb-4">5. Data Sharing</h2>
        <p className="text-gray-600 mb-6">
          ScholarAI does not sell personal data. We may share information with
          trusted service providers strictly for operational purposes.
        </p>

        <h2 className="text-xl font-semibold mb-4">6. User Rights</h2>
        <p className="text-gray-600 mb-6">
          Users may request access, correction, or deletion of personal data.
          Requests can be made through our contact page.
        </p>

        <h2 className="text-xl font-semibold mb-4">7. Changes to This Policy</h2>
        <p className="text-gray-600">
          We may update this policy periodically. Continued use of ScholarAI
          constitutes acceptance of updated terms.
        </p>
      </div>

      <Footer />
    </div>
  );
}