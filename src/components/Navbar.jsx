import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar({ onCartClick }) {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="navbar">
      <Link to="/" className="navbar__logo">
        OVER<span>STOCK</span>
      </Link>

      <nav className="navbar__links">
        {isAuthenticated ? (
          <>
            <Link to="/orders">Pesanan Saya</Link>
            <span className="navbar__user">Hi, {user?.fullName?.split(" ")[0]}</span>
            <button className="navbar__link-btn" onClick={logout}>
              Keluar
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Masuk</Link>
            <Link to="/register" className="navbar__cta">
              Daftar
            </Link>
          </>
        )}

        <button className="navbar__cart" onClick={onCartClick} aria-label="Buka keranjang">
          KERANJANG
          {totalItems > 0 && <span className="navbar__cart-badge">{totalItems}</span>}
        </button>
      </nav>
    </header>
  );
}
