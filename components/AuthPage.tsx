"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Lock, ShieldCheck, Terminal, User as UserIcon } from "lucide-react";
import { useAuthStore } from "@/lib/authStore";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useAuthStore();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await res.json()
        : { error: await res.text() || "Unexpected server response" };

      if (!res.ok) {
        throw new Error(data.error ?? "Authentication failed");
      }

      if (isLogin) {
        setUser({ id: data.id, username: data.username });
      } else {
        setIsLogin(true);
        setError("Registration successful. Please sign in.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4 py-8 sm:px-6 sm:py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center sm:mb-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--ink)] text-[var(--bg)] shadow-lg">
            <Terminal size={30} />
          </div>
          <h1 className="font-serif text-3xl italic text-[var(--ink)] sm:text-4xl">DevTools Hub</h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-[var(--muted)]">Authentication required</p>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-white p-5 shadow-xl sm:p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="ml-1 text-[10px] font-mono uppercase tracking-widest text-[var(--muted)]">Username</label>
              <div className="relative mt-2">
                <UserIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                <input
                  type="text"
                  required
                  minLength={3}
                  maxLength={64}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-2xl bg-[var(--surface)] py-4 pl-12 pr-4 outline-none ring-[var(--accent)] transition focus:ring-2"
                  placeholder="dev_operator"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="ml-1 text-[10px] font-mono uppercase tracking-widest text-[var(--muted)]">Password</label>
              <div className="relative mt-2">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                <input
                  type="password"
                  required
                  minLength={8}
                  maxLength={128}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl bg-[var(--surface)] py-4 pl-12 pr-4 outline-none ring-[var(--accent)] transition focus:ring-2"
                  placeholder="********"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
              </div>
            </div>

            {error && <p className="rounded-xl border border-red-200 bg-red-50 p-3 font-mono text-xs text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--ink)] py-4 font-mono text-xs font-bold uppercase tracking-widest text-[var(--bg)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>{loading ? "Processing" : isLogin ? "Sign In" : "Create Account"}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-8 border-t border-[var(--border)] pt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin((prev) => !prev)}
              className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] transition hover:text-[var(--ink)]"
            >
              {isLogin ? "Need an account? Register" : "Already have an account? Login"}
            </button>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[var(--muted)]">
          <ShieldCheck size={14} />
          <span className="font-mono text-[10px] uppercase tracking-widest">Secure session cookies enabled</span>
        </div>
      </div>
    </div>
  );
}
