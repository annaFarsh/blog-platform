import { Outlet } from "react-router-dom";
import Header from "./Header";
import NotFoundPage from "../pages/NotFoundPage";
import { useSelector } from "react-redux";

function Layout() {
  const error = useSelector((state) => state.articles.error);
  if (error === 404) {
    return (
      <>
        <Header />
        <main className="content">
          <NotFoundPage />
        </main>
        <footer className="footer"></footer>
      </>
    );
  } else {
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
}
export { Layout };
