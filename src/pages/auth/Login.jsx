import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser, googleLogin } from "@/services/auth.service";
import { useAuth } from "@/context/useAuth";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const { login, getDashboardPath } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setLoading(true);

    try {
      const response = await loginUser(formData);

      login(response.data.user, response.data.token);

      toast.success("Login Successful!");

      navigate(getDashboardPath());
    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.message ||
        "Invalid email or password.";

      setError(message);
      toast.error(message);

      if (err.response?.status === 403 || message.toLowerCase().includes("verify") || message.toLowerCase().includes("verified")) {
        setTimeout(() => {
          navigate("/verify-otp", { state: { email: formData.email } });
        }, 1200);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#111827] p-8 shadow-xl">

        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mb-8 text-center text-slate-400">
          Login to continue
        </p>

        {error && (
          <div className="mb-5 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
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
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700"></div>
          </div>
          <span className="relative bg-[#111827] px-4 text-sm text-slate-400">or</span>
        </div>

        <div id="google-signin-btn" className="w-full min-h-[44px]"></div>

        <div className="mt-6 flex items-center justify-between text-sm">

          <Link
            to="/forgot-password"
            className="text-emerald-400 hover:underline"
          >
            Forgot Password?
          </Link>

          <Link
            to="/register"
            className="text-slate-300 hover:text-white"
          >
            Create Account
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Login;