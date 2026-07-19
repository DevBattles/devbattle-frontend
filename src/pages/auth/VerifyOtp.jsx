import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { verifyOtp, resendOtp } from "@/services/auth.service";
import { useAuth } from "@/context/useAuth";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, getDashboardPath } = useAuth();

  // Try to extract email from router state, fallback to empty string
  const [email, setEmail] = useState(() => location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(60);

  // Handle countdown for resending OTP
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (otp.length !== 6) {
      toast.error("OTP must be exactly 6 digits.");
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOtp(email, otp);
      toast.success("Email verified successfully!");
      
      // Auto login user
      login(response.data.user, response.data.token);
      
      // Redirect to correct dashboard path
      setTimeout(() => {
        // Safe check to get dashboard path since context state is updated
        if (response.data.user) {
          const role = response.data.user.role;
          if (role === "student") navigate("/student/dashboard");
          else if (role === "teacher") navigate("/teacher/dashboard");
          else if (role === "admin") navigate("/admin/dashboard");
          else navigate("/login");
        } else {
          navigate(getDashboardPath());
        }
      }, 800);
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "OTP verification failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("Please enter your email to resend OTP.");
      return;
    }

    setResending(true);
    try {
      const response = await resendOtp(email);
      toast.success(response.message || "A new OTP has been sent!");
      setCooldown(60); // Reset the 60s cooldown timer
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Failed to resend OTP. Please try again.";
      toast.error(message);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#111827] p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Verify Email
        </h1>
        
        <p className="mb-8 text-center text-slate-400">
          Enter the 6-digit verification code sent to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              disabled={!!location.state?.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              6-Digit OTP Code
            </label>
            <input
              type="text"
              name="otp"
              maxLength={6}
              required
              placeholder="e.g. 123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
              className="w-full text-center text-2xl tracking-[0.5em] font-mono rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-300">
          Didn't receive code?{" "}
          {cooldown > 0 ? (
            <span className="text-slate-500 font-medium">
              Resend in {cooldown}s
            </span>
          ) : (
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-emerald-400 hover:underline font-semibold bg-transparent border-none cursor-pointer"
            >
              {resending ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>

        <div className="mt-4 text-center text-sm text-slate-400">
          <Link to="/login" className="text-slate-300 hover:text-white underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
