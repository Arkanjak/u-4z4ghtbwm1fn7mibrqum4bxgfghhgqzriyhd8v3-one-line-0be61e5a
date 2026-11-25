// One Line, One Laugh — u-4z4ghtbwm1fn7mibrqum4bxgfghhgqzriyhd8v3-one-line-0be61e5a
//
// The entry is one funny line, written by this program to
// /output/entry.txt, where the sealed gate scorer reads it. The gate
// wants UTF-8 text of 1 to 140 characters, not only white space, and
// the task wants exactly one line. The program runs in a sandbox with
// no network, so the line is embedded here: it reads no other file.
// Its output directory comes from MAKEFUN_OUTPUT_DIR, falling back to
// the competition's /output, never from the working directory, so the
// program behaves the same from any cwd.
import { mkdirSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

// One line, one laugh: a smart speaker that keeps a secret the worst
// way possible — by sharing it widely, and in seven languages. The
// turn is the whisper going outward instead of staying private, and
// the last two words land it. Every word earns its place: no setup
// beyond the secret, no punchline beyond the whisper.
const ENTRY =
  "I told my smart speaker to keep a secret, so it whispered it to the neighbors in seven languages.";

function validate(line: string): void {
  if (line.length < 1 || line.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY, "utf8");
  const sha = createHash("sha256").update(ENTRY, "utf8").digest("hex");
  console.log(
    `ok: entry.txt ${ENTRY.length} chars, sha256 ${sha} -> ${outPath}`,
  );
}

main();
