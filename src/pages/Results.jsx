import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import hero4 from "../assets/hero4.jpg";
import supabase from "../supabaseClient";
import { getCurrentUser } from "../getUser";

export default function Results() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [allMatches, setAllMatches] = useState([]);
  const [applied, setApplied] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  const TOP_LIMIT = 4;

  // ✅ MATCH FUNCTION
  const calculateScore = (sch, profile) => {
    if (!profile) return 0;

    let score = 0;
    let total = 0;

    if (sch.min_gpa) {
      total += 2;
      if (profile.cgpa >= sch.min_gpa) score += 2;
    }

    if (sch.min_income && sch.max_income) {
      total += 2;
      if (
        profile.family_income >= sch.min_income &&
        profile.family_income <= sch.max_income
      ) {
        score += 2;
      }
    }

    total += 1;
    if (!sch.gender || sch.gender === profile.gender) score += 1;

    total += 1;
    if (!sch.ethnicity || sch.ethnicity === profile.ethnicity)
      score += 1;

    total += 2;

    let majors = "";
    if (Array.isArray(sch.eligible_majors)) {
      majors = sch.eligible_majors.join(",").toLowerCase();
    } else if (typeof sch.eligible_majors === "string") {
      majors = sch.eligible_majors.toLowerCase();
    }

    if (profile.major && majors.includes(profile.major.toLowerCase())) {
      score += 2;
    }

    return total === 0 ? 0 : Math.round((score / total) * 100);
  };

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) return;

        // PROFILE
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        setUserData(profile);

        // SCHOLARSHIPS
        const { data: scholarships } = await supabase
          .from("scholarships")
          .select("*");

        const all = scholarships || [];

        // ✅ LOCAL STORAGE (FAST UI)
        const localApplied =
          JSON.parse(localStorage.getItem("appliedScholarships")) || [];

        const localAppliedIds = localApplied.map((a) => a.id);

        // ✅ SUPABASE (REAL DATA)
        const { data: appliedData } = await supabase
          .from("applied_scholarships")
          .select("scholarship_id")
          .eq("user_id", user.id);

        const dbAppliedIds = (appliedData || []).map(
          (a) => a.scholarship_id
        );

        // 🔥 MERGE BOTH
        const appliedIds = [...new Set([...localAppliedIds, ...dbAppliedIds])];

        // FULL APPLIED DATA
        const appliedFull = all.filter((sch) =>
          appliedIds.includes(sch.id)
        );

        setApplied(appliedFull);

        // MATCHES
        const scored = all.map((sch) => ({
          ...sch,
          score: calculateScore(sch, profile),
          isApplied: appliedIds.includes(sch.id),
        }));

        scored.sort((a, b) => b.score - a.score);

        setAllMatches(scored);

      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const topMatches = allMatches.slice(0, TOP_LIMIT);
  const otherMatches = allMatches.slice(TOP_LIMIT);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* HERO */}
      <div
        className="relative w-full h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${hero4})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <h1 className="relative text-white text-4xl font-bold">
          Your Scholarship Dashboard
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* PROFILE */}
        <div className="bg-white p-6 rounded-xl shadow mb-12">
          <h2 className="text-xl font-bold text-[#0080FF] mb-4">
            Profile Overview
          </h2>

          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <ProfileItem label="Name" value={userData?.name} />
            <ProfileItem label="GPA" value={userData?.cgpa} />
            <ProfileItem
              label="Income"
              value={
                userData?.family_income
                  ? `₹${userData.family_income}`
                  : null
              }
            />
            <ProfileItem label="Major" value={userData?.major} />
          </div>
        </div>

        {/* APPLIED */}
        <SectionTitle title="Your Applications 📄" />

        {applied.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 mb-14">
            {applied.map((sch) => (
              <div
                key={sch.id}
                className="bg-green-50 border p-5 rounded-xl flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-green-700">
                    {sch.scholarship_name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {sch.description}
                  </p>
                </div>

                <span className="bg-green-600 text-white px-3 py-1 text-xs rounded-full">
                  Applied
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="mb-12 text-gray-500">
            No applications yet.
          </p>
        )}

        {/* TOP MATCHES */}
        <SectionTitle title="Top Matches 🎯" />

        {loading ? (
          <p>Loading...</p>
        ) : topMatches.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {topMatches.map((sch) => (
                <ScholarshipCard key={sch.id} sch={sch} navigate={navigate} />
              ))}
            </div>

            {otherMatches.length > 0 && (
              <div className="text-center mb-10">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="bg-[#0080FF] text-white px-6 py-3 rounded-lg"
                >
                  {showAll
                    ? "Hide Other Scholarships"
                    : "View Other Scholarships"}
                </button>
              </div>
            )}

            {showAll && (
              <div className="grid md:grid-cols-2 gap-6">
                {otherMatches.map((sch) => (
                  <ScholarshipCard key={sch.id} sch={sch} navigate={navigate} />
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500">
            No matches found (check profile)
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
}

/* COMPONENTS */

function SectionTitle({ title }) {
  return (
    <h2 className="text-2xl font-bold text-[#0080FF] mb-6">
      {title}
    </h2>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-semibold">{value || "N/A"}</p>
    </div>
  );
}

function ScholarshipCard({ sch, navigate }) {
  return (
    <div className="bg-white border p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between">
      <div>
        <h3 className="font-semibold text-[#0080FF]">
          {sch.scholarship_name}
        </h3>

        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {sch.description}
        </p>
      </div>

      <div className="flex justify-between items-center mt-5">
        <span className="text-sm font-medium">
          🎯 {sch.score}% Match
        </span>

        <div className="flex gap-2">
          {sch.isApplied && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              Applied
            </span>
          )}

          <button
            onClick={() => navigate(`/scholarship/${sch.id}`)}
            className="bg-[#0080FF] text-white px-3 py-1 rounded text-sm"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}