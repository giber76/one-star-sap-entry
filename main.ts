// One Star, Written in Sap — make.fun entry (Node 22, standard library only).
//
// A houseplant leaves a one-star review of its human owner. The program
// writes that single line to /output/entry.txt, where the sealed gate
// checks it is UTF-8 text of 1 to 279 characters and a judge model then
// compares it pairwise against the other entries.
//
// Run it outside the grader's container with MAKEFUN_OUTPUT_DIR standing
// in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//   cat out/entry.txt

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The review, exactly as the judge will read it: one line, 195 chars.
// A plant's grievance, in its own voice — water, brown leaves, a radiator,
// and a window it asked for once, in 2019.
const REVIEW =
  "One star. He waters me like he's apologizing to a plant he already killed, then acts shocked when I answer in brown. I didn't ask to live above the radiator — I asked for a window, once, in 2019.";

function checkLine(line: string): void {
  if (line.length < 1 || line.length > 279) {
    throw new Error(`review must be 1-279 characters, got ${line.length}`);
  }
  if (line.includes('\n') || line.includes('\r')) {
    throw new Error('review must be a single line');
  }
  if (line.trim().length === 0) {
    throw new Error('review must not be blank');
  }
  // The gate counts raw characters, so a stray leading/trailing space or a
  // control character would change what the judge reads. Fail loudly.
  if (line !== line.trim()) {
    throw new Error('review must not start or end with whitespace');
  }
  for (const ch of line) {
    if (ch.charCodeAt(0) < 0x20 && ch !== '\t') {
      throw new Error('review must not contain control characters');
    }
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

checkLine(REVIEW);
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), REVIEW, 'utf8');
console.log(`wrote entry.txt (${REVIEW.length} chars)`);
