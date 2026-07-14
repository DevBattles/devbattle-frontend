import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import Container from "./Container";
import Logo from "./Logo";

import { NAV_LINKS } from "@/constants/navigation";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-[#1e293b] bg-[#050816]/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `transition ${
                    isActive
                      ? "text-[#4ADE80]"
                      : "text-slate-300 hover:text-[#4ADE80]"
                  }`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>

          {/* Right Buttons */}
          <div className="hidden items-center gap-4 lg:flex">
            <Button
              variant="outline"
              className="border-[#4ADE80] bg-transparent text-[#4ADE80] hover:bg-[#4ADE80] hover:text-black"
            >
              Login
            </Button>

            <Button className="bg-[#4ADE80] text-black hover:bg-[#3ecf73]">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu */}
          <button className="text-white lg:hidden">
            <Menu size={28} />
          </button>
        </div>
      </Container>
    </header>
  );
}

export default Navbar;