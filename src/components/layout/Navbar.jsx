import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import Container from "./Container";
import Logo from "./Logo";
import { NAV_LINKS } from "@/constants/navigation";
import { useAuth } from "@/context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user, getDashboardPath } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-slate-800 bg-[#050816]/80 backdrop-blur-xl">
        <Container>
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" onClick={closeMenu}>
              <Logo />
            </Link>

            {/* Desktop */}
            <nav className="hidden items-center gap-10 lg:flex">
              {NAV_LINKS.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-emerald-400"
                      : "text-slate-300 transition hover:text-emerald-400"
                  }
                >
                  {item.title}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden items-center gap-4 lg:flex">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-slate-300">
                    Hi,&nbsp;
                    <span className="font-semibold text-emerald-400">
                      {user?.username}
                    </span>
                  </span>

                  <Button
                    onClick={() => navigate(getDashboardPath())}
                    variant="outline"
                    className="border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black"
                  >
                    Dashboard
                  </Button>

                  <Button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/login")}
                    className="border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black"
                  >
                    Login
                  </Button>

                  <Button
                    onClick={() => navigate("/register")}
                    className="bg-emerald-500 text-black hover:bg-emerald-400"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="text-white lg:hidden"
            >
              <Menu size={28} />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-[90] bg-black/60 lg:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 z-[100] h-screen w-72 bg-[#0F172A] border-l border-slate-700 transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-700 p-6">
          <Logo />

          <button onClick={closeMenu}>
            <X className="text-white" size={28} />
          </button>
        </div>

        <div className="flex flex-col p-6">

          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-emerald-400"
            >
              {item.title}
            </NavLink>
          ))}

          <div className="mt-8 flex flex-col gap-3">

            {isAuthenticated ? (
              <>
                <Button
                  onClick={() => {
                    closeMenu();
                    navigate(getDashboardPath());
                  }}
                  className="bg-emerald-500 text-black hover:bg-emerald-400"
                >
                  Dashboard
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    closeMenu();
                    navigate("/profile");
                  }}
                >
                  Profile
                </Button>

                <Button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    closeMenu();
                    navigate("/login");
                  }}
                >
                  Login
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    closeMenu();
                    navigate("/register");
                  }}
                >
                  Register
                </Button>
              </>
            )}

          </div>

        </div>
      </div>
    </>
  );
}

export default Navbar;