import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Provider from "./lib/providers/index.tsx";
import Login from "./pages/auth/Login.js";
import SignUp from "./pages/auth/SignUp.js";
import Products from "./pages/Products.js";
import Cart from "./pages/Cart.js";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import Navbar from "./components/layout/Navbar.js";
import useAuthStore from "./store/authStore.ts";

function AppContent() {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/"];
  const { user } = useAuthStore();
  const { logout } = useAuthStore();
  console.log("user", user);
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar user={user} logout={logout} />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SignUp />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <AppContent />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
