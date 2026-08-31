import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const files = execFileSync(
  "git",
  ["ls-files", "--cached", "--others", "--exclude-standard"],
  { encoding: "utf8" },
)
  .trim()
  .split("\n")
  .filter(Boolean)
  .filter((file) => !file.startsWith(".audit/"))
  .filter((file) => file !== "scripts/check-zillow.mjs")
  .filter((file) => existsSync(file))
  .filter(
    (file) =>
      file === ".env.example" ||
      /\.(?:css|json|md|mjs|svg|ts|tsx|wgsl)$/.test(file),
  );

const banned = [
  ["source customer name", new RegExp(["data", "dog"].join(""), "i")],
  ["restyle reference name", new RegExp(["sea", "gate"].join(""), "i")],
  [
    "source customer palette",
    new RegExp(
      ["#632", "ca6|#4c1", "d82|rgba\\(\\s*99\\s*,\\s*44\\s*,\\s*166"].join(
        "",
      ),
      "i",
    ),
  ],
  ["long dash", /\u2014|\u2013/],
];

const failures = [];
for (const file of files) {
  const text = readFileSync(file, "utf8");
  for (const [label, pattern] of banned) {
    if (pattern.test(text)) failures.push(`${file}: ${label}`);
  }
}

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
if (packageJson.dependencies?.next !== "15.5.24") {
  failures.push("package.json: Next must stay on 15.5.24");
}
for (const name of ["geist", "vgpu"]) {
  if (!packageJson.dependencies?.[name]) {
    failures.push(`package.json: missing ${name}`);
  }
}

const lockup = readFileSync("src/components/BrandLockup.tsx", "utf8");
if (!lockup.includes("https://s.zillowstatic.com/pfs/static/z-logo-default.svg")) {
  failures.push("BrandLockup.tsx: missing the official Zillow wordmark URL");
}
if (!lockup.includes("/brand/spacexai.svg")) {
  failures.push("BrandLockup.tsx: missing SpaceXAI");
}

const page = readFileSync("src/app/(protected)/page.tsx", "utf8");
for (const value of ["Mike Kelly", "michael.kelly@cursor.com"]) {
  if (!page.includes(value)) failures.push(`page.tsx: missing ${value}`);
}

const env = readFileSync(".env.example", "utf8");
if (!/^SITE_PASSWORD=land2expand$/m.test(env)) {
  failures.push(".env.example: SITE_PASSWORD must be land2expand");
}

const auth = readFileSync("src/lib/auth.ts", "utf8");
if (!auth.includes("process.env.SITE_PASSWORD")) {
  failures.push("auth.ts: SITE_PASSWORD must stay server-side");
}
if (files.some((file) => readFileSync(file, "utf8").includes("NEXT_PUBLIC_SITE_PASSWORD"))) {
  failures.push("SITE_PASSWORD must not use a NEXT_PUBLIC variable");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Checked ${files.length} Zillow files.`);
