const API_URL: string = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, init);
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Request failed with status ${res.status}`);
    }
    return res.json() as Promise<T>;
}

export const apiGet = <T>(path: string) => request<T>(path);

export const apiPost = <T>(path: string, body: unknown) =>
    request<T>(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
