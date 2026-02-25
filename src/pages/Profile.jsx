import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import hero4 from "../assets/hero4.jpg";
import supabase from "../supabaseClient";
import { getCurrentUser } from "../getUser";

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getCurrentUser();

        if (!user) {
          navigate("/login");
          return;
        }

        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error(error);
        } else {
          setProfile(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const fields = [
    "name",
    "gender",
    "cgpa",
    "family_income",
    "major",
    "degree_level",
    "university",
    "high_school",
    "ethnicity",
  ];

  const filled = profile
    ? fields.filter((f) => profile[f] && profile[f] !== "").length
    : 0;

  const completion = Math.round((filled / fields.length) * 100);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white min-h-screen"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Navbar />

      <motion.div
        className="relative w-full h-[45vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${hero4})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">
            Your Profile
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Manage and track your academic profile
          </p>
        </div>
      </motion.div>

      <motion.div
        className="max-w-5xl mx-auto px-8 py-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <motion.div
          className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl shadow mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#0080FF]">
                {profile?.name || "User"}
              </h2>
              <p className="text-gray-600">
                {profile?.email}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/form")}
                className="bg-[#0080FF] text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Profile Completion</span>
              <span>{completion}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-[#0080FF] h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completion}%` }}
                transition={{ duration: 0.8 }}
              ></motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-10"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <ProfileSection title="Personal Information">
              <ProfileItem label="Full Name" value={profile?.name} />
              <ProfileItem label="Gender" value={profile?.gender} />
              <ProfileItem label="Ethnicity" value={profile?.ethnicity} />
            </ProfileSection>
          </motion.div>

          <motion.div variants={item}>
            <ProfileSection title="Academic Details">
              <ProfileItem label="University" value={profile?.university} />
              <ProfileItem label="Major" value={profile?.major} />
              <ProfileItem label="Degree Level" value={profile?.degree_level} />
              <ProfileItem label="CGPA" value={profile?.cgpa} />
              <ProfileItem label="High School" value={profile?.high_school} />
            </ProfileSection>
          </motion.div>

          <motion.div variants={item}>
            <ProfileSection title="Financial Details">
              <ProfileItem
                label="Family Income"
                value={
                  profile?.family_income
                    ? `₹${profile.family_income}`
                    : null
                }
              />
            </ProfileSection>
          </motion.div>

          <motion.div variants={item}>
            <ProfileSection title="Additional Info">
              <ProfileItem label="Phone" value={profile?.phone} />
              <ProfileItem label="First Gen Student" value={profile?.first_gen} />
              <ProfileItem label="Financial Aid Needed" value={profile?.financial_aid} />
            </ProfileSection>
          </motion.div>
        </motion.div>
      </motion.div>

      <Footer />
    </motion.div>
  );
}

function ProfileSection({ title, children }) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-[#0080FF] mb-4">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">
        {value || "Not Provided"}
      </p>
    </div>
  );
}