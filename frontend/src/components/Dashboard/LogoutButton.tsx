"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowserClient } from "../../lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);
    const supabase = createSupabaseBrowserClient();

    if (supabase) {
      await supabase.auth.signOut();
    }

    router.push("/login");
    router.refresh();
  }

  return (
    <button
      className="font-['PolySans'] border border-white/15 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:border-yellow-400 hover:text-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={isLoading}
      onClick={handleLogout}
      type="button"
    >
      {isLoading ? "Logging out..." : "Log out"}
    </button>
  );
}
