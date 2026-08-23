import { getMessages } from "@/lib/queries";
import { deleteMessage, markMessageRead } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  let messages: Awaited<ReturnType<typeof getMessages>> = [];
  try {
    messages = await getMessages();
  } catch {
    // table not reachable; render empty state below
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-mist">Messages</h1>
      <p className="mt-2 text-sm text-dust">
        Submissions from the contact form on your site.
      </p>

      {messages.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-mist/15 p-10 text-center text-sm text-faint">
          No messages yet.
        </p>
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={`flex flex-col gap-3 rounded-2xl border p-6 ${
                msg.read
                  ? "border-mist/[0.07] bg-deep/40"
                  : "border-starlight/25 bg-deep/70"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-mist">
                    {msg.name}
                    {!msg.read && (
                      <span className="ml-2 rounded-full border border-starlight/40 px-2 py-0.5 align-middle font-mono text-[10px] uppercase tracking-wide text-starlight">
                        New
                      </span>
                    )}
                  </p>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-sm text-dust transition-colors hover:text-mist"
                  >
                    {msg.email}
                  </a>
                </div>
                <p className="font-mono text-xs text-faint">
                  {new Date(msg.created_at).toLocaleString()}
                </p>
              </div>

              <p className="whitespace-pre-wrap leading-relaxed text-dust">{msg.message}</p>

              <div className="flex items-center gap-3 pt-1">
                {!msg.read && (
                  <form action={markMessageRead}>
                    <input type="hidden" name="id" value={msg.id} />
                    <button
                      type="submit"
                      className="rounded-[10px] border border-mist/15 px-4 py-2 text-sm text-dust transition-colors hover:border-starlight/50 hover:text-starlight"
                    >
                      Mark as read
                    </button>
                  </form>
                )}
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={msg.id} />
                  <button
                    type="submit"
                    className="rounded-[10px] border border-rose-400/30 px-4 py-2 text-sm text-rose-300 transition-colors hover:border-rose-400/60 hover:text-rose-200"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
