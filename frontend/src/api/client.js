// src/api/client.js

// Base URL de l'API backend
// En dev:  VITE_API_URL=http://localhost:3000
// En prod (K8s): souvent on mettra VITE_API_URL="" et on utilisera "/api"
const RAW_API_BASE_URL = import.meta.env.VITE_API_URL || "";

// On enlève le "/" final éventuel pour éviter les "//"
const API_BASE_URL = RAW_API_BASE_URL.replace(/\/$/, "");

export async function fetchTasks() {
  const res = await fetch(`${API_BASE_URL}/api/tasks`);
  if (!res.ok) {
    throw new Error(`Erreur HTTP ${res.status}`);
  }
  return res.json();
}

export async function createTask(payload) {
  const res = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Erreur HTTP ${res.status}`);
  }
  return res.json();
}
