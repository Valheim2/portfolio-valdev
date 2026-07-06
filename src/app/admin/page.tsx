import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";
import { MessagesTable } from "./messages-table";
import { LogoutButton } from "./logout-button";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const messages = await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const unread = messages.filter((m) => !m.read).length;

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold">Messages reçus</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {messages.length} message{messages.length > 1 ? "s" : ""}
            {unread > 0 && ` · ${unread} non lu${unread > 1 ? "s" : ""}`}
          </p>
        </div>
        <LogoutButton />
      </div>

      <MessagesTable
        messages={messages.map((m) => ({
          id: m.id,
          name: m.name,
          email: m.email,
          message: m.message,
          read: m.read,
          createdAt: m.createdAt.toISOString(),
        }))}
      />
    </main>
  );
}
