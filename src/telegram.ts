import { env } from "./config/env.ts";

/**
 * Send a Markdown message to every configured chat. Prints to console if unconfigured.
 * Returns false if any chunk failed to be delivered.
 */
export async function sendTelegram(text: string): Promise<boolean> {
  if (!env.telegramToken || !env.telegramChatIds.length) {
    console.log("[telegram] não configurado — imprimindo no console:\n");
    console.log(text);
    return true;
  }
  let ok = true;
  for (const chatId of env.telegramChatIds) {
    for (const chunk of split(text, 3800)) {
      try {
        const res = await fetch(
          `https://api.telegram.org/bot${env.telegramToken}/sendMessage`,
          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: chunk,
              parse_mode: "Markdown",
              disable_web_page_preview: true,
            }),
          },
        );
        if (!res.ok) {
          ok = false;
          console.error(`[telegram] ${res.status}: ${await res.text()}`);
        }
      } catch (err) {
        ok = false;
        console.error(`[telegram] falha de rede: ${(err as Error).name}`);
      }
    }
  }
  return ok;
}

function split(text: string, max: number): string[] {
  if (text.length <= max) return [text];
  const out: string[] = [];
  let buf = "";
  for (const raw of text.split("\n")) {
    for (let i = 0; i === 0 || i < raw.length; i += max - 1) {
      const line = raw.slice(i, i + max - 1);
      if (buf && buf.length + line.length + 1 > max) {
        out.push(buf);
        buf = "";
      }
      buf += `${line}\n`;
    }
  }
  if (buf.trim()) out.push(buf);
  return out;
}
