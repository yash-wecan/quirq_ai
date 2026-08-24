"use client";

import { useEffect, useRef } from "react";
import styles from "./space-canvas.module.css";

const DATA = {
  meta: {
    title: "Space",
    tagline: "a fictional showcase of projects by purpose",
    mappedOn: "1 January 2026",
    workspace: "/demo/acme-space",
    noun: "projects",
    collectionLabel: "environments",
    rootEdgeLabel: "an environment of this workspace",
    hubLabel: "Environment",
    enclose: true,
    tieSpring: { d: 80, k: 0.07 },
  },
  categories: {
    engineering: { name: "Engineering", color: "#6fb7e0" },
    ops: { name: "Ops", color: "#e8a15c" },
    documentation: { name: "Documentation", color: "#c792ea" },
    research: { name: "Research", color: "#7fd0a8" },
    marketing: { name: "Marketing", color: "#e0708a" },
  } as Record<string, { name: string; color: string }>,
  hubAngles: {
    engineering: -1.5707963267948966,
    ops: -0.3141592653589793,
    documentation: 0.9424777960769379,
    research: 2.199114857512855,
    marketing: 3.4557519189487724,
  } as Record<string, number>,
  timeline: { start: "2025-01-01", end: "2026-01-01" },
  root: {
    id: "environments-root",
    label: "Environments",
    blurb: "46 fictional projects across 5 environments",
  },
  hubs: [
    {
      id: "engineering",
      cat: "engineering",
      label: "Engineering",
      blurb:
        "15 projects · Apps, services, and libraries that are built and shipped.",
    },
    {
      id: "ops",
      cat: "ops",
      label: "Ops",
      blurb: "8 projects · Infrastructure-as-code and operational tooling.",
    },
    {
      id: "documentation",
      cat: "documentation",
      label: "Documentation",
      blurb: "8 projects · Docs sites, wikis, notes, and one-pagers.",
    },
    {
      id: "research",
      cat: "research",
      label: "Research",
      blurb: "8 projects · Papers, notebooks, studies, and exploratory work.",
    },
    {
      id: "marketing",
      cat: "marketing",
      label: "Marketing",
      blurb:
        "7 projects · Decks, brand assets, proposals, and outward-facing material.",
    },
  ],
  groups: [
    {
      id: "g_engineering",
      cat: "engineering",
      label: "engineering",
      blurb: "projects gathered into engineering",
    },
    {
      id: "g_ops",
      cat: "ops",
      label: "ops",
      blurb: "projects gathered into ops",
    },
    {
      id: "g_documentation",
      cat: "documentation",
      label: "documentation",
      blurb: "projects gathered into documentation",
    },
    {
      id: "g_research",
      cat: "research",
      label: "research",
      blurb: "projects gathered into research",
    },
    {
      id: "g_marketing",
      cat: "marketing",
      label: "marketing",
      blurb: "projects gathered into marketing",
    },
  ],
  leaves: [
    {
      id: "nova-api",
      group: "g_engineering",
      shape: "disc",
      tag: "API",
      label: "nova-api",
      date: "2025-01-01",
      blurb: "1 mapped file · Engineering",
      path: "nova-api",
      clusters: ["engineering"],
      xotype: "output",
    },
    {
      id: "atlas-mobile",
      group: "g_engineering",
      shape: "disc",
      tag: "App",
      label: "atlas-mobile",
      date: "2025-01-04",
      blurb: "1 mapped file · Engineering",
      path: "atlas-mobile",
      clusters: ["engineering"],
      xotype: "output",
    },
    {
      id: "beacon-sync",
      group: "g_engineering",
      shape: "disc",
      tag: "Service",
      label: "beacon-sync",
      date: "2025-02-07",
      blurb: "1 mapped file · Engineering",
      path: "beacon-sync",
      clusters: ["engineering"],
      xotype: "output",
    },
    {
      id: "halo-web",
      group: "g_engineering",
      shape: "disc",
      tag: "App",
      label: "halo-web",
      date: "2025-02-10",
      blurb: "1 mapped file · Engineering",
      path: "halo-web",
      clusters: ["engineering"],
      xotype: "output",
    },
    {
      id: "prism-core",
      group: "g_engineering",
      shape: "disc",
      tag: "Library",
      label: "prism-core",
      date: "2025-03-13",
      blurb: "1 mapped file · Engineering",
      path: "prism-core",
      clusters: ["engineering"],
      xotype: "output",
    },
    {
      id: "vortex-gateway",
      group: "g_engineering",
      shape: "disc",
      tag: "Service",
      label: "vortex-gateway",
      date: "2025-03-16",
      blurb: "1 mapped file · Engineering",
      path: "vortex-gateway",
      clusters: ["engineering"],
      xotype: "output",
    },
    {
      id: "kestrel-queue",
      group: "g_engineering",
      shape: "disc",
      tag: "Service",
      label: "kestrel-queue",
      date: "2025-04-19",
      blurb: "1 mapped file · Engineering",
      path: "kestrel-queue",
      clusters: ["engineering"],
      xotype: "output",
    },
    {
      id: "forge-cli",
      group: "g_engineering",
      shape: "disc",
      tag: "CLI",
      label: "forge-cli",
      date: "2025-04-22",
      blurb: "1 mapped file · Engineering",
      path: "forge-cli",
      clusters: ["engineering"],
      xotype: "output",
    },
    {
      id: "ember-sdk",
      group: "g_engineering",
      shape: "disc",
      tag: "SDK",
      label: "ember-sdk",
      date: "2025-05-25",
      blurb: "1 mapped file · Engineering",
      path: "ember-sdk",
      clusters: ["engineering"],
      xotype: "output",
    },
    {
      id: "quartz-payments",
      group: "g_engineering",
      shape: "disc",
      tag: "Service",
      label: "quartz-payments",
      date: "2025-05-01",
      blurb: "1 mapped file · Engineering",
      path: "quartz-payments",
      clusters: ["engineering"],
      xotype: "output",
    },
    {
      id: "ripple-etl",
      group: "g_engineering",
      shape: "disc",
      tag: "Pipeline",
      label: "ripple-etl",
      date: "2025-06-04",
      blurb: "1 mapped file · Engineering",
      path: "ripple-etl",
      clusters: ["engineering"],
      xotype: "output",
    },
    {
      id: "loom-realtime",
      group: "g_engineering",
      shape: "disc",
      tag: "Service",
      label: "loom-realtime",
      date: "2025-06-07",
      blurb: "1 mapped file · Engineering",
      path: "loom-realtime",
      clusters: ["engineering"],
      xotype: "output",
    },
    {
      id: "mosaic-webhooks",
      group: "g_engineering",
      shape: "disc",
      tag: "Service",
      label: "mosaic-webhooks",
      date: "2025-07-10",
      blurb: "1 mapped file · Engineering",
      path: "mosaic-webhooks",
      clusters: ["engineering"],
      xotype: "output",
    },
    {
      id: "summit-search",
      group: "g_engineering",
      shape: "disc",
      tag: "Service",
      label: "summit-search",
      date: "2025-07-13",
      blurb: "1 mapped file · Engineering",
      path: "summit-search",
      clusters: ["engineering"],
      xotype: "output",
    },
    {
      id: "thistle-render",
      group: "g_engineering",
      shape: "disc",
      tag: "App",
      label: "thistle-render",
      date: "2025-08-16",
      blurb: "1 mapped file · Engineering",
      path: "thistle-render",
      clusters: ["engineering"],
      xotype: "output",
    },
    {
      id: "kube-foundry",
      group: "g_ops",
      shape: "disc",
      tag: "IaC",
      label: "kube-foundry",
      date: "2025-03-06",
      blurb: "1 mapped file · Ops",
      path: "kube-foundry",
      clusters: ["ops"],
      xotype: "output",
    },
    {
      id: "terraform-cloud",
      group: "g_ops",
      shape: "disc",
      tag: "IaC",
      label: "terraform-cloud",
      date: "2025-03-09",
      blurb: "1 mapped file · Ops",
      path: "terraform-cloud",
      clusters: ["ops"],
      xotype: "output",
    },
    {
      id: "deploy-canary",
      group: "g_ops",
      shape: "disc",
      tag: "Tool",
      label: "deploy-canary",
      date: "2025-04-12",
      blurb: "1 mapped file · Ops",
      path: "deploy-canary",
      clusters: ["ops"],
      xotype: "output",
    },
    {
      id: "siren-monitor",
      group: "g_ops",
      shape: "disc",
      tag: "Tool",
      label: "siren-monitor",
      date: "2025-04-15",
      blurb: "1 mapped file · Ops",
      path: "siren-monitor",
      clusters: ["ops"],
      xotype: "output",
    },
    {
      id: "vault-rotate",
      group: "g_ops",
      shape: "disc",
      tag: "Tool",
      label: "vault-rotate",
      date: "2025-05-18",
      blurb: "1 mapped file · Ops",
      path: "vault-rotate",
      clusters: ["ops"],
      xotype: "output",
    },
    {
      id: "helm-charts",
      group: "g_ops",
      shape: "stack",
      tag: "Docs",
      label: "helm-charts",
      date: "2025-05-21",
      blurb: "1 mapped file · Ops",
      path: "helm-charts",
      clusters: ["ops"],
      xotype: "output",
    },
    {
      id: "drift-detector",
      group: "g_ops",
      shape: "disc",
      tag: "Tool",
      label: "drift-detector",
      date: "2025-06-24",
      blurb: "1 mapped file · Ops",
      path: "drift-detector",
      clusters: ["ops"],
      xotype: "output",
    },
    {
      id: "bastion-iam",
      group: "g_ops",
      shape: "disc",
      tag: "IaC",
      label: "bastion-iam",
      date: "2025-06-27",
      blurb: "1 mapped file · Ops",
      path: "bastion-iam",
      clusters: ["ops"],
      xotype: "output",
    },
    {
      id: "handbook",
      group: "g_documentation",
      shape: "stack",
      tag: "Docs",
      label: "handbook",
      date: "2025-05-11",
      blurb: "1 mapped file · Documentation",
      path: "handbook",
      clusters: ["documentation"],
      xotype: "output",
    },
    {
      id: "runbook-hub",
      group: "g_documentation",
      shape: "stack",
      tag: "Docs",
      label: "runbook-hub",
      date: "2025-05-14",
      blurb: "1 mapped file · Documentation",
      path: "runbook-hub",
      clusters: ["documentation"],
      xotype: "output",
    },
    {
      id: "api-reference",
      group: "g_documentation",
      shape: "stack",
      tag: "Docs",
      label: "api-reference",
      date: "2025-06-17",
      blurb: "1 mapped file · Documentation",
      path: "api-reference",
      clusters: ["documentation"],
      xotype: "output",
    },
    {
      id: "onboarding-guide",
      group: "g_documentation",
      shape: "stack",
      tag: "Docs",
      label: "onboarding-guide",
      date: "2025-06-20",
      blurb: "1 mapped file · Documentation",
      path: "onboarding-guide",
      clusters: ["documentation"],
      xotype: "output",
    },
    {
      id: "architecture-notes",
      group: "g_documentation",
      shape: "stack",
      tag: "Notes",
      label: "architecture-notes",
      date: "2025-07-23",
      blurb: "1 mapped file · Documentation",
      path: "architecture-notes",
      clusters: ["documentation"],
      xotype: "output",
    },
    {
      id: "faq-hub",
      group: "g_documentation",
      shape: "stack",
      tag: "Docs",
      label: "faq-hub",
      date: "2025-07-26",
      blurb: "1 mapped file · Documentation",
      path: "faq-hub",
      clusters: ["documentation"],
      xotype: "output",
    },
    {
      id: "style-guide",
      group: "g_documentation",
      shape: "stack",
      tag: "Docs",
      label: "style-guide",
      date: "2025-08-02",
      blurb: "1 mapped file · Documentation",
      path: "style-guide",
      clusters: ["documentation"],
      xotype: "output",
    },
    {
      id: "changelog",
      group: "g_documentation",
      shape: "stack",
      tag: "Docs",
      label: "changelog",
      date: "2025-08-05",
      blurb: "1 mapped file · Documentation",
      path: "changelog",
      clusters: ["documentation"],
      xotype: "output",
    },
    {
      id: "intent-model",
      group: "g_research",
      shape: "diamond",
      tag: "Model",
      label: "intent-model",
      date: "2025-07-16",
      blurb: "1 mapped file · Research",
      path: "intent-model",
      clusters: ["research"],
      xotype: "output",
    },
    {
      id: "embeddings-lab",
      group: "g_research",
      shape: "diamond",
      tag: "Lab",
      label: "embeddings-lab",
      date: "2025-07-19",
      blurb: "1 mapped file · Research",
      path: "embeddings-lab",
      clusters: ["research"],
      xotype: "output",
    },
    {
      id: "latency-study",
      group: "g_research",
      shape: "ring",
      tag: "Study",
      label: "latency-study",
      date: "2025-08-22",
      blurb: "1 mapped file · Research",
      path: "latency-study",
      clusters: ["research"],
      xotype: "output",
    },
    {
      id: "ab-experiment",
      group: "g_research",
      shape: "diamond",
      tag: "Exp",
      label: "ab-experiment",
      date: "2025-08-25",
      blurb: "1 mapped file · Research",
      path: "ab-experiment",
      clusters: ["research"],
      xotype: "output",
    },
    {
      id: "signal-analysis",
      group: "g_research",
      shape: "diamond",
      tag: "Notebook",
      label: "signal-analysis",
      date: "2025-09-01",
      blurb: "1 mapped file · Research",
      path: "signal-analysis",
      clusters: ["research"],
      xotype: "output",
    },
    {
      id: "ux-research",
      group: "g_research",
      shape: "ring",
      tag: "Study",
      label: "ux-research",
      date: "2025-09-04",
      blurb: "1 mapped file · Research",
      path: "ux-research",
      clusters: ["research"],
      xotype: "output",
    },
    {
      id: "anomaly-detection",
      group: "g_research",
      shape: "diamond",
      tag: "Model",
      label: "anomaly-detection",
      date: "2025-10-07",
      blurb: "1 mapped file · Research",
      path: "anomaly-detection",
      clusters: ["research"],
      xotype: "output",
    },
    {
      id: "benchmark-suite",
      group: "g_research",
      shape: "diamond",
      tag: "Suite",
      label: "benchmark-suite",
      date: "2025-10-10",
      blurb: "1 mapped file · Research",
      path: "benchmark-suite",
      clusters: ["research"],
      xotype: "output",
    },
    {
      id: "launch-deck",
      group: "g_marketing",
      shape: "slab",
      tag: "Slides",
      label: "launch-deck",
      date: "2025-09-21",
      blurb: "1 mapped file · Marketing",
      path: "launch-deck",
      clusters: ["marketing"],
      xotype: "output",
    },
    {
      id: "brand-assets",
      group: "g_marketing",
      shape: "stack",
      tag: "Assets",
      label: "brand-assets",
      date: "2025-09-24",
      blurb: "1 mapped file · Marketing",
      path: "brand-assets",
      clusters: ["marketing"],
      xotype: "output",
    },
    {
      id: "q3-campaign",
      group: "g_marketing",
      shape: "slab",
      tag: "Slides",
      label: "q3-campaign",
      date: "2025-10-27",
      blurb: "1 mapped file · Marketing",
      path: "q3-campaign",
      clusters: ["marketing"],
      xotype: "output",
    },
    {
      id: "social-calendar",
      group: "g_marketing",
      shape: "slab",
      tag: "Slides",
      label: "social-calendar",
      date: "2025-10-03",
      blurb: "1 mapped file · Marketing",
      path: "social-calendar",
      clusters: ["marketing"],
      xotype: "output",
    },
    {
      id: "press-kit",
      group: "g_marketing",
      shape: "ring",
      tag: "Kit",
      label: "press-kit",
      date: "2025-11-06",
      blurb: "1 mapped file · Marketing",
      path: "press-kit",
      clusters: ["marketing"],
      xotype: "output",
    },
    {
      id: "landing-page",
      group: "g_marketing",
      shape: "ring",
      tag: "Page",
      label: "landing-page",
      date: "2025-11-09",
      blurb: "1 mapped file · Marketing",
      path: "landing-page",
      clusters: ["marketing"],
      xotype: "output",
    },
    {
      id: "webinar-series",
      group: "g_marketing",
      shape: "slab",
      tag: "Slides",
      label: "webinar-series",
      date: "2025-12-12",
      blurb: "1 mapped file · Marketing",
      path: "webinar-series",
      clusters: ["marketing"],
      xotype: "output",
    },
  ],
  ties: [
    { s: "nova-api", t: "api-reference", label: "references" },
    { s: "latency-study", t: "ab-experiment", label: "informs" },
    { s: "launch-deck", t: "landing-page", label: "assets" },
    { s: "vault-rotate", t: "runbook-hub", label: "documented in" },
    { s: "intent-model", t: "signal-analysis", label: "feeds" },
    { s: "deploy-canary", t: "changelog", label: "releases" },
    { s: "atlas-mobile", t: "ux-research", label: "informed by" },
  ],
  milestones: [],
  gitHistory: {},
};

type NodeShape = "disc" | "ring" | "diamond" | "slab" | "stack";
type NodeType = "root" | "hub" | "group" | "leaf";

type NodeItem = {
  id: string;
  type: NodeType;
  cat?: string;
  group?: string;
  shape?: NodeShape;
  tag?: string;
  label: string;
  date?: string;
  blurb?: string;
  path?: string;
  clusters?: string[];
  xotype?: string;
  adj: { e: EdgeItem; other: string }[];
  degree: number;
  r: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx: number | null;
  fy: number | null;
  ax?: number;
  ay?: number;
};

type EdgeKind = "root" | "hg" | "rg" | "x";

type EdgeItem = {
  s: string;
  t: string;
  kind: EdgeKind;
  label: string;
};

const ACCENT = "#a8d94f";
const ACCENT_DEEP = "#83d63a";
const SERIF = `"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif`;
const SANS = `system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif`;
const MONO = `ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,monospace`;

const fmtDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const esc = (s: string) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const hexA = (h: string, a: number) =>
  `rgba(${parseInt(h.slice(1, 3), 16)},${parseInt(h.slice(3, 5), 16)},${parseInt(h.slice(5, 7), 16)},${a})`;

export function SpaceCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const crumbRef = useRef<HTMLDivElement>(null);
  const crumbNameRef = useRef<HTMLSpanElement>(null);
  const crumbDepthRef = useRef<HTMLSpanElement>(null);
  const crumbClearRef = useRef<HTMLButtonElement>(null);
  const hcRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const panelScrollRef = useRef<HTMLDivElement>(null);
  const panelCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const gcv = canvasRef.current;
    if (!container || !gcv) return;
    const gc = gcv.getContext("2d");
    if (!gc) return;

    const ctx = gc;
    const CAT = DATA.categories;
    const hubLabel = DATA.meta.hubLabel || "Environment";
    const NODES: NodeItem[] = [];

    NODES.push({
      id: DATA.root.id,
      type: "root",
      label: DATA.root.label,
      blurb: DATA.root.blurb,
      adj: [],
      degree: 0,
      r: 17,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      fx: 0,
      fy: 0,
    });

    DATA.hubs.forEach((h) =>
      NODES.push({
        id: h.id,
        type: "hub",
        cat: h.cat,
        label: h.label,
        blurb: h.blurb,
        adj: [],
        degree: 0,
        r: 13,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        fx: null,
        fy: null,
      })
    );

    DATA.groups.forEach((g) =>
      NODES.push({
        id: g.id,
        type: "group",
        cat: g.cat,
        label: g.label,
        blurb: g.blurb,
        adj: [],
        degree: 0,
        r: 5.5,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        fx: null,
        fy: null,
      })
    );

    DATA.leaves.forEach((l) =>
      NODES.push({
        id: l.id,
        type: "leaf",
        group: l.group,
        shape: l.shape as NodeShape,
        tag: l.tag,
        label: l.label,
        date: l.date,
        blurb: l.blurb,
        path: l.path,
        clusters: l.clusters || [],
        xotype: l.xotype,
        adj: [],
        degree: 0,
        r: 3.3,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        fx: null,
        fy: null,
      })
    );

    const EDGES: EdgeItem[] = [];
    DATA.hubs.forEach((h) =>
      EDGES.push({
        s: DATA.root.id,
        t: h.id,
        kind: "root",
        label: DATA.meta.rootEdgeLabel || "an environment of this workspace",
      })
    );
    DATA.groups.forEach((g) =>
      EDGES.push({ s: g.cat, t: g.id, kind: "hg", label: "part of" })
    );
    DATA.leaves.forEach((l) =>
      EDGES.push({ s: l.group, t: l.id, kind: "rg", label: "part of" })
    );
    DATA.ties.forEach((x) =>
      EDGES.push({ s: x.s, t: x.t, kind: "x", label: x.label })
    );

    const byId = new Map<string, NodeItem>(NODES.map((n) => [n.id, n]));
    NODES.forEach((n) => {
      if (n.type === "leaf" && n.group) {
        n.cat = byId.get(n.group)?.cat;
      }
    });

    EDGES.forEach((e) => {
      const sNode = byId.get(e.s);
      const tNode = byId.get(e.t);
      if (sNode && tNode) {
        sNode.adj.push({ e, other: e.t });
        tNode.adj.push({ e, other: e.s });
      }
    });

    NODES.forEach((n) => {
      n.degree = n.adj.length;
      if (n.type === "root") n.r = 17;
      else if (n.type === "hub") n.r = 13;
      else if (n.type === "group") n.r = 5.5 + Math.min(5, n.adj.length * 0.22);
      else n.r = 3.3 + Math.min(4.2, (n.degree - 1) * 0.85);
    });

    const LEAVES = NODES.filter((n) => n.type === "leaf");
    const GROUPS = NODES.filter((n) => n.type === "group");
    const HUBS = NODES.filter((n) => n.type === "hub");
    const noun = DATA.meta.noun || "projects";

    const colorOf = (n: NodeItem) =>
      n.type === "root"
        ? "#e9e4d9"
        : (n.cat && CAT[n.cat]?.color) || "#888888";

    const REDUCED =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const expanded = new Map<string, boolean>(
      GROUPS.map((g) => [g.id, true])
    );
    const isShown = (n: NodeItem) =>
      n.type === "leaf" && n.group ? expanded.get(n.group) ?? true : true;
    const shownNodes = () => NODES.filter(isShown);
    const shownEdges = () =>
      EDGES.filter((e) => {
        const sNode = byId.get(e.s);
        const tNode = byId.get(e.t);
        return sNode && tNode && isShown(sNode) && isShown(tNode);
      });

    const HUB_ANGLE = DATA.hubAngles;
    const HUB_R = 520;
    const root = byId.get(DATA.root.id)!;
    root.fx = 0;
    root.fy = 0;

    HUBS.forEach((h) => {
      const angle = (h.cat && HUB_ANGLE[h.cat]) || 0;
      h.ax = Math.cos(angle) * HUB_R;
      h.ay = Math.sin(angle) * HUB_R;
      h.x = h.ax;
      h.y = h.ay;
    });

    const SECTOR =
      (Math.PI * 2) / Math.max(1, Object.keys(HUB_ANGLE).length);
    GROUPS.forEach((g) => {
      const sib = GROUPS.filter((x) => x.cat === g.cat);
      const k = sib.indexOf(g);
      const m = sib.length;
      const step = Math.min(0.5, (SECTOR * 0.85) / Math.max(1, m));
      const angle = ((g.cat && HUB_ANGLE[g.cat]) || 0) + (k - (m - 1) / 2) * step;
      const r = HUB_R + 170 + (k % 3) * 70;
      g.x = Math.cos(angle) * r;
      g.y = Math.sin(angle) * r;
    });

    LEAVES.forEach((l, i) => {
      const g = l.group ? byId.get(l.group) : null;
      if (g) {
        const a = (i * 0.618033 * Math.PI * 2) % (Math.PI * 2);
        l.x = g.x + Math.cos(a) * (30 + (i % 5) * 11);
        l.y = g.y + Math.sin(a) * (30 + (i % 5) * 11);
      }
    });

    /* ================= SIMULATION ================= */
    let simAlpha = 1;
    const rootId = DATA.root.id;
    const rootDepths: Map<string, number> | null = null;
    const SPR: Record<EdgeKind, { d: number; k: number }> = {
      root: { d: HUB_R, k: 0.02 },
      hg: { d: 175, k: 0.05 },
      rg: { d: 62, k: 0.08 },
      x: DATA.meta.tieSpring || { d: 210, k: 0.005 },
    };
    const CHG: Record<NodeType, number> = {
      root: -3400,
      hub: -2600,
      group: -1000,
      leaf: -235,
    };

    function simTick() {
      const vs = shownNodes();
      const es = shownEdges();
      for (let i = 0; i < vs.length; i++) {
        const a = vs[i];
        const qa = CHG[a.type] || CHG.leaf;
        for (let j = i + 1; j < vs.length; j++) {
          const b = vs[j];
          let dx = b.x - a.x;
          let dy = b.y - a.y;
          let d2 = dx * dx + dy * dy;
          if (d2 < 1) {
            dx = Math.random() - 0.5;
            dy = Math.random() - 0.5;
            d2 = 1;
          }
          if (d2 > 320 * 320) continue;
          const d = Math.sqrt(d2);
          const qb = CHG[b.type] || CHG.leaf;
          let f = (Math.min(qa, qb) / d2) * simAlpha;
          const rr = a.r + b.r + 7;
          if (d < rr) f -= (rr - d) * 0.3;
          const fx = (dx / d) * f;
          const fy = (dy / d) * f;
          if (a.fx == null) {
            a.vx += fx;
            a.vy += fy;
          }
          if (b.fx == null) {
            b.vx -= fx;
            b.vy -= fy;
          }
        }
      }
      for (const e of es) {
        const a = byId.get(e.s);
        const b = byId.get(e.t);
        if (!a || !b) continue;
        const sp = SPR[e.kind];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.max(1, Math.hypot(dx, dy));
        const f = (d - sp.d) * sp.k * simAlpha;
        const fx = (dx / d) * f;
        const fy = (dy / d) * f;
        if (a.fx == null) {
          a.vx += fx;
          a.vy += fy;
        }
        if (b.fx == null) {
          b.vx -= fx;
          b.vy -= fy;
        }
      }
      const R0 = byId.get(rootId)!;
      for (const n of vs) {
        if (rootId === DATA.root.id && n.type === "hub" && n.ax != null && n.ay != null) {
          n.vx += (n.ax - n.x) * 0.05 * simAlpha;
          n.vy += (n.ay - n.y) * 0.05 * simAlpha;
        } else if (rootDepths && n.id !== rootId && n.fx == null) {
          const d = rootDepths.get(n.id) ?? 6;
          let dx = n.x - R0.x;
          let dy = n.y - R0.y;
          let dist = Math.hypot(dx, dy);
          if (dist < 1) {
            dx = Math.random() - 0.5;
            dy = Math.random() - 0.5;
            dist = 1;
          }
          const f = (d * 110 - dist) * 0.045 * simAlpha;
          n.vx += (dx / dist) * f;
          n.vy += (dy / dist) * f;
        } else if (n.fx == null) {
          n.vx -= (n.x - R0.x) * 0.001 * simAlpha;
          n.vy -= (n.y - R0.y) * 0.001 * simAlpha;
        }
        if (n.fx != null) {
          n.x = n.fx;
          n.y = n.fy!;
          n.vx = 0;
          n.vy = 0;
          continue;
        }
        n.vx *= 0.7;
        n.vy *= 0.7;
        const _sp = Math.hypot(n.vx, n.vy);
        if (_sp > 60) {
          n.vx *= 60 / _sp;
          n.vy *= 60 / _sp;
        }
        n.x += n.vx;
        n.y += n.vy;
      }
      if (simAlpha > 0.003) simAlpha *= 0.9885;
      else simAlpha = 0;
    }

    const reheat = (a: number) => {
      simAlpha = Math.max(simAlpha, a);
    };

    /* ================= CAMERA ================= */
    const cam = { x: 0, y: 0, k: 0.7 };
    let camAnim: {
      t0: number;
      ms: number;
      from: { x: number; y: number; k: number };
      to: { x: number; y: number; k: number };
    } | null = null;

    const easeCubicInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    function flyTo(x: number, y: number, k: number, ms = 820) {
      if (REDUCED) ms = 1;
      camAnim = { t0: performance.now(), ms, from: { ...cam }, to: { x, y, k } };
    }

    function stepCam(now: number) {
      if (!camAnim) return;
      const t = Math.min(1, (now - camAnim.t0) / camAnim.ms);
      const e = easeCubicInOut(t);
      cam.x = camAnim.from.x + (camAnim.to.x - camAnim.from.x) * e;
      cam.y = camAnim.from.y + (camAnim.to.y - camAnim.from.y) * e;
      cam.k = camAnim.from.k + (camAnim.to.k - camAnim.from.k) * e;
      if (t >= 1) camAnim = null;
    }

    /* ================= GRAPH RENDER ================= */
    let GW = 0;
    let GH = 0;
    let dpr = 1;
    let hoverId: string | null = null;
    let selId: string | null = null;
    let focusSet: Set<string> | null = null;
    let focusDepth = 0;
    let pulseN: { id: string; t0: number } | null = null;

    function neighborhood(id: string, depth: number) {
      const set = new Set([id]);
      let frontier = [id];
      for (let d = 0; d < depth; d++) {
        const next: string[] = [];
        for (const u of frontier) {
          const uNode = byId.get(u);
          if (!uNode) continue;
          for (const { other } of uNode.adj) {
            const oNode = byId.get(other);
            if (oNode && !set.has(other) && isShown(oNode)) {
              set.add(other);
              next.push(other);
            }
          }
        }
        frontier = next;
      }
      return set;
    }

    function drawShape(
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      shape?: NodeShape
    ) {
      c.beginPath();
      if (shape === "diamond") {
        const s = r * 1.25;
        c.moveTo(x, y - s);
        c.lineTo(x + s, y);
        c.lineTo(x, y + s);
        c.lineTo(x - s, y);
        c.closePath();
      } else if (shape === "slab") {
        const w = r * 1.55;
        const h = r * 0.95;
        c.rect(x - w, y - h, w * 2, h * 2);
      } else if (shape === "stack") {
        const s = r * 0.92;
        const o = r * 0.38;
        c.rect(x - s - o, y - s + o, s * 2, s * 2);
        c.rect(x - s + o, y - s - o, s * 2, s * 2);
      } else {
        c.arc(x, y, r, 0, Math.PI * 2);
      }
    }

    function convexHull(points: [number, number][]) {
      const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
      if (pts.length <= 1) return pts;
      const cross = (
        o: [number, number],
        a: [number, number],
        b: [number, number]
      ) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
      const lower: [number, number][] = [];
      for (const point of pts) {
        while (
          lower.length >= 2 &&
          cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0
        ) {
          lower.pop();
        }
        lower.push(point);
      }
      const upper: [number, number][] = [];
      for (let i = pts.length - 1; i >= 0; i--) {
        const point = pts[i];
        while (
          upper.length >= 2 &&
          cross(upper[upper.length - 2], upper[upper.length - 1], point) <= 0
        ) {
          upper.pop();
        }
        upper.push(point);
      }
      lower.pop();
      upper.pop();
      return lower.concat(upper);
    }

    function drawEnclosures(k: number) {
      const PAD = 42;
      for (const group of GROUPS) {
        const points: [number, number][] = [[group.x, group.y]];
        for (const leaf of LEAVES) {
          if (isShown(leaf) && leaf.group === group.id) {
            points.push([leaf.x, leaf.y]);
          }
        }
        if (points.length < 2) continue;
        const col = (group.cat && CAT[group.cat]?.color) || "#888888";
        const cx = points.reduce((sum, p) => sum + p[0], 0) / points.length;
        const cy = points.reduce((sum, p) => sum + p[1], 0) / points.length;
        ctx.beginPath();
        if (points.length === 2) {
          const radius =
            Math.hypot(points[1][0] - points[0][0], points[1][1] - points[0][1]) /
              2 +
            PAD;
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        } else {
          const hull = convexHull(points).map((point) => {
            const dx = point[0] - cx;
            const dy = point[1] - cy;
            const distance = Math.hypot(dx, dy) || 1;
            return [
              point[0] + (dx / distance) * PAD,
              point[1] + (dy / distance) * PAD,
            ] as [number, number];
          });
          const first = hull[0];
          const last = hull[hull.length - 1];
          ctx.moveTo((last[0] + first[0]) / 2, (last[1] + first[1]) / 2);
          for (let i = 0; i < hull.length; i++) {
            const point = hull[i];
            const next = hull[(i + 1) % hull.length];
            ctx.quadraticCurveTo(
              point[0],
              point[1],
              (point[0] + next[0]) / 2,
              (point[1] + next[1]) / 2
            );
          }
          ctx.closePath();
        }
        ctx.fillStyle = hexA(col, 0.055);
        ctx.fill();
        ctx.setLineDash([5 / k, 4 / k]);
        ctx.strokeStyle = hexA(col, 0.32);
        ctx.lineWidth = 1.2 / Math.sqrt(k);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    function halo(
      s: string,
      x: number,
      y: number,
      fill: string,
      tracking?: number
    ) {
      if (tracking) {
        ctx.save();
        ctx.letterSpacing = tracking * 10 + "px";
      }
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "rgba(11,12,15,.88)";
      ctx.lineJoin = "round";
      ctx.strokeText(s, x, y);
      ctx.fillStyle = fill;
      ctx.fillText(s, x, y);
      if (tracking) ctx.restore();
    }

    function drawGraph(now: number) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, GW, GH);
      let grd = ctx.createRadialGradient(
        GW * 0.74,
        GH * 0.32,
        0,
        GW * 0.74,
        GH * 0.32,
        GW * 0.5
      );
      grd.addColorStop(0, "rgba(168,217,79,.05)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, GW, GH);

      grd = ctx.createRadialGradient(
        GW * 0.2,
        GH * 0.8,
        0,
        GW * 0.2,
        GH * 0.8,
        GW * 0.45
      );
      grd.addColorStop(0, "rgba(111,147,173,.04)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, GW, GH);

      stepCam(now);
      const k = cam.k;
      ctx.setTransform(
        dpr * k,
        0,
        0,
        dpr * k,
        dpr * (GW / 2 - cam.x * k),
        dpr * (GH / 2 - cam.y * k)
      );

      const es = shownEdges();
      const vs = shownNodes();
      const inFocus = (id: string) => !focusSet || focusSet.has(id);

      if (DATA.meta.enclose) drawEnclosures(k);

      for (const e of es) {
        const a = byId.get(e.s);
        const b = byId.get(e.t);
        if (!a || !b) continue;
        let alpha: number;
        let width: number;
        let color: string;
        if (focusSet) {
          const lit =
            (e.s === selId || e.t === selId) && inFocus(e.s) && inFocus(e.t);
          const semi = inFocus(e.s) && inFocus(e.t);
          if (lit) {
            alpha = 0.42;
            width = 1.4 / k;
            color = ACCENT;
          } else if (semi) {
            alpha = 0.14;
            width = 0.8 / k;
            color = "#cfc9bb";
          } else {
            alpha = 0.012;
            width = 0.7 / k;
            color = "#78746c";
          }
        } else {
          alpha = e.kind === "x" ? 0.1 : e.kind === "root" ? 0.07 : 0.05;
          width = (e.kind === "x" ? 0.9 : 0.7) / k;
          color = e.kind === "x" ? "#cfc9bb" : "#b4afa4";
        }
        ctx.beginPath();
        if (e.kind === "x") {
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 1;
          ctx.moveTo(a.x, a.y);
          ctx.quadraticCurveTo(
            (a.x + b.x) / 2 - ((dy / d) * d * 0.13),
            (a.y + b.y) / 2 + ((dx / d) * d * 0.13),
            b.x,
            b.y
          );
        } else {
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
        }
        ctx.strokeStyle = hexA(color, alpha);
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      for (const n of vs) {
        const col = colorOf(n);
        let a = 1;
        if (focusSet) a = focusSet.has(n.id) ? 1 : 0.14;
        ctx.globalAlpha = a;

        if (n.type === "root") {
          ctx.lineWidth = 2.4 / Math.sqrt(k);
          ctx.lineJoin = "miter";
          ctx.lineCap = "butt";
          const sc = 0.075;
          const CHEV: [string, [number, number][]][] = [
            [
              "#e9e4d9",
              [
                [37, 166],
                [118, 247],
                [31, 335],
              ],
            ],
            [
              "#e9e4d9",
              [
                [245, 166],
                [163, 247],
                [251, 335],
              ],
            ],
            [
              ACCENT_DEEP,
              [
                [328, 165],
                [247, 247],
                [334, 334],
              ],
            ],
            [
              ACCENT_DEEP,
              [
                [381, 165],
                [462, 247],
                [375, 334],
              ],
            ],
          ];
          for (const [chevCol, pts] of CHEV) {
            ctx.strokeStyle = chevCol;
            ctx.beginPath();
            pts.forEach(([px, py], i) => {
              const wx = n.x + (px - 246.5) * sc;
              const wy = n.y + (py - 250) * sc;
              if (i) ctx.lineTo(wx, wy);
              else ctx.moveTo(wx, wy);
            });
            ctx.stroke();
          }
        } else if (n.type === "hub") {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = hexA(col, 0.13);
          ctx.fill();
          ctx.strokeStyle = hexA(col, 0.9);
          ctx.lineWidth = 1.4 / Math.sqrt(k);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(n.x, n.y, 2.6, 0, Math.PI * 2);
          ctx.fillStyle = col;
          ctx.fill();
        } else if (n.type === "group") {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = hexA(col, 0.22);
          ctx.fill();
          ctx.strokeStyle = hexA(col, 0.8);
          ctx.lineWidth = 1.1 / Math.sqrt(k);
          ctx.stroke();
          if (!expanded.get(n.id)) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r + 3.2, 0, Math.PI * 2);
            ctx.setLineDash([2.4 / k, 3.2 / k]);
            ctx.strokeStyle = hexA(col, 0.4);
            ctx.lineWidth = 0.9 / Math.sqrt(k);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        } else {
          const hl = n.id === hoverId || n.id === selId;
          const r = n.r * (hl ? 1.5 : 1);
          drawShape(ctx, n.x, n.y, r, n.shape);
          if (n.shape === "ring") {
            ctx.strokeStyle = col;
            ctx.lineWidth = 1.5 / Math.sqrt(k);
            ctx.stroke();
          } else {
            ctx.fillStyle = col;
            ctx.fill();
          }
          if (n.id === selId) {
            drawShape(ctx, n.x, n.y, r + 3.4 / Math.sqrt(k), n.shape);
            ctx.strokeStyle = hexA(ACCENT, 0.8);
            ctx.lineWidth = 1.4 / Math.sqrt(k);
            ctx.stroke();
          } else if (hl) {
            drawShape(ctx, n.x, n.y, r + 3 / Math.sqrt(k), n.shape);
            ctx.strokeStyle = "rgba(233,228,217,.9)";
            ctx.lineWidth = 1.2 / Math.sqrt(k);
            ctx.stroke();
          }
        }
        if (n.id === rootId && n.type !== "root") {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 7 / Math.sqrt(k), 0, Math.PI * 2);
          ctx.strokeStyle = hexA(ACCENT, 0.65);
          ctx.lineWidth = 1.4 / Math.sqrt(k);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 11 / Math.sqrt(k), 0, Math.PI * 2);
          ctx.strokeStyle = hexA(ACCENT, 0.2);
          ctx.lineWidth = 1 / Math.sqrt(k);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.textAlign = "center";
      for (const n of vs) {
        let a = 1;
        if (focusSet) a = focusSet.has(n.id) ? 1 : 0;
        if (a === 0) continue;
        const sx = (n.x - cam.x) * k + GW / 2;
        const sy = (n.y - cam.y) * k + GH / 2;
        if (sx < -100 || sx > GW + 100 || sy < -50 || sy > GH + 50) continue;

        if (n.type === "hub") {
          ctx.font = "500 17px " + SERIF;
          halo(n.label, sx, sy - n.r * k - 12, `rgba(233,228,217,${0.94 * a})`);
          ctx.font = "400 8.5px " + MONO;
          const hubCount = LEAVES.filter((l) => l.cat === n.cat).length;
          const hubNoun = hubCount === 1 ? noun.replace(/s$/, "") : noun;
          halo(
            `${hubCount} ${hubNoun.toUpperCase()}`,
            sx,
            sy + n.r * k + 16,
            `rgba(125,120,109,${a})`,
            0.14
          );
        } else if (n.type === "group") {
          const on =
            n.id === hoverId ||
            n.id === selId ||
            (focusSet && focusSet.has(n.id));
          if (!(on || k > 0.8)) continue;
          const closed = !expanded.get(n.id);
          ctx.font = "400 9px " + MONO;
          const t =
            n.label.toUpperCase() +
            (closed ? ` +${LEAVES.filter((l) => l.cat === n.cat).length}` : "");
          halo(t, sx, sy - n.r * k - 7, `rgba(179,173,160,${0.72 * a})`, 0.1);
        } else if (n.type === "leaf") {
          const on =
            n.id === hoverId ||
            n.id === selId ||
            n.id === rootId ||
            (focusSet && focusSet.has(n.id));
          if (!(on || k > 1.55 || (k > 1.05 && n.degree >= 4))) continue;
          ctx.font = "400 11px " + SANS;
          halo(
            n.label,
            sx,
            sy - n.r * k - 7,
            on ? `rgba(233,228,217,${0.94 * a})` : `rgba(179,173,160,${0.62 * a})`
          );
        }
      }
      ctx.globalAlpha = 1;

      if (pulseN) {
        const t = (now - pulseN.t0) / 1100;
        if (t > 1) pulseN = null;
        else {
          const n = byId.get(pulseN.id);
          if (n) {
            const sx = (n.x - cam.x) * k + GW / 2;
            const sy = (n.y - cam.y) * k + GH / 2;
            ctx.beginPath();
            ctx.arc(sx, sy, n.r * k + t * 44, 0, Math.PI * 2);
            ctx.strokeStyle = hexA(ACCENT, 0.7 * (1 - t));
            ctx.lineWidth = 1.8;
            ctx.stroke();
          }
        }
      }
    }

    /* ================= INTERACTION ================= */
    let drag: NodeItem | null = null;
    let pan = false;
    let downX = 0;
    let downY = 0;
    let moved = false;
    let lastX = 0;
    let lastY = 0;

    const toWorld = (mx: number, my: number) => ({
      x: (mx - GW / 2) / cam.k + cam.x,
      y: (my - GH / 2) / cam.k + cam.y,
    });

    const evXY = (e: PointerEvent | MouseEvent | WheelEvent) => {
      const r = gcv.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top] as const;
    };

    function pick(mx: number, my: number) {
      const w = toWorld(mx, my);
      let best: NodeItem | null = null;
      let bd = 1e9;
      for (const n of shownNodes()) {
        const d = Math.hypot(n.x - w.x, n.y - w.y);
        const hit = Math.max(n.r + 4 / cam.k, 12 / cam.k);
        if (d < hit && d < bd) {
          bd = d;
          best = n;
        }
      }
      return best;
    }

    const onPointerDown = (e: PointerEvent) => {
      gcv.setPointerCapture(e.pointerId);
      downX = lastX = e.clientX;
      downY = lastY = e.clientY;
      moved = false;
      const [mx, my] = evXY(e);
      const n = pick(mx, my);
      if (n && n.type !== "root") {
        drag = n;
        n.fx = n.x;
        n.fy = n.y;
      } else {
        pan = true;
      }
      camAnim = null;
    };

    const onPointerMove = (e: PointerEvent) => {
      const [mx, my] = evXY(e);
      if (drag) {
        if (Math.hypot(e.clientX - downX, e.clientY - downY) > 4) moved = true;
        const w = toWorld(mx, my);
        drag.fx = w.x;
        drag.fy = w.y;
        reheat(0.3);
        hideHC();
      } else if (pan) {
        if (Math.hypot(e.clientX - downX, e.clientY - downY) > 4) moved = true;
        cam.x -= (e.clientX - lastX) / cam.k;
        cam.y -= (e.clientY - lastY) / cam.k;
        lastX = e.clientX;
        lastY = e.clientY;
        hideHC();
      } else {
        const n = pick(mx, my);
        hoverId = n ? n.id : null;
        gcv.style.cursor = n ? "pointer" : "default";
        if (n) showHC(n, mx, my);
        else hideHC();
      }
    };

    let lastUp = 0;
    let clickT: ReturnType<typeof setTimeout> | null = null;

    const onPointerUp = (e: PointerEvent) => {
      if (drag) {
        const d = drag;
        drag = null;
        if (d.type !== "root" && d.id !== rootId) {
          d.fx = null;
          d.fy = null;
        }
      }
      pan = false;
      if (moved) return;
      const [mx, my] = evXY(e);
      const n = pick(mx, my);
      const now = performance.now();
      if (now - lastUp < 300) {
        if (clickT) {
          clearTimeout(clickT);
          clickT = null;
        }
        lastUp = 0;
        onDbl(n);
        return;
      }
      lastUp = now;
      clickT = setTimeout(() => {
        clickT = null;
        onClick(n);
      }, 260);
    };

    function onClick(n: NodeItem | null) {
      if (!n) {
        clearFocus();
        return;
      }
      select(n.id, 1);
    }

    function onDbl(n: NodeItem | null) {
      if (!n) return;
      if (n.type === "group") {
        toggleGroup(n);
        return;
      }
      if (n.type === "hub") {
        const gs = GROUPS.filter((g) => g.cat === n.cat);
        const anyClosed = gs.some((g) => !expanded.get(g.id));
        gs.forEach((g) => setExp(g, anyClosed));
        reheat(0.5);
        return;
      }
      select(n.id, 2);
    }

    const PANEL_W = 352;
    function select(id: string, depth: number, fly = true) {
      selId = id;
      focusDepth = depth;
      focusSet = neighborhood(id, depth);
      const n = byId.get(id);
      if (!n) return;

      if (crumbNameRef.current) crumbNameRef.current.textContent = n.label;
      if (crumbDepthRef.current)
        crumbDepthRef.current.textContent = `${depth} hop${depth > 1 ? "s" : ""} · ${focusSet.size} nodes`;
      if (crumbRef.current) crumbRef.current.classList.add(styles.crumbIsOn);

      openPanel(n);
      if (fly) {
        const kT = Math.max(cam.k, 1.6);
        const off = GW > 760 ? PANEL_W / 2 / kT : 0;
        flyTo(n.x + off, n.y, kT);
      }
    }

    function clearFocus() {
      selId = null;
      focusSet = null;
      focusDepth = 0;
      if (crumbRef.current) crumbRef.current.classList.remove(styles.crumbIsOn);
      closePanel();
    }

    function setExp(g: NodeItem, v: boolean) {
      if (expanded.get(g.id) === v) return;
      expanded.set(g.id, v);
      if (v) {
        const kids = LEAVES.filter((l) => l.group === g.id);
        kids.forEach((l, i) => {
          const a = (i / kids.length) * Math.PI * 2;
          l.x = g.x + Math.cos(a) * (18 + (i % 4) * 9);
          l.y = g.y + Math.sin(a) * (18 + (i % 4) * 9);
          l.vx = 0;
          l.vy = 0;
        });
      }
    }

    function toggleGroup(g: NodeItem) {
      setExp(g, !expanded.get(g.id));
      reheat(0.5);
      if (selId) {
        const selNode = byId.get(selId);
        if (selNode && !isShown(selNode)) clearFocus();
      }
      if (focusSet && selId) focusSet = neighborhood(selId, focusDepth);
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camAnim = null;
      const f = Math.exp(-e.deltaY * 0.0016);
      const nk = Math.max(0.22, Math.min(5, cam.k * f));
      const [mx, my] = evXY(e);
      const w = toWorld(mx, my);
      cam.x = w.x - (mx - GW / 2) / nk;
      cam.y = w.y - (my - GH / 2) / nk;
      cam.k = nk;
    };

    /* ================= HOVER CARD ================= */
    const hc = hcRef.current;
    function showHC(n: NodeItem, mx: number, my: number) {
      if (!hc) return;
      const col =
        n.type === "root"
          ? ACCENT_DEEP
          : (n.cat && CAT[n.cat]?.color) || "#888888";
      const kick =
        n.type === "hub"
          ? hubLabel
          : n.type === "group"
          ? "Cluster"
          : n.type === "root"
          ? "The center"
          : `${(n.cat && CAT[n.cat]?.name) || ""} · ${n.tag || ""}`;
      const art = `linear-gradient(155deg, ${hexA(col, 0.24)}, ${hexA(col, 0.03)} 68%)`;
      let rows = "";
      if (n.type === "leaf") {
        const groupLabel = n.group ? byId.get(n.group)?.label || "" : "";
        rows = `<dl class="${styles.hcDl}">
          ${n.date ? `<dt class="${styles.hcDt}">Born</dt><dd class="${styles.hcDd}">${fmtDate(n.date)}</dd>` : ""}
          <dt class="${styles.hcDt}">Where</dt><dd class="${styles.hcDdMono}">${esc(n.path || "")}</dd>
          <dt class="${styles.hcDt}">Ties</dt><dd class="${styles.hcDd}">${n.degree - 1} connection${n.degree - 1 === 1 ? "" : "s"} · ${esc(groupLabel)}</dd>
        </dl>`;
      } else if (n.type === "group") {
        const kids = LEAVES.filter((l) => l.cat === n.cat);
        rows = `<dl class="${styles.hcDl}"><dt class="${styles.hcDt}">Holds</dt><dd class="${styles.hcDd}">${kids.length} ${noun}</dd></dl>`;
      } else {
        const kids = n.type === "hub" ? LEAVES.filter((l) => l.cat === n.cat) : LEAVES;
        rows = `<dl class="${styles.hcDl}"><dt class="${styles.hcDt}">Holds</dt><dd class="${styles.hcDd}">${kids.length} ${noun}</dd></dl>`;
      }
      hc.innerHTML = `
        <div class="${styles.hcArt}" style="background:${art}">
          <div class="${styles.hcKicker}">${esc(kick)}</div>
          <h5 class="${styles.hcTitle}">${esc(n.label)}</h5>
          ${n.type === "leaf" ? "" : `<div class="${styles.hcSub}">${esc((n.blurb || "").split(". ")[0])}</div>`}
        </div>
        ${rows}
        <div class="${styles.hcFoot}">${n.type === "group" ? "Click to focus · Double-click to open or close" : "Click to focus · Double-click to expand"}</div>`;
      placeHC(mx, my);
    }

    function placeHC(mx: number, my: number) {
      if (!hc) return;
      hc.classList.add(styles.hcIsOn);
      const r = hc.getBoundingClientRect();
      let x = mx + 18;
      let y = my + 18;
      if (x + r.width > GW - 8) x = mx - r.width - 18;
      if (y + r.height > GH - 8) y = my - r.height - 18;
      hc.style.left = Math.max(8, x) + "px";
      hc.style.top = Math.max(8, y) + "px";
    }

    function hideHC() {
      if (hc) hc.classList.remove(styles.hcIsOn);
      hoverId = null;
    }

    /* ================= DETAIL PANEL ================= */
    const panel = panelRef.current;
    function openPanel(n: NodeItem) {
      if (!panel || !panelScrollRef.current) return;
      const col =
        n.type === "root"
          ? ACCENT_DEEP
          : (n.cat && CAT[n.cat]?.color) || "#888888";
      const kick =
        n.type === "hub"
          ? `${hubLabel} · ${LEAVES.filter((l) => l.cat === n.cat).length} ${noun}`
          : n.type === "group"
          ? `${(n.cat && CAT[n.cat]?.name) || ""} · environment`
          : n.type === "root"
          ? "The center"
          : `${(n.cat && CAT[n.cat]?.name) || ""} · ${n.tag || ""}`;

      const conns = n.adj
        .filter(({ other }) => byId.get(other)?.type !== "root" || n.type === "hub")
        .sort((p, q) => (p.e.kind === "x" ? 0 : 1) - (q.e.kind === "x" ? 0 : 1))
        .slice(0, 24)
        .map(({ e, other }) => {
          const o = byId.get(other);
          if (!o) return "";
          let rel: string;
          if (e.kind === "x") rel = (e.s === n.id ? "" : "← ") + e.label;
          else
            rel =
              o.type === "group" || o.type === "hub" || o.type === "root"
                ? "part of"
                : "holds";
          const cdotCol =
            o.type === "root"
              ? ACCENT_DEEP
              : (o.cat && CAT[o.cat]?.color) || "#e9e4d9";
          return `<button class="${styles.conn}" data-id="${o.id}">
            <span class="${styles.connCdot}" style="background:${cdotCol}"></span>
            <span>${esc(o.label)}</span>
            <span class="${styles.connRel}">${esc(rel)}</span>
            <span class="${styles.connYr}">${o.date ? o.date.slice(0, 7) : ""}</span>
          </button>`;
        })
        .join("");

      panelScrollRef.current.innerHTML = `
        <div class="${styles.poster}" style="background:radial-gradient(120% 100% at 20% 0%, ${hexA(col, 0.2)}, transparent 62%)">
          <div class="${styles.posterKicker}">${esc(kick)}</div>
          <h3 class="${styles.posterTitle}">${esc(n.label)}</h3>
          ${n.date ? `<div class="${styles.posterSub}">${fmtDate(n.date)}</div>` : ""}
          ${n.path ? `<div class="${styles.posterPath}">${esc(n.path)}</div>` : ""}
        </div>
        <div class="${styles.psec}"><h4 class="${styles.psecH4}">About</h4><p class="${styles.psecP}">${esc(n.blurb || "")}</p></div>
        ${conns ? `<div class="${styles.psec}"><h4 class="${styles.psecH4}">Connections</h4>${conns}</div>` : ""}`;
      panel.classList.add(styles.panelIsOpen);
      panel.dataset.id = n.id;
    }

    function closePanel() {
      if (panel) panel.classList.remove(styles.panelIsOpen);
    }

    function ensureShown(n: NodeItem) {
      if (n.type === "leaf" && n.group) {
        const gNode = byId.get(n.group);
        if (gNode && !expanded.get(n.group)) {
          setExp(gNode, true);
          reheat(0.4);
        }
      }
    }

    const onPanelClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const c = target?.closest<HTMLButtonElement>(`.${styles.conn}`);
      if (c && c.dataset.id) {
        const n = byId.get(c.dataset.id);
        if (n) {
          ensureShown(n);
          select(n.id, 1);
          pulseN = { id: n.id, t0: performance.now() };
        }
      }
    };

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearFocus();
        hideHC();
      }
    };

    /* ================= RESIZE & BOOT ================= */
    function resize() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = container!.getBoundingClientRect();
      GW = r.width;
      GH = r.height;
      if (GW === 0 || GH === 0) return;
      gcv!.width = GW * dpr;
      gcv!.height = GH * dpr;
      gcv!.style.width = GW + "px";
      gcv!.style.height = GH + "px";
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);
    resize();

    for (let i = 0; i < 260; i++) simTick();
    simAlpha = 0.35;

    let x0 = 1e9;
    let y0 = 1e9;
    let x1 = -1e9;
    let y1 = -1e9;
    shownNodes().forEach((n) => {
      x0 = Math.min(x0, n.x);
      y0 = Math.min(y0, n.y);
      x1 = Math.max(x1, n.x);
      y1 = Math.max(y1, n.y);
    });
    const kInitial = Math.max(
      0.3,
      Math.min(
        1.6,
        0.94 * Math.min(GW / (x1 - x0 + 140), GH / (y1 - y0 + 140))
      )
    );
    cam.k = kInitial;
    cam.x = (x0 + x1) / 2;
    cam.y = (y0 + y1) / 2;

    let animId: number;
    function frame(now: number) {
      simTick();
      drawGraph(now);
      animId = requestAnimationFrame(frame);
    }
    animId = requestAnimationFrame(frame);

    gcv.addEventListener("pointerdown", onPointerDown);
    gcv.addEventListener("pointermove", onPointerMove);
    gcv.addEventListener("pointerup", onPointerUp);
    gcv.addEventListener("wheel", onWheel, { passive: false });

    if (crumbClearRef.current) {
      crumbClearRef.current.addEventListener("click", clearFocus);
    }
    if (panelCloseRef.current) {
      panelCloseRef.current.addEventListener("click", clearFocus);
    }
    if (panel) {
      panel.addEventListener("click", onPanelClick);
    }
    window.addEventListener("keydown", onKeydown);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      gcv.removeEventListener("pointerdown", onPointerDown);
      gcv.removeEventListener("pointermove", onPointerMove);
      gcv.removeEventListener("pointerup", onPointerUp);
      gcv.removeEventListener("wheel", onWheel);
      if (crumbClearRef.current) {
        crumbClearRef.current.removeEventListener("click", clearFocus);
      }
      if (panelCloseRef.current) {
        panelCloseRef.current.removeEventListener("click", clearFocus);
      }
      if (panel) {
        panel.removeEventListener("click", onPanelClick);
      }
      window.removeEventListener("keydown", onKeydown);
    };
  }, []);

  return (
    <div className={styles.stage} ref={containerRef}>
      <section className={styles.view} id="view-graph">
        <canvas className={styles.gcanvas} ref={canvasRef} />
        <div className={`${styles.ov} ${styles.crumb}`} ref={crumbRef}>
          <span className={styles.crumbName} ref={crumbNameRef} />
          <span className={styles.crumbDepth} ref={crumbDepthRef} />
          <button
            className={styles.crumbClear}
            ref={crumbClearRef}
            title="Clear focus (Esc)"
          >
            Clear
          </button>
        </div>
      </section>

      <aside className={styles.panel} ref={panelRef}>
        <button
          className={styles.panelClose}
          ref={panelCloseRef}
          title="Close (Esc)"
        >
          &#10005;
        </button>
        <div className={styles.panelScroll} ref={panelScrollRef} />
      </aside>

      <div className={styles.hc} ref={hcRef} />
    </div>
  );
}
