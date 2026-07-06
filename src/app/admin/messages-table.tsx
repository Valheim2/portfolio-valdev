"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, Mail, MailOpen, Trash2 } from "lucide-react";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export function MessagesTable({ messages }: { messages: Message[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function markRead(id: string) {
    setBusyId(id);
    await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    });
    setBusyId(null);
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Supprimer ce message ?")) return;
    setBusyId(id);
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    setBusyId(null);
    router.refresh();
  }

  if (messages.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
        Aucun message pour le moment.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`rounded-lg border p-5 ${
            m.read ? "border-border" : "border-brand/40 bg-brand/[0.03]"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {m.read ? (
                  <MailOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <Mail className="h-4 w-4 text-brand shrink-0" />
                )}
                <span className="font-medium truncate">{m.name}</span>
                <a
                  href={`mailto:${m.email}`}
                  className="text-sm text-muted-foreground hover:text-brand truncate"
                >
                  {m.email}
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">
                {m.message}
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                {new Date(m.createdAt).toLocaleString("fr-FR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {!m.read && (
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={busyId === m.id}
                  onClick={() => markRead(m.id)}
                  aria-label="Marquer comme lu"
                  title="Marquer comme lu"
                >
                  <Check className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                disabled={busyId === m.id}
                onClick={() => remove(m.id)}
                aria-label="Supprimer"
                title="Supprimer"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
