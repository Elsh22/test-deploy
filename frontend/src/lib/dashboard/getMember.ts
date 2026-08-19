import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../supabase/server";
import { fallbackProfile, type MemberProfile } from "./platform";

export async function getMemberDashboardContext() {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return {
      email: fallbackProfile.email,
      isConfigured: false,
      profile: fallbackProfile,
      userId: "",
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();

  return {
    email: user.email ?? null,
    isConfigured: true,
    profile: ({ ...fallbackProfile, ...(data as Partial<MemberProfile> | null), email: data?.email ?? user.email } as MemberProfile),
    userId: user.id,
  };
}
