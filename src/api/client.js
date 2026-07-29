const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

function getToken() {
  return localStorage.getItem("clearance_token");
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await res.json() : null;

  if (!res.ok) {
    const message = data?.message || data?.[0] || "Terjadi kesalahan pada server.";
    throw new Error(message);
  }

  return data;
}

export const api = {
  // --- Auth ---
  register: (payload) => request("/auth/register", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),

  // --- Products ---
  getProducts: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/products${qs ? `?${qs}` : ""}`);
  },
  getProduct: (id) => request(`/products/${id}`),

  // --- Orders ---
  checkout: (payload) => request("/orders/checkout", { method: "POST", body: payload, auth: true }),
  getMyOrders: () => request("/orders", { auth: true })
};

export function saveToken(token) {
  localStorage.setItem("clearance_token", token);
}

export function clearToken() {
  localStorage.removeItem("clearance_token");
}

export function hasToken() {
  return Boolean(getToken());
}
