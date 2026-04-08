// src/lib/api.js

// استخدم متغير البيئة إن وُجد، وإلا fallback إلى باك إند Railway (HTTPS)
const RAW_API =
  (import.meta?.env?.VITE_API_BASE ?? "https://growly-backend-production.up.railway.app");

// شيل أي سلاش زائد في النهاية
const API = String(RAW_API).replace(/\/+$/, "");

// (اختياري) ساعدك في الديبَج: لو لسه Localhost في prod نطلع تحذير
if (API.includes("http://localhost")) {
  console.warn("⚠️ API base is localhost; set VITE_API_BASE in Railway Variables.");
}

console.log("API base =>", API);

async function request(
  path,
  { method = "POST", body, token, timeout = 15000 } = {}
) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), timeout);

  let res, data;
  try {
    // ضمن أن path يبدأ بـ /
    const url = `${API}${path.startsWith("/") ? path : `/${path}`}`;

    res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: ctrl.signal,
    });
    data = await res.json().catch(() => ({}));
  } catch (e) {
    clearTimeout(id);
    throw new Error(e?.name === "AbortError" ? "request_timeout" : "network_error");
  } finally {
    clearTimeout(id);
  }

  if (!res.ok) {
    throw new Error(data?.code || data?.error || `HTTP_${res.status}`);
  }
  return data;
}

export function sendContact(payload) {
  return request("/api/v1/contact", { body: { honeypot: "", ...payload } });
}

export async function adminLogin(email, password) {
  const data = await request("/api/auth/login", { body: { email, password } });
  return data.token;
}

export async function listMessages(token) {
  const data = await request("/api/admin/messages", { method: "GET", token });
  return data.data || [];
}
