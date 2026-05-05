"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { ACTIVE_TENANT_COOKIE } from "@/lib/tenant/constants";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const tenantIdSchema = z.string().uuid();

/**
 * Persists the user's active tenant in an HttpOnly cookie.
 * Business rule enforcement (membership) should run before calling this in production.
 */
export async function setActiveTenant(formData: FormData) {
  const raw = String(formData.get("tenantId") ?? "");
  const parsed = tenantIdSchema.safeParse(raw);
  if (!parsed.success) {
    redirect("/dashboard?error=invalid_tenant");
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const cookieStore = await cookies();
  cookieStore.set(ACTIVE_TENANT_COOKIE, parsed.data, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 400,
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
