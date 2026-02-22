import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import hero5 from "../assets/hero5.jpg";
import supabase from "../supabaseClient";
import { getCurrentUser } from "../getUser";

export default function Form() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [user, setUser] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const u = await getCurrentUser();
      setUser(u);
    };
    fetchUser();
  }, []);

  const questionsPerPage = 5;
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    educationLevel: "",
    currentYear: "",
    dob: "",
    address: "",
    citizenStatus: "",
    university: "",
    major: "",
    name: "",
    gender: "",
    gpa: "",
    highSchool: "",
    ethnicity: "",
    firstGen: "",
    militaryParents: "",
    sports: "",
    artistic: "",
    disability: "",
    financialAid: "",
    phone: "",
  });

  // 🔥 ENHANCED QUESTIONS
  const questions = [
    {
      label: "What is your current level of education?",
      key: "educationLevel",
      type: "dropdown",
      options: ["Undergraduate", "Postgraduate", "PhD", "Diploma"],
    },
    {
      label: "Which year are you currently in?",
      key: "currentYear",
      type: "dropdown",
      options: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    },
    { label: "What is your date of birth?", key: "dob", type: "date" },
    { label: "What is your current residential address?", key: "address" },
    {
      label: "What is your citizenship status?",
      key: "citizenStatus",
      type: "dropdown",
      options: ["Indian", "International"],
    },

    {
      label: "Which university are you currently studying at?",
      key: "university",
      type: "autocomplete",
      options: [
        "Thapar Institute of Engineering and Technology",
        "IIT Delhi",
        "IIT Bombay",
        "BITS Pilani",
        "Delhi University",
      ],
    },
    {
      label: "What is your major or field of study?",
      key: "major",
      type: "autocomplete",
      options: [
        "Computer Science",
        "Mechanical Engineering",
        "Electrical Engineering",
        "Economics",
        "Business",
      ],
    },
    { label: "What is your full name?", key: "name" },
    {
      label: "Which gender do you identify with?",
      key: "gender",
      type: "dropdown",
      options: ["Male", "Female", "Other"],
    },
    { label: "What is your current GPA/CGPA?", key: "gpa", type: "number" },

    { label: "Which high school did you attend?", key: "highSchool" },
    { label: "What is your ethnicity (if applicable)?", key: "ethnicity" },
    {
      label: "Are you a first-generation college student?",
      key: "firstGen",
      type: "dropdown",
      options: ["Yes", "No"],
    },
    {
      label: "Do you have parents in the military?",
      key: "militaryParents",
      type: "dropdown",
      options: ["Yes", "No"],
    },
    { label: "Are you involved in any sports?", key: "sports" },

    { label: "Do you have any artistic achievements?", key: "artistic" },
    { label: "Do you have any disabilities?", key: "disability" },
    {
      label: "Do you require financial aid?",
      key: "financialAid",
      type: "dropdown",
      options: ["Yes", "No"],
    },
    { label: "What is your phone number?", key: "phone" },
  ];

  const totalSteps = Math.ceil(questions.length / questionsPerPage);

  // 🔥 HANDLE CHANGE + AUTOCOMPLETE
  const handleChange = (e, q) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      [q.key]: value,
    });

    if (q.type === "autocomplete") {
      if (value.length > 0) {
        const filtered = q.options.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);
        setActiveField(q.key);
      } else {
        setSuggestions([]);
      }
    }
  };

  // 🔥 SAVE TO SUPABASE
  const handleSubmitToDB = async () => {
    if (!user) return;

    await supabase
      .from("users")
      .update({
        education_level: formData.educationLevel,
        current_year: formData.currentYear,
        dob: formData.dob,
        address: formData.address,
        citizenship: formData.citizenStatus,
        university: formData.university,
        major: formData.major,
        name: formData.name,
        gender: formData.gender,
        cgpa: formData.gpa,
        high_school: formData.highSchool,
        ethnicity: formData.ethnicity,
        first_gen: formData.firstGen,
        military_parents: formData.militaryParents,
        sports: formData.sports,
        artistic: formData.artistic,
        disability: formData.disability,
        financial_aid: formData.financialAid,
        phone: formData.phone,
      })
      .eq("id", user.id);

    navigate("/results");
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
      formRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      handleSubmitToDB();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentQuestions = questions.slice(
    step * questionsPerPage,
    step * questionsPerPage + questionsPerPage
  );

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div
        className="relative w-full h-[45vh] bg-cover flex items-center justify-center"
        style={{ backgroundImage: `url(${hero5})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <h1 className="relative text-white text-4xl font-bold">
          Tell us about yourself
        </h1>
      </div>

      <div ref={formRef} className="max-w-3xl mx-auto px-6 py-20">
        <div className="bg-white p-10 rounded-2xl shadow-xl border space-y-10">

          <h2 className="text-xl font-semibold text-[#0080FF]">
            Step {step + 1} of {totalSteps}
          </h2>

          <div className="space-y-8">
            {currentQuestions.map((q) => (
              <div key={q.key} className="relative">

                <label className="block text-lg mb-3">{q.label}</label>

                {/* AUTOCOMPLETE */}
                {q.type === "autocomplete" && (
                  <>
                    <input
                      value={formData[q.key]}
                      onChange={(e) => handleChange(e, q)}
                      className="w-full px-4 py-3 border rounded-xl"
                    />

                    {activeField === q.key && suggestions.length > 0 && (
                      <div className="absolute w-full bg-white border rounded-lg mt-1 shadow max-h-40 overflow-y-auto z-10">
                        {suggestions.map((item, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setFormData({
                                ...formData,
                                [q.key]: item,
                              });
                              setSuggestions([]);
                            }}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* DROPDOWN */}
                {q.type === "dropdown" && (
                  <select
                    value={formData[q.key]}
                    onChange={(e) => handleChange(e, q)}
                    className="w-full px-4 py-3 border rounded-xl"
                  >
                    <option value="">Select</option>
                    {q.options.map((opt, i) => (
                      <option key={i}>{opt}</option>
                    ))}
                  </select>
                )}

                {/* DEFAULT INPUT */}
                {(!q.type || q.type === "text") && (
                  <input
                    type="text"
                    value={formData[q.key]}
                    onChange={(e) => handleChange(e, q)}
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                )}

                {/* NUMBER */}
                {q.type === "number" && (
                  <input
                    type="number"
                    value={formData[q.key]}
                    onChange={(e) => handleChange(e, q)}
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                )}

                {/* DATE */}
                {q.type === "date" && (
                  <input
                    type="date"
                    value={formData[q.key]}
                    onChange={(e) => handleChange(e, q)}
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                )}

              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <button onClick={handleBack} disabled={step === 0}>
              Back
            </button>

            <button
              onClick={handleNext}
              className="bg-[#0080FF] text-white px-6 py-2 rounded"
            >
              {step === totalSteps - 1 ? "Submit" : "Next"}
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}