import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] px-6 text-white">

      <div className="max-w-xl text-center">

        <h1 className="text-8xl font-black text-emerald-400">
          404
        </h1>

        <h2 className="mt-6 text-4xl font-bold">
          Page Not Found
        </h2>

        <p className="mt-4 leading-8 text-slate-400">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">

          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
          >
            <Home size={18} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 transition hover:bg-slate-800"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

        </div>

      </div>

    </div>
  );
}

export default NotFound;