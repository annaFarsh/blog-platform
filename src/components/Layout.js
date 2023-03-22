import {  Outlet } from "react-router-dom";
import Header from "./Header";
function Layout() {
  return (
    <>
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <footer className="footer"></footer>
    </>
  );
}
export { Layout };
