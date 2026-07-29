import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { api } from "../api/client";
import { formatRupiah } from "../components/ProductCard";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Keranjang kosong.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        shippingAddress: address,
        items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity }))
      };
      const order = await api.checkout(payload);
      clearCart();
      navigate("/orders", { state: { justPlacedOrderId: order.orderId } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <p className="catalog__status">Keranjang kosong. Kembali ke katalog untuk belanja dulu.</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h1>Checkout</h1>

        {error && <p className="auth-form__error">{error}</p>}

        <label>
          Alamat Pengiriman
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            required
            placeholder="Nama jalan, kota, kode pos..."
          />
        </label>

        <div className="checkout-summary">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="checkout-summary__row">
              <span>
                {product.name} × {quantity}
              </span>
              <span>{formatRupiah(product.currentPrice * quantity)}</span>
            </div>
          ))}
          <div className="checkout-summary__total">
            <span>Total</span>
            <strong>{formatRupiah(totalPrice)}</strong>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Memproses pesanan..." : "Buat Pesanan"}
        </button>
      </form>
    </div>
  );
}
