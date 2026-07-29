import { useEffect, useState } from "react";
import { api } from "../api/client";
import ProductCard from "../components/ProductCard";

const CATEGORIES = ["Semua", "Elektronik", "Fashion", "Rumah Tangga", "Olahraga"];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("Semua");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError("");

    const params = {};
    if (category !== "Semua") params.category = category;
    if (search) params.search = search;

    api
      .getProducts(params)
      .then((data) => {
        if (!ignore) setProducts(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [category, search]);

  return (
    <div>
      <section className="hero">
        <div className="hero__stamp">EVERYTHING MUST GO</div>
        <h1 className="hero__title">
          Barang bagus, <br />harga sisa stok.
        </h1>
        <p className="hero__subtitle">
          Overstock, retur, dan refurbished dengan kondisi jelas dan harga jujur.
          Stok terbatas — begitu habis, ya habis.
        </p>
      </section>

      <section className="catalog">
        <div className="catalog__controls">
          <div className="catalog__categories">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`catalog__category-chip ${category === c ? "is-active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <input
            className="catalog__search"
            type="search"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading && <p className="catalog__status">Memuat produk...</p>}
        {error && (
          <p className="catalog__status catalog__status--error">
            Gagal memuat produk: {error}. Pastikan backend API sedang berjalan.
          </p>
        )}
        {!loading && !error && products.length === 0 && (
          <p className="catalog__status">Tidak ada produk yang cocok.</p>
        )}

        <div className="catalog__grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
