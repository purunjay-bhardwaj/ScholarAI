import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import hero5 from "../assets/hero5.jpg";
import supabase from "../supabaseClient";
import { getCurrentUser } from "../getUser";

export default function ScholarshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);
  const [user, setUser] = useState(null);
  const [updating, setUpdating] = useState(false);

  // 🔥 ANIMATION VARIANTS
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0 },
  };

  // 🔥 INIT
  useEffect(() => {
    const init = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        const { data: schData } = await supabase
          .from("scholarships")
          .select("*")
          .eq("id", Number(id))
          .single();

        setScholarship(schData);

        const localApplied =
          JSON.parse(localStorage.getItem("appliedScholarships")) || [];

        const foundLocal = localApplied.find(
          (item) => item.id === Number(id)
        );

        if (foundLocal) setIsApplied(true);

        if (currentUser) {
          const { data: appliedData } = await supabase
            .from("applied_scholarships")
            .select("*")
            .eq("user_id", currentUser.id)
            .eq("scholarship_id", Number(id));

          if (appliedData && appliedData.length > 0) {
            setIsApplied(true);
          }
        }

      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    init();
  }, [id]);

  // 🔥 TOGGLE
  const handleToggle = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    setUpdating(true);

    try {
      let applied =
        JSON.parse(localStorage.getItem("appliedScholarships")) || [];

      if (isApplied) {
        await supabase
          .from("applied_scholarships")
          .delete()
          .eq("user_id", user.id)
          .eq("scholarship_id", Number(id));

        applied = applied.filter((item) => item.id !== scholarship.id);
        setIsApplied(false);
      } else {
        await supabase.from("applied_scholarships").insert([
          {
            user_id: user.id,
            scholarship_id: Number(id),
          },
        ]);

        applied.push({
          id: scholarship.id,
          title: scholarship.scholarship_name,
        });

        setIsApplied(true);
      }

      localStorage.setItem("appliedScholarships", JSON.stringify(applied));

    } catch (err) {
      console.error(err);
    }

    setUpdating(false);
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading scholarship...
      </div>
    );
  }

  // NOT FOUND
  if (!scholarship) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-red-600 font-bold">
            Scholarship Not Found
          </h1>
          <button
            onClick={() => navigate("/scholarships")}
            className="mt-4 bg-[#0080FF] text-white px-6 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
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
          {scholarship.scholarship_name}
        </motion.h1>
      </div>

      {/* DETAILS */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto px-6 py-16"
      >
        <div className="bg-gray-50 p-8 rounded-xl shadow space-y-6">

          {scholarship.description && (
            <motion.div variants={item}>
              <Section title="Description">
                {scholarship.description}
              </Section>
            </motion.div>
          )}

          {scholarship.min_gpa && (
            <motion.div variants={item}>
              <Section title="Minimum GPA">
                {scholarship.min_gpa}
              </Section>
            </motion.div>
          )}

          {scholarship.amount && (
            <motion.div variants={item}>
              <Section title="Benefits">
                ${scholarship.amount}
              </Section>
            </motion.div>
          )}

          {/* ACTION BAR */}
          <motion.div
            variants={item}
            className="flex justify-between items-center pt-6 border-t"
          >
            <a
              href={scholarship.link}
              target="_blank"
              rel="noreferrer"
              className="bg-[#0080FF] text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Apply Now
            </a>

            <div className="flex items-center gap-3">
              <span className="text-sm">
                {isApplied ? "Applied" : "Mark Applied"}
              </span>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleToggle}
                disabled={updating}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                  isApplied ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <motion.div
                  layout
                  className="bg-white w-4 h-4 rounded-full shadow-md"
                />
              </motion.button>
            </div>
          </motion.div>

        </div>
      </motion.div>

      <Footer />
    </div>
  );
}

/* COMPONENT */

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-[#0080FF]">
        {title}
      </h2>
      <p className="text-gray-700 mt-1">{children}</p>
    </div>
  );
}