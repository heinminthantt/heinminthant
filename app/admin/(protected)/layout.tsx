import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignOut } from "@phosphor-icons/react/dist/ssr";
import { isAuthenticated } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col px-6 lg:flex-row lg:gap-12">
      <aside className="shrink-0 py-6 lg:sticky lg:top-0 lg:flex lg:h-[100dvh] lg:w-56 lg:flex-col lg:py-10">
        <Link href="/admin" className="font-mono text-sm tracking-wide text-starlight">
          Mission Control
        </Link>

        <div className="mt-5 overflow-x-auto lg:mt-10">
          <AdminNav />
        </div>

        <div className="mt-6 flex items-center gap-3 pb-2 lg:mt-auto">
          <Link
            href="/"
            target="_blank"
            className="text-sm text-dust transition-colors hover:text-mist"
          >
            View site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 text-sm text-dust transition-colors hover:text-rose-300"
            >
              <SignOut size={14} aria-hidden="true" />
              Log out
            </button>
          </form>
        </div>
      </aside>

      <main className="min-w-0 flex-1 pb-20 pt-4 lg:py-10">{children}</main>
    </div>
  );
}
