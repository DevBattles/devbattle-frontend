import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

function PublicLayout() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        <Outlet />
      </main>
    </>
  );
}

export default PublicLayout;