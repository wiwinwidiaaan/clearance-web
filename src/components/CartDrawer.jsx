import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatRupiah } from "./ProductCard";

export default function CartDrawer({ open, onClose }) {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleCheckout() {
    onClose();
    navigate(isAuthenticated ? "/checkout" : "/login");
  }

  return (
    <>
      <div className={`cart-drawer__overlay ${open ? "is-open" : ""}`} onClick={onClose} />
      <aside className={`cart-drawer ${open ? "is-open" : ""}`}>
        <div className="cart-drawer__header">
          <h2>Keranjang</h2>
          <button onClick={onClose} aria-label="Tutup keranjang">✕</button>
        </div>

        {items.length === 0 ? (
          <p className="cart-drawer__empty">Keranjang masih kosong. Yuk cari barang murah.</p>
        ) : (
          <ul className="cart-drawer__list">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="cart-drawer__item">
                <div>
                  <p className="cart-drawer__item-name">{product.name}</p>
                  <p className="cart-drawer__item-price">{formatRupiah(product.currentPrice)}</p>
                </div>
                <div className="cart-drawer__qty">
                  <button onClick={() => updateQuantity(product.id, quantity - 1)}>−</button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    disabled={quantity >= product.stockAvailable}
                  >
                    +
                  </button>
                </div>
                <button className="cart-drawer__remove" onClick={() => removeItem(product.id)}>
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-drawer__footer">
          <div className="cart-drawer__total">
            <span>Total</span>
            <strong>{formatRupiah(totalPrice)}</strong>
          </div>
          <button
            className="cart-drawer__checkout-btn"
            disabled={items.length === 0}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
