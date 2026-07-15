import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    // TODO:
    // Replace with backend API when available.
    // Example:
    // await api.post("/auth/forgot-password",{email});

    setTimeout(() => {
      toast.success("Password reset link sent successfully.");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] px-4">

      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#111827] p-8">

        <h1 className="text-center text-3xl font-bold text-white">
          Forgot Password
        </h1>

        <p className="mt-3 text-center text-slate-400">
          Enter your registered email address.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400"
            />

          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-black hover:bg-emerald-400 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        <div className="mt-6 text-center">

          <Link
            to="/login"
            className="text-emerald-400 hover:underline"
          >
            Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;