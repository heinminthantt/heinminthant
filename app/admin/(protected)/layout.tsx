import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignOut } from "@phosphor-icons/react/dist/ssr";
import { isAuthenticated } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  return (
    <div className="min-h-[100dvh] bg-bg">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col px-6 lg:flex-row lg:gap-10">
        <aside className="shrink-0 py-6 lg:sticky lg:top-0 lg:flex lg:h-[100dvh] lg:w-60 lg:flex-col lg:py-8">
          <Link href="/admin" className="font-display text-sm font-semibold tracking-[-0.02em] text-ink">
            Control Room
          </Link>
          <p className="font-mono text-[11px] uppercase tracking-wide text-faint">Fluid system - unified dark</p>

          <div className="mt-6 overflow-x-auto lg:mt-8">
            <AdminNav />
          </div>

          <div className="mt-6 flex items-center gap-3 pb-2 lg:mt-auto">
            <Link href="/" target="_blank" className="text-sm text-muted hover:text-ink">
              View site
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-rose-300">
                <SignOut size={14} aria-hidden="true" />
                Log out
              </button>
            </form>
          </div>
        </aside>

        <main className="min-w-0 flex-1 pb-20 pt-4 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
