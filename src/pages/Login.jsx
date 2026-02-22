import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import supabase from "../supabaseClient";
import hero6 from "../assets/hero6.jpg";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        // 🔥 SIGNUP with metadata
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            },
          },
        });

        if (error) {
          alert(error.message);
          setLoading(false);
          return;
        }

        const userId = data?.user?.id;

        // 🔥 Insert into users table
        if (userId) {
          const { error: insertError } = await supabase
            .from("users")
            .insert([
              {
                id: userId,
                name: formData.fullName,
                email: formData.email,
              },
            ]);

          if (insertError) {
            console.error("Insert error:", insertError);
            alert("Error saving user data");
          }
        } else {
          console.log("User not returned (email confirmation might be ON)");
        }

        // ✅ UX flow
        alert("Signup successful! Please login.");

        setIsSignup(false);

        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

      } else {
        // 🔥 LOGIN
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          alert(error.message);
          setLoading(false);
          return;
        }

        console.log("Logged in:", data);

        navigate("/home");
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex overflow-hidden">

      {/* LEFT SIDE */}
      <motion.div
        initial={{ x: -400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex w-1/2 relative bg-cover bg-center items-center justify-center"
        style={{ backgroundImage: `url(${hero6})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div className="relative text-center text-white px-10">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-4xl font-bold text-[#0080FF] mb-4"
          >
            ScholarAI
          </motion.h1>

          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-2xl font-semibold"
          >
            Where Dreams Become Reality
          </motion.p>
        </div>
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div
        animate={{
          background: isSignup
            ? "linear-gradient(to bottom right, #0080FF, #005FCC)"
            : "linear-gradient(to bottom right, #ffffff, #f9fafb)",
        }}
        transition={{ duration: 0.5 }}
        className="flex w-full md:w-1/2 items-center justify-center px-8"
      >
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className={`w-full max-w-md rounded-2xl p-10 shadow-2xl transition-all duration-500 hover:shadow-[0_25px_70px_rgba(0,128,255,0.35)] ${
            isSignup ? "bg-white/95 backdrop-blur-md" : "bg-white"
          }`}
        >

          <AnimatePresence mode="wait">
            <motion.div
              key={isSignup ? "signup" : "login"}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >

              <h2 className={`text-3xl font-bold mb-2 ${
                isSignup ? "text-white md:text-[#0080FF]" : "text-[#0080FF]"
              }`}>
                {isSignup ? "Create Account" : "Welcome Back"}
              </h2>

              <p className={`mb-8 ${
                isSignup ? "text-white md:text-gray-500" : "text-gray-500"
              }`}>
                {isSignup
                  ? "Sign up to start your scholarship journey"
                  : "Sign in to continue"}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">

                {isSignup && (
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0080FF] focus:outline-none"
                  />
                )}

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0080FF] focus:outline-none"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0080FF] focus:outline-none"
                />

                {isSignup && (
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0080FF] focus:outline-none"
                  />
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0080FF] text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all disabled:opacity-50"
                >
                  {loading
                    ? "Please wait..."
                    : isSignup
                    ? "Sign Up"
                    : "Login"}
                </button>
              </form>

              <div className="text-center mt-6 text-sm">
                {isSignup ? (
                  <>
                    <span className="text-white md:text-gray-600">
                      Already have an account?{" "}
                    </span>
                    <button
                      onClick={() => setIsSignup(false)}
                      className="text-white md:text-[#0080FF] font-semibold hover:underline"
                    >
                      Login
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-gray-600">
                      Don’t have an account?{" "}
                    </span>
                    <button
                      onClick={() => setIsSignup(true)}
                      className="text-[#0080FF] font-semibold hover:underline"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>

            </motion.div>
          </AnimatePresence>

        </motion.div>
      </motion.div>
    </div>
  );
}