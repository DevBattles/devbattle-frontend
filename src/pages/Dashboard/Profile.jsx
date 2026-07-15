import { useAuth } from "@/context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto max-w-5xl px-8 py-12">

        <h1 className="text-4xl font-bold">
          My Profile
        </h1>

        <p className="mt-2 text-slate-400">
          Account Information
        </p>

        <div className="mt-10 rounded-2xl border border-slate-700 bg-[#111827] p-8">

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <p className="text-slate-400 text-sm">
                Username
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                {user?.username}
              </h2>
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Email
              </p>

              <h2 className="mt-2 text-xl">
                {user?.email}
              </h2>
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Role
              </p>

              <h2 className="mt-2 text-xl capitalize">
                {user?.role}
              </h2>
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Account Status
              </p>

              <h2 className="mt-2 text-emerald-400 font-semibold">
                Active ✅
              </h2>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;