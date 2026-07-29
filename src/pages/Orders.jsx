import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../api/client";
import { formatRupiah } from "../components/ProductCard";

export default function Orders() {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getMyOrders()
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="orders-page">
      <h1>Pesanan Saya</h1>

      {location.state?.justPlacedOrderId && (
        <p className="orders-page__success">
          Pesanan #{location.state.justPlacedOrderId} berhasil dibuat!
        </p>
      )}

      {loading && <p className="catalog__status">Memuat riwayat pesanan...</p>}
      {error && <p className="catalog__status catalog__status--error">{error}</p>}
      {!loading && orders.length === 0 && (
        <p className="catalog__status">Belum ada pesanan.</p>
      )}

      <div className="orders-page__list">
        {orders.map((order) => (
          <div key={order.orderId} className="order-card">
            <div className="order-card__header">
              <span>Pesanan #{order.orderId}</span>
              <span className={`order-card__status order-card__status--${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.productName} × {item.quantity} — {formatRupiah(item.subtotal)}
                </li>
              ))}
            </ul>
            <div className="order-card__total">
              <span>Total</span>
              <strong>{formatRupiah(order.totalAmount)}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
