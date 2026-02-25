import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import hero5 from "../assets/hero5.jpg";
import supabase from "../supabaseClient";
import { getCurrentUser } from "../getUser";

export default function Scholarships() {
  const [userData, setUserData] = useState(null);
  const [scholarships, setScholarships] = useState([]);
  const [eligibleScholarships, setEligibleScholarships] = useState([]);

  const [activeTab, setActiveTab] = useState("eligible");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // SAFE STRING
  const toSafeString = (value) => {
    if (!value) return "";
    if (Array.isArray(value)) return value.join(",").toLowerCase();
    return String(value).toLowerCase();
  };

  // MATCH SCORE
  const calculateScore = (sch, user) => {
    if (!user) return 0;

    let score = 0;
    let total = 0;

    if (sch.min_gpa) {
      total += 2;
      if (user.cgpa >= sch.min_gpa) score += 2;
    }

    if (sch.min_income && sch.max_income) {
      total += 2;
      if (
        user.family_income >= sch.min_income &&
        user.family_income <= sch.max_income
      )
        score += 2;
    }

    total += 1;
    if (!sch.gender || sch.gender === user.gender) score += 1;

    total += 1;
    if (!sch.ethnicity || sch.ethnicity === user.ethnicity) score += 1;

    if (sch.eligible_majors && user.major) {
      total += 2;
      const majors = toSafeString(sch.eligible_majors);
      if (majors.includes(user.major.toLowerCase())) score += 2;
    }

    return total === 0 ? 0 : Math.round((score / total) * 100);
  };

  // FETCH
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) return;

        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        setUserData(profile);

        const { data } = await supabase
          .from("scholarships")
          .select("*");

        const schList = data || [];
        setScholarships(schList);

        const eligible = schList.filter(
          (sch) =>
            (!sch.min_gpa || profile.cgpa >= sch.min_gpa) &&
            (!sch.max_income || profile.family_income <= sch.max_income)
        );

        setEligibleScholarships(eligible);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // FILTER
  const filteredScholarships = scholarships.filter((sch) => {
    const name = sch.scholarship_name?.toLowerCase() || "";
    const matchesSearch = name.includes(search.toLowerCase());

    if (activeTab === "eligible") {
      return (
        eligibleScholarships.some((e) => e.id === sch.id) &&
        matchesSearch
      );
    }

    return matchesSearch;
  });

  // TOP MATCHES
  const topMatches = [...scholarships]
    .map((sch) => ({
      ...sch,
      score: calculateScore(sch, userData),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // ANIMATION VARIANTS
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* HERO */}
      <div
        className="relative w-full h-[45vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${hero5})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-white text-4xl font-bold"
        >
          Explore Scholarships
        </motion.h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* TOP MATCHES */}
        <h2 className="text-2xl font-bold text-[#0080FF] mb-6">
          Top Matches For You
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-3 gap-6 mb-14"
        >
          {topMatches.map((sch) => (
            <motion.div
              key={sch.id}
              variants={card}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow flex flex-col justify-between min-h-[260px]"
            >
              <div>
                <h3 className="text-lg font-semibold text-[#0080FF]">
                  {sch.scholarship_name}
                </h3>

                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {sch.description}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium mb-3">
                  {sch.score}% Match
                </p>

                <button
                  onClick={() => navigate(`/scholarship/${sch.id}`)}
                  className="w-full bg-[#0080FF] text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search scholarships..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full md:w-1/3 bg-white"
          />

          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab("eligible")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "eligible"
                  ? "bg-green-600 text-white"
                  : "bg-white border"
              }`}
            >
              Eligible
            </button>

            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "all"
                  ? "bg-[#0080FF] text-white"
                  : "bg-white border"
              }`}
            >
              All
            </button>
          </div>
        </div>

        {/* GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-3 gap-6"
        >
          {filteredScholarships.map((sch) => {
            const score = calculateScore(sch, userData);

            return (
              <motion.div
                key={sch.id}
                variants={card}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-xl shadow flex flex-col justify-between min-h-[280px]"
              >
                <div>
                  <h3 className="text-lg font-semibold text-[#0080FF]">
                    {sch.scholarship_name}
                  </h3>

                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {sch.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() =>
                      navigate(`/scholarship/${sch.id}`)
                    }
                    className="bg-[#0080FF] text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    View Details
                  </button>

                  <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {score}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>

      <Footer />
    </div>
  );
}