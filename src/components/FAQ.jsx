import { useState } from "react";

const faqs = [
  {
    question: "Is ScholarAI officially connected to government portals?",
    answer:
      "ScholarAI independently analyzes publicly available scholarship guidelines using AI. We are not directly affiliated with government agencies.",
  },
  {
    question: "How accurate is the eligibility prediction?",
    answer:
      "Our AI system analyzes detailed criteria and achieves up to 95% eligibility accuracy based on available guidelines.",
  },
  {
    question: "Is my personal data secure?",
    answer:
      "Yes. We prioritize data privacy and do not share personal information with third parties.",
  },
  {
    question: "Can I directly apply through ScholarAI?",
    answer:
      "Currently, we redirect users to official scholarship portals for application submission.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border rounded-lg p-5 shadow-sm bg-white transition"
        >
          <div
            onClick={() => toggleFAQ(index)}
            className="cursor-pointer flex justify-between items-center"
          >
            <h4 className="text-lg font-semibold">
              {faq.question}
            </h4>
            <span className="text-[#0080FF] text-xl">
              {activeIndex === index ? "-" : "+"}
            </span>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              activeIndex === index
                ? "max-h-40 mt-4 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-gray-600">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}