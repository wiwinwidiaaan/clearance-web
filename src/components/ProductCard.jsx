import { useCart } from "../context/CartContext";

const CONDITION_LABEL = {
  New: "Baru",
  Overstock: "Overstock",
  Returned: "Retur",
  Refurbished: "Refurbished",
  Damaged: "Cacat Kemasan"
};

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
    value
  );
}

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const discountPct = Math.round(
    ((product.originalPrice - product.currentPrice) / product.originalPrice) * 100
  );
  const outOfStock = product.stockAvailable <= 0;

  return (
    <article className="product-card">
      {product.hasActiveFlashSale && <div className="product-card__flash">⚡ FLASH SALE</div>}

      <div className="product-card__image-wrap">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="product-card__image" />
        ) : (
          <div className="product-card__image-placeholder">{product.category}</div>
        )}

        {discountPct > 0 && (
          <div className="product-card__sticker">
            <span>-{discountPct}%</span>
          </div>
        )}
      </div>

      <div className="product-card__body">
        <span className="product-card__condition">{CONDITION_LABEL[product.condition]}</span>
        <h3 className="product-card__name">{product.name}</h3>

        <div className="product-card__price-row">
          {discountPct > 0 && (
            <span className="product-card__price-original">{formatRupiah(product.originalPrice)}</span>
          )}
          <span className="product-card__price-current">{formatRupiah(product.currentPrice)}</span>
        </div>

        <div className="product-card__footer">
          <span className={`product-card__stock ${outOfStock ? "is-empty" : ""}`}>
            {outOfStock ? "Stok habis" : `Sisa ${product.stockAvailable}`}
          </span>
          <button
            className="product-card__add-btn"
            disabled={outOfStock}
            onClick={() => addItem(product)}
          >
            + Keranjang
          </button>
        </div>
      </div>
    </article>
  );
}

export { formatRupiah };
