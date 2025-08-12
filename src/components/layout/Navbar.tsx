import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiLogOut } from "react-icons/fi";
import useCartStore from "../../store/cartstore";

interface IProps {
  user: () => void,
  logout: () => void
}

export default function Navbar({ user, logout }: IProps) {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);

  const totalItems = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + (item.quantity || 1), 0)
    : 0;

  const handleLogout = () => {
    logout();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "1rem",
        borderBottom: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Link
          to="/products"
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            marginRight: "1rem",
          }}
        >
          🛍 MyShop
        </Link>
        <Link to="/products" style={{ marginRight: "1rem" }}>
          Products
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link to="/cart" style={{ position: "relative", fontSize: "1.5rem" }}>
          <FiShoppingCart />
          {totalItems > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "0.75rem",
              }}
            >
              {totalItems}
            </span>
          )}
        </Link>

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#666",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
              title={user.name}
            ></div>
            <span>{user.name}</span>
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#333",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
