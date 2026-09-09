// No browser, network, credentials, or API submission required.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

function loadModule(file, initialStorage, blocked = false) {
  const entries = new Map(initialStorage ? [["sunforge-assessment-v1", initialStorage]] : []);
  const events = [];
  const storage = {
    getItem: key => { if (blocked) throw Error("blocked"); return entries.get(key) ?? null; },
    setItem: (key, value) => { if (blocked) throw Error("blocked"); entries.set(key, value); },
    removeItem: key => { if (blocked) throw Error("blocked"); entries.delete(key); },
  };
  const source = fs.readFileSync(path.join(__dirname, "..", file), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const sandbox = { exports: {}, require: id => id === "react" ? { useSyncExternalStore: (_subscribe, get) => get() } : require(id), localStorage: storage, window: { dispatchEvent: event => events.push(event.type), addEventListener() {}, removeEventListener() {} }, Event: class { constructor(type) { this.type = type; } } };
  vm.runInNewContext(compiled, sandbox, { filename: file });
  return { api: sandbox.exports, entries, events };
}

const { api, entries, events } = loadModule("lib/assessment.ts");
for (const [pain, websiteState, expected] of [
  ["calls", "working", "receptionist"], ["calls", "weak", "both"],
  ["calls", "none", "both"], ["website", "working", "website"],
  ["website", "none", "website"], ["both", "working", "both"],
]) {
  assert.equal(api.recommendation({ ...api.emptyAssessment, pain, websiteState }).id, expected);
}
api.chooseIndustry("restaurant");
assert.equal(api.useAssessment().profile.value, 65);
api.updateAssessment({ pain: "both", websiteState: "weak", step: 2, calls: -10, missPct: 999, email: "must-not-save@example.test" });
assert.equal(api.useAssessment().profile.calls, 0);
assert.equal(api.useAssessment().profile.missPct, 100);
assert.equal(api.useAssessment().profile.step, 2);
const saved = entries.get("sunforge-assessment-v1");
assert(!saved.includes("must-not-save"));
assert(!saved.includes("email"));
assert(events.includes("sunforge-assessment-changed"));
const restored = loadModule("lib/assessment.ts", saved).api.useAssessment().profile;
assert.equal(restored.industry, "restaurant");
assert.equal(restored.step, 2);
assert.equal(restored.pain, "both");
const malicious = loadModule("lib/assessment.ts", JSON.stringify({ industry: "unknown", pain: "invalid", step: 99, calls: "huge", value: -12 })).api.useAssessment().profile;
assert.equal(malicious.industry, "");
assert.equal(malicious.pain, "");
assert.equal(malicious.step, 2);
assert.equal(malicious.calls, 200);
assert.equal(malicious.value, 0);
assert.equal(loadModule("lib/assessment.ts", "{bad json").api.useAssessment().profile.step, 0);
const blocked = loadModule("lib/assessment.ts", null, true).api;
blocked.updateAssessment({ industry: "salon", pain: "website" });
assert.equal(blocked.useAssessment().profile.industry, "salon");
assert.equal(blocked.useAssessment().persistent, false);
api.resetAssessment();
assert.equal(entries.size, 0);
assert.equal(api.useAssessment().profile.industry, "");
const calculator = loadModule("lib/calculator.ts").api;
const estimate = calculator.computeLeak({ calls: 200, missPct: 30, value: 120, capacityPct: 50 });
assert.equal(estimate.monthlyLow, 1080);
assert.equal(estimate.monthly, 3600);
assert.equal(calculator.computeLeak({ calls: 0, missPct: 100, value: 120, capacityPct: 100 }).monthly, 0);
console.log("PASS: recommendation branches, industry defaults, numeric bounds, non-PII persistence, restore, malformed storage, blocked storage, reset, and ROI math.");

