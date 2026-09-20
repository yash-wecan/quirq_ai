/**
 * MachineSpeed v2 copy. Started from
 * machinespeed-int/website/machinespeed-site.html and revised since
 * (founder-level FAQ, business-type intake, commitments folded into How it runs).
 *
 * Plain serializable data so the server page and the client islands read the
 * same records. The before-state diagrams are JSX and live in diagrams.tsx,
 * keyed by case id.
 */

export type FlowKind = "trigger" | "agent" | "guard" | "human" | "out";

export type UseCase = {
  id: "ops" | "fin" | "rev";
  sector: string;
  name: string;
  profile: string;
  tags: string[];
  title: string;
  story: string;
  captions: { before: [string, string]; after: [string, string] };
  messNotes: string[];
  flowLabel: string;
  flow: { kind: FlowKind; label: string; title: string; note: string }[];
  number: { count: number; suffix: string; note: string };
  alone: string;
  asks: string;
};

export const CASES: UseCase[] = [
  {
    id: "ops",
    sector: "Logistics · operations",
    name: "Order exceptions",
    profile: "120-person 3PL, Shopify + NetSuite",
    tags: ["Logistics", "120 people", "Shopify · Stripe · NetSuite · WMS"],
    title:
      "Orders that don't match payment, stock or shipping, fixed before the customer notices.",
    story:
      "Ops had a Zapier chain and a ChatGPT step that “reads the order and decides.” It refunded one customer twice and stopped silently when the supplier changed a CSV column.",
    captions: {
      before: ["Before:", "4 tools, 1 owner, no record of decisions"],
      after: ["With MachineSpeed:", "read-only scopes, one approval gate, every run recorded"],
    },
    messNotes: ["write access to everything", "no approval step", "no log of why", "fails silently"],
    flowLabel: "Order exception workflow with MachineSpeed",
    flow: [
      { kind: "trigger", label: "Trigger", title: "Order fails a check", note: "payment, stock or shipping" },
      { kind: "agent", label: "Agent", title: "Reconcile across 4 systems", note: "read-only scopes" },
      { kind: "guard", label: "Guardrail", title: "Refund or reorder over $2,500?", note: "threshold set by ops" },
      { kind: "human", label: "Person", title: "Ops lead approves on phone", note: "context attached · 20s" },
      { kind: "out", label: "Result", title: "Order fixed, run recorded", note: "schema change → alert, not silence" },
    ],
    number: { count: 94, suffix: "%", note: "of exceptions closed with no one touching them" },
    alone: "Address fixes, duplicate charges, stock sync, carrier re-bookings",
    asks: "Refunds and reorders above $2,500. Anything touching a named account.",
  },
  {
    id: "fin",
    sector: "Professional services · finance",
    name: "Month-end close",
    profile: "300-person firm, Xero + Ramp",
    tags: ["Professional services", "300 people", "Xero · Ramp · Google Sheets"],
    title:
      "A month-end pack that explains every variance, and never leaves the building without sign-off.",
    story:
      "Finance had three AI tools between four people. A summary generated from a pasted export went to the board with a wrong revenue number. Close took nine days, most of it copy-paste.",
    captions: {
      before: ["Before:", "3 AI tools, pasted exports, no sources"],
      after: ["With MachineSpeed:", "one agent, read-only, CFO signs every pack"],
    },
    messNotes: ["data in personal accounts", "no sources linked", "nobody signs off", "9-day close"],
    flowLabel: "Month-end close workflow with MachineSpeed",
    flow: [
      { kind: "trigger", label: "Trigger", title: "Books close, or cash moves off plan", note: "schedule + alert" },
      { kind: "agent", label: "Agent", title: "Reconcile ledger, billing, spend", note: "read-only · sources kept" },
      { kind: "guard", label: "Guardrail", title: "Variance over 5%?", note: "must be explained, with source" },
      { kind: "human", label: "Person", title: "CFO reviews and signs", note: "edits tracked" },
      { kind: "out", label: "Result", title: "Board pack sent", note: "every number links to its source" },
    ],
    number: { count: 4, suffix: " days", note: "to close, from 9" },
    alone: "Reconciliation, variance notes, first draft of the pack",
    asks: "Anything that leaves the finance team. The CFO signs every pack.",
  },
  {
    id: "rev",
    sector: "B2B SaaS · revenue",
    name: "Inbound qualification",
    profile: "60-person SaaS, HubSpot",
    tags: ["B2B SaaS", "60 people", "HubSpot · Gmail · Clearbit · Calendar"],
    title:
      "Every inbound lead researched, scored and booked, and no strategic account ever gets an unapproved email.",
    story:
      "Five SDRs each had their own prompts. An auto-sequencer emailed a target account four times in a week. The CRM had three versions of the same company and nobody trusted the pipeline number.",
    captions: {
      before: ["Before:", "5 prompt sets, 1 sequencer, no owner rules"],
      after: ["With MachineSpeed:", "one prompt set, owner approval on named accounts"],
    },
    messNotes: ["no account ownership rules", "unlimited send", "duplicate CRM writes", "pipeline nobody trusts"],
    flowLabel: "Inbound qualification workflow with MachineSpeed",
    flow: [
      { kind: "trigger", label: "Trigger", title: "Inbound lead or buying signal", note: "form, CRM, intent data" },
      { kind: "agent", label: "Agent", title: "Research and score against ICP", note: "one shared prompt set" },
      { kind: "guard", label: "Guardrail", title: "Named or strategic account?", note: "no auto-send · 1 touch / 14 days" },
      { kind: "human", label: "Person", title: "Account owner approves first message", note: "one tap" },
      { kind: "out", label: "Result", title: "Meeting booked, brief attached", note: "CRM de-duped and written once" },
    ],
    number: { count: 3, suffix: "×", note: "qualified meetings per SDR" },
    alone: "Research, scoring, CRM hygiene, scheduling for unowned accounts",
    asks: "Any first message to a named or strategic account. Owner decides, once.",
  },
];

export const FOUNDATION = [
  {
    icon: "scope",
    label: "Access",
    title: "It gets its own key, not the master.",
    body: "Which systems, which records, read or write. Anything outside that is blocked and logged, not quietly allowed. Your security lead reviews the scope once and can read it back any time.",
  },
  {
    icon: "gate",
    label: "Approvals",
    title: "Money and customers stop at a person.",
    body: "You decide where it acts alone and where it waits. The request lands on the right phone with enough context to decide in twenty seconds, and the decision is on record.",
  },
  {
    icon: "log",
    label: "Record",
    title: "Every run can be replayed.",
    body: "What it saw, what it decided, what it changed. When a customer, an auditor or the board asks what the AI did, you show them instead of guessing.",
  },
  {
    icon: "swap",
    label: "Composability",
    title: "Swap the model, keep the workflow.",
    body: "Built from parts. A better model ships, or you change CRM, and one part changes while the rest keeps running. You're never locked to this year's vendor.",
  },
] as const;

export const TIMELINE = [
  {
    when: "Day 0 · 30 minutes",
    title: "The walkthrough",
    body: "You bring one workflow that hurts. We open a live workspace and show you how a similar blueprint runs with the controls on. You leave knowing whether it's worth doing.",
    get: "A clear yes or no, and if yes, a fixed price and a start date.",
  },
  {
    when: "Days 1–14",
    title: "The build",
    body: "Our engineers build that one workflow on your systems. Scopes set on day 2, shadow-run from day 10, live on day 14. If you already have a fragile version, it keeps running until the new one has proven itself.",
    get: "A workflow in production. Fixed scope, price and end date.",
  },
  {
    when: "Monthly",
    title: "Run, then expand",
    body: "We operate it, absorb model and tool changes, and report the one number you agreed. When it has proven itself, the next blueprint goes to the next team under the same rules.",
    get: "One agreed number, reported every month, and a shorter build each time.",
  },
];

export const PEOPLE = [
  { title: "One owner", body: "A named lead from the first call to every monthly report." },
  { title: "Forward-deployed", body: "Engineers work in your tools and your team's channels." },
  { title: "Operated for you", body: "We handle upkeep, model changes and failures." },
];

// TODO: confirm each certification / framework claim before publishing.
export const COMPLIANCE = [
  { name: "SOC 2", body: "Controls your security team can map straight onto their own checklist." },
  { name: "GDPR", body: "Data stays where you say. Retention and deletion are yours to set." },
  { name: "CCPA", body: "Customer data handled to California's rules, with a record to prove it." },
  { name: "EU AI Act", body: "Every automated decision recorded, explainable and reviewable by a person." },
];

export const MODELS = ["OpenAI", "Anthropic", "Google", "Meta", "Mistral", "xAI", "DeepSeek", "Qwen", "Open-weight"];

export const FAQ: [string, string][][] = [
  [
    ["We're just getting started with AI. Is this for us?", "Yes. You don't need an AI strategy, a data team or anything already built. Bring one workflow that eats time every week and we'll tell you on the call whether an agent is the right fix. If a spreadsheet or a simple automation would do the job, we'll say that instead."],
    ["We already have automations. Do you rip them out?", "No. We move one workflow at a time onto quirq and run the old version alongside until the new one has proven itself. Nothing stops while we work."],
    ["What do we need to prepare for the call?", "One workflow that hurts and someone who knows how it works today. No budgets, diagrams or data access."],
    ["How is a sprint priced?", "Fixed price, scope and end date, agreed before work starts. We only propose one when we can show value of 2–3× its cost."],
  ],
  [
    ["Where does our data go?", "Nowhere new. Agents run where your work already lives, in your current cloud account or on-prem, and reach your systems only with the permissions you grant. Your data stays where it is today, encrypted in transit and at rest, and you set how long anything is kept."],
    ["Which AI models do you use?", "Whichever you prefer. If your team already has a model provider or approved tools, we build on those. If you don't have a preference, our engineers recommend what fits each task, based on their experience and what is working for other businesses like yours. Changing your mind later doesn't mean rebuilding the workflow."],
    ["Is MachineSpeed a software product?", "No. MachineSpeed is an engineering service. quirq is the software underneath, and your team gets its controls and reporting as part of the engagement."],
  ],
];

export const AGENDA = [
  { when: "0–10 min", lead: "You show us.", body: "The workflow, the tools it touches, where it hurts." },
  { when: "10–25 min", lead: "We show you.", body: "A live workspace running the closest blueprint, controls on." },
  { when: "25–30 min", lead: "Straight answer.", body: "Worth building or not. If yes: price, scope, start date." },
];

/** The intake asks what kind of business this is; the placeholder follows the pick. */
export const PICKS = [
  { label: "SaaS founder", example: "e.g. I spend every Monday pulling pipeline, usage and churn numbers into one update for the team" },
  { label: "E-commerce / D2C", example: "e.g. Order exceptions and refunds eat two people's mornings, and our Shopify-to-NetSuite fix keeps breaking" },
  { label: "Support & tickets", example: "e.g. 300 tickets a day, half of them the same five questions, and triage is still done by hand" },
  { label: "IT & internal tools", example: "e.g. Access requests, onboarding checklists and on-call alerts all go through one overloaded engineer" },
  { label: "Finance & back office", example: "e.g. Month-end close takes nine days and the board pack is mostly copy-paste" },
  { label: "Agency & services", example: "e.g. Every client report is assembled by hand from five dashboards" },
  { label: "Logistics & ops", example: "e.g. Shipments that miss a carrier cutoff get noticed a day late" },
  { label: "Something else", example: "" },
];

export const SECTIONS = [
  { id: "foundation", label: "Foundation" },
  { id: "cases", label: "In practice" },
  { id: "engagement", label: "How it runs" },
  { id: "faq", label: "FAQ" },
];
