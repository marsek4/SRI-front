import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Header from "@components/Header";

const ProtectedLayout = () => {
  const isAuthed = useAuthStore((s) => s.isAuthenticated());
  const location = useLocation();

  if (!isAuthed) {
    return (
      <Navigate
        to="/authorization"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default ProtectedLayout;
