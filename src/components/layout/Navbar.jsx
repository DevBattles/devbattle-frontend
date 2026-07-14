import Logo from "./Logo";
import Container from "./Container";

function Navbar() {
  return (
    <nav className="border-b bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <div className="flex gap-6">
            <a href="/">Home</a>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;