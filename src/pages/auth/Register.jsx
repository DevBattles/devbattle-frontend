import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser, googleLogin } from "@/services/auth.service";
import { useAuth } from "@/context/useAuth";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
    joinCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGoogleCredentialResponse = async (response) => {
    setLoading(true);
    setError("");
    try {
      const res = await googleLogin(response.credential);
      login(res.data.user, res.data.token);
      toast.success("Google Login successful!");
      
      const role = res.data.user.role;
      if (role === "student") navigate("/student/dashboard");
      else if (role === "teacher") navigate("/teacher/dashboard");
      else if (role === "admin") navigate("/admin/dashboard");
      else navigate("/login");
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Google Sign-In failed.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (window.google) {
      const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
      if (googleClientId) {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleGoogleCredentialResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-btn"),
          { theme: "outline", size: "large", width: "100%", text: "continue_with" }
        );
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await registerUser(formData);

      setSuccess(response.message || "Registration Successful!");

      toast.success("Registration Successful!");

      setTimeout(() => {
        navigate("/verify-otp", { state: { email: formData.email } });
      }, 1000);
    } catch (err) {
      console.error(err);

      let message = "Registration Failed.";
      if (err.response?.data?.error && typeof err.response.data.error === "object") {
        const errorDetails = Object.values(err.response.data.error).join(", ");
        message = `${err.response.data.message || "Validation Error"}: ${errorDetails}`;
      } else if (err.response?.data?.message) {
        message = err.response.data.message;
      }

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#111827] p-8 shadow-xl">

        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="mb-8 text-center text-slate-400">
          Join DevBattles
        </p>

        {error && (
          <div className="mb-5 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-400">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Username
            </label>

            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400"
            />
            <p className="mt-1.5 text-xs text-slate-500">
              Must be at least 8 characters, with an uppercase letter, lowercase letter, number, and special character.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              I want to join as
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, role: "student" }))}
                className={`rounded-xl border px-4 py-3 font-semibold transition ${
                  formData.role === "student"
                    ? "border-emerald-400 bg-emerald-500/20 text-emerald-400"
                    : "border-slate-700 bg-[#0F172A] text-slate-300 hover:border-slate-600"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Student
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, role: "teacher" }))}
                className={`rounded-xl border px-4 py-3 font-semibold transition ${
                  formData.role === "teacher"
                    ? "border-emerald-400 bg-emerald-500/20 text-emerald-400"
                    : "border-slate-700 bg-[#0F172A] text-slate-300 hover:border-slate-600"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Teacher
                </div>
              </button>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              {formData.role === "student"
                ? "Learn web development through assignments and contests"
                : "Create assignments, contests, and manage students"}
            </p>
          </div>

          {formData.role === "student" && (
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Batch Join Code <span className="text-slate-500 text-xs">(Optional)</span>
              </label>

              <input
                type="text"
                name="joinCode"
                value={formData.joinCode}
                onChange={(e) => setFormData((prev) => ({ ...prev, joinCode: e.target.value.toUpperCase() }))}
                placeholder="e.g. DEV123AB"
                className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400 font-mono uppercase tracking-widest placeholder:tracking-normal placeholder:font-sans placeholder:text-sm"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700"></div>
          </div>
          <span className="relative bg-[#111827] px-4 text-sm text-slate-400">or</span>
        </div>

        <div id="google-signin-btn" className="w-full min-h-[44px]"></div>

        <div className="mt-6 text-center text-sm text-slate-300">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-emerald-400 hover:underline"
          >
            Login
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Register;