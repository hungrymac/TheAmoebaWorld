import { cookies } from "next/headers";

import { ACTIVE_TENANT_COOKIE } from "@/lib/tenant/constants";

export async function getActiveTenantId(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(ACTIVE_TENANT_COOKIE)?.value;
  return raw ?? undefined;
}
