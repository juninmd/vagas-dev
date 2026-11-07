import { expect, test } from "bun:test";
import { topic } from "../src/topic.ts";

test("define topic with configured vagas feeds", () => {
  expect(topic.name).toBe("vagas-dev");
  expect(topic.title).toBe("Vagas Dev Remotas");
  expect(topic.emoji).toBe("💼");
  expect(topic.feeds.length).toBeGreaterThan(0);
  expect(topic.systemPrompt).toContain("recrutador tech");
});
