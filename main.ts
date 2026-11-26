import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const forecast =
  "Puddlewick: showers easing by nine, sunshine auditioning at lunch, and one heroic breeze drying the bus-stop benches.";

// Mirror the gate: UTF-8 text, 1-140 characters, single line, not only white space.
function assertValidForecast(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 140 || /[\r\n]/.test(text) || text.trim() === "") {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

function writeEntryAtomically(outputDir, text) {
  mkdirSync(outputDir, { recursive: true });
  const tmp = join(outputDir, ".entry.txt.tmp");
  writeFileSync(tmp, text, "utf8");
  renameSync(tmp, join(outputDir, "entry.txt"));
}

assertValidForecast(forecast);
writeEntryAtomically(process.env.MAKEFUN_OUTPUT_DIR || "/output", forecast);
