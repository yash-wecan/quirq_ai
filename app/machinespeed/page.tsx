import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/ui/footer";
import { Cases } from "./cases";
import { COMPLIANCE, AGENDA, CASES, FAQ, FOUNDATION, MODELS, PEOPLE, SECTIONS, TIMELINE } from "./content";
import { ControlRoom } from "./control-room";
import { HeroWord } from "./hero-word";
import { BEFORE } from "./diagrams";
import { Intake } from "./intake";
import { ModeSwitch } from "./mode-switch";
import { SectionLinks } from "./section-nav";
import styles from "./machinespeed.module.css";

/**
 * MachineSpeed v2, ported from machinespeed-int/website/machinespeed-site.html.
 *
 * A sub-brand ("built on quirq technology") reached from the Enterprise link in
 * the site nav, opened in a new tab. It keeps the brandkit it was authored
 * with, but wears quirq's chrome: the site nav above, SiteFooter below.
 *
 * Server-rendered apart from six narrow client islands: the hero's changing
 * word, the reader-mode switch, the control room, the use-case tabs, the
 * intake form and the section-link highlighter.
 * Copy lives in content.ts; the before-state diagrams in diagrams.tsx.
 */

export const metadata: Metadata = {
  // Absolute: this page is not a quirq page, so it does not take the root
  // layout's "· quirq" title template.
  title: { absolute: "MachineSpeed" },
  description:
    "Don't duct-tape AI onto your business. MachineSpeed engineers put governed AI agents into production in 14 days, on the quirq runtime.",
};

export const viewport: Viewport = {
  themeColor: "#10120F",
};

function Mark() {
  return (
    <a className={styles.mark} href="#top" aria-label="MachineSpeed, back to top">
      <span className={styles.bars} aria-hidden>
        <i />
        <i />
        <i />
      </span>
      <b>MACHINESPEED</b>
    </a>
  );
}

function Arrow() {
  return <span className={styles.arr} aria-hidden>→</span>;
}

const ICONS: Record<(typeof FOUNDATION)[number]["icon"], React.ReactNode> = {
  scope: (
    <div className={styles.icoScope}>
      <i className={styles.on} /><i className={styles.on} /><i className={styles.no} /><i className={styles.on} />
    </div>
  ),
  gate: (
    <div className={styles.icoGate}>
      <i /><b />
    </div>
  ),
  log: (
    <div className={styles.icoLog}>
      <i /><i /><i /><i />
    </div>
  ),
  swap: (
    <div className={styles.icoSwap}>
      <i /><i className={styles.b} /><i /><i />
    </div>
  ),
};

export default function MachineSpeed() {
  return (
    <div className={styles.page} id="top">
      <header className={styles.subnav}>
        <div className={styles.wrap}>
          <Mark />
          <SectionLinks />
          <a className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`} href="#book">
            Bring us a workflow
          </a>
        </div>
      </header>

      <main>
        {/* ============ HERO ============ */}
        <section className={styles.hero} aria-labelledby="hero-h">
          <div className={styles.wrap}>
            <h1 id="hero-h">
              <span className="sr-only">Run your business at machinespeed.</span>
              <span aria-hidden>
                <span className={styles.w}>Run</span> <span className={styles.w}>your</span> <HeroWord />
              </span>
              <span className={styles.accent} aria-hidden>at machinespeed.</span>
            </h1>

            <div className={styles.heroFoot}>
              <div>
                <p className={`${styles.sub} ${styles.forAny}`}>
                  Most companies duct-tape AI onto the business. A prompt here, a Zap there, one person who knows how it
                  all fits. It holds right up until it touches money or a customer.{" "}
                  <strong>
                    We do it the other way round: agents built into how your company already runs, guardrails on, the
                    first one live in 14 days.
                  </strong>
                </p>
                <p className={`${styles.sub} ${styles.forStuck}`}>
                  You moved fast, and now you own the duct tape. Prompts, Zaps and scripts that break when someone
                  renames a column, and nobody can say what they did last week.{" "}
                  <strong>
                    We move what works onto one runtime with scopes, approvals and a record of every run. The business
                    doesn&rsquo;t stop while we do it.
                  </strong>
                </p>
                <p className={`${styles.sub} ${styles.forScale}`}>
                  AI already works in one team. Every other team wants it, and nobody owns the rules.{" "}
                  <strong>
                    We put your agents on one runtime so the second team starts where the first one finished, under
                    controls your security lead signed off once.
                  </strong>
                </p>
                <ModeSwitch />
              </div>
              <div className={styles.actions}>
                <a className={`${styles.btn} ${styles.btnPrimary}`} href="#book">
                  Bring us a workflow <Arrow />
                </a>
                <a className={`${styles.btn} ${styles.btnGhost}`} href="#room">
                  See it running ↓
                </a>
              </div>
            </div>

            <ControlRoom />
          </div>
        </section>

        {/* ============ FOUNDATION ============ */}
        <section className={styles.section} id="foundation" aria-labelledby="fnd-h">
          <div className={`${styles.wrap} ${styles.fndLayout}`}>
            <div className={`${styles.head} ${styles.reveal}`}>
              <span className={styles.label}>The foundation</span>
              <h2 id="fnd-h">Every agent you switch on is a new hire with a master key.</h2>
              <p>
                It can read your ledger, email your customers and move money. That makes it the most privileged hire
                you&rsquo;ve ever made, and most teams onboard it in an afternoon. Before the first one goes live with
                us, four things are already settled.
              </p>
              <p className={styles.hook}>
                Ask on the call and we&rsquo;ll show you all four <a href="#book">on your own workflow</a>.
              </p>
            </div>
            <div className={`${styles.found} ${styles.reveal}`}>
              {FOUNDATION.map((f) => (
                <div key={f.label} className={styles.fnd}>
                  <div className={styles.ico} aria-hidden>{ICONS[f.icon]}</div>
                  <span className={styles.k}>{f.label}</span>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ IN PRACTICE ============ */}
        <section className={styles.section} id="cases" aria-labelledby="cases-h">
          <div className={styles.wrap}>
            <div className={`${styles.head} ${styles.split} ${styles.reveal}`}>
              <h2 id="cases-h">The same workflow, both ways.</h2>
              <p>
                Duct-taped is what we usually find on day one. With MachineSpeed is what it runs on now. Toggle each one
                and look for where the person sits.
              </p>
            </div>
            <Cases cases={CASES} before={BEFORE} />
          </div>
        </section>

        {/* ============ ENGAGEMENT ============ */}
        <section className={styles.section} id="engagement" aria-labelledby="eng-h">
          <div className={styles.wrap}>
            <div className={`${styles.head} ${styles.lede} ${styles.reveal}`}>
              <p className={styles.big}>
                No discovery phase. No strategy deck. <em>No retainer.</em>
              </p>
              <h2 id="eng-h">
                Thirty minutes to a straight answer. Fourteen days to production. Then the next team, faster.
              </h2>
            </div>
            <div className={`${styles.commit} ${styles.reveal}`} aria-label="What every engagement commits to">
              <div><b>14 days</b><span>from the first call to a workflow live in production</span></div>
              <div><b>Fixed price</b><span>every sprint, agreed before day one, with an end date</span></div>
              <div><b>One number</b><span>per workflow, reported to you every month</span></div>
            </div>
            <ol className={`${styles.tl} ${styles.reveal}`}>
              {TIMELINE.map((step) => (
                <li key={step.title}>
                  <span className={styles.when}>{step.when}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <div className={styles.get}>
                    <b>You leave with</b>
                    {step.get}
                  </div>
                </li>
              ))}
            </ol>
            <div className={`${styles.rule} ${styles.reveal}`}>
              <p>
                <b>Our scoping rule:</b> if we can&rsquo;t show you 2–3× the sprint&rsquo;s value on the call, we&rsquo;ll
                say so and we won&rsquo;t propose one. You&rsquo;ll have lost half an hour.
              </p>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="#book">
                Book the walkthrough <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* ============ PEOPLE + INFRASTRUCTURE ============ */}
        <section className={`${styles.section} ${styles.tint}`} aria-labelledby="two-h">
          <div className={styles.wrap}>
            <div className={`${styles.head} ${styles.split} ${styles.reveal}`}>
              <h2 id="two-h">You don&rsquo;t buy software from us. You buy the outcome, and the people who own it.</h2>
              <p>
                MachineSpeed is a service. Our engineers sit inside your team and ship. Everything they ship runs where
                your work already lives, in your own cloud or on-prem, under one set of rules, so your security review
                happens once, not once per workflow.
              </p>
            </div>
            <div className={`${styles.halves} ${styles.reveal}`}>
              <div className={styles.half}>
                <div className={styles.halfTop}>
                  <span className={styles.pill}>The people</span>
                  <span className={styles.k}>MachineSpeed</span>
                </div>
                <h3>A small team inside yours.</h3>
                <p>
                  No handoff from sales to delivery, and no bench of juniors. The engineers on your walkthrough are the
                  ones who build your sprint and run it.
                </p>
                {/* TODO: confirm the nature of each team relationship before publishing. */}
                <p className={styles.cred}>
                  <b>Built by engineers who&rsquo;ve shipped agents and infrastructure</b> at the labs and clouds your
                  stack already runs on.
                </p>
                <div className={styles.names}>
                  {["OpenAI", "Google DeepMind", "Google Cloud", "AWS", "NVIDIA"].map((n) => <span key={n}>{n}</span>)}
                </div>
                {/* TODO: add GM name, headshot and engineer backgrounds once confirmed */}
                <ul className={styles.plist}>
                  {PEOPLE.map((p) => (
                    <li key={p.title}><b>{p.title}</b><span>{p.body}</span></li>
                  ))}
                </ul>
              </div>
              <div className={styles.half}>
                <div className={styles.halfTop}>
                  <span className={`${styles.pill} ${styles.pillBlue}`}>The infrastructure</span>
                  <span className={styles.k}>Your cloud or on-prem</span>
                </div>
                <h3>One set of rules for every agent.</h3>
                <p>
                  Your security team reviews the controls once. Every blueprint after that runs under them: scoped
                  access, approval gates, a full run record and your data rules.
                </p>
                <div>
                  <span className={`${styles.k} ${styles.complyLabel}`}>Designed to meet</span>
                  <ul className={styles.comply} aria-label="Compliance frameworks">
                    {COMPLIANCE.map((c) => (
                      <li key={c.name}><b>{c.name}</b><span>{c.body}</span></li>
                    ))}
                  </ul>
                </div>
                <div className={styles.chips} aria-label="Models we work with">
                  {MODELS.map((m) => <span key={m}>{m}</span>)}
                </div>
              </div>
              <div className={styles.modelsLine}>
                <blockquote>
                  You shouldn&rsquo;t have to choose your model or apps.{" "}
                  <em>Keep what you already use, or let us recommend what works.</em>
                </blockquote>
                <a className={`${styles.btn} ${styles.btnGhost}`} href="#faq">How we pick models and tools</a>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className={styles.section} id="faq" aria-labelledby="faq-h">
          <div className={styles.wrap}>
            <div className={`${styles.head} ${styles.plain} ${styles.reveal}`}>
              <h2 id="faq-h">The questions that come up before the call.</h2>
            </div>
            <div className={`${styles.faq} ${styles.reveal}`}>
              {FAQ.map((column, ci) => (
                <div key={ci}>
                  {column.map(([q, a]) => (
                    <details key={q}>
                      <summary>{q}</summary>
                      <p>{a}</p>
                    </details>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CLOSE ============ */}
        <section className={styles.close} id="book" aria-labelledby="book-h">
          <div className={styles.wrap}>
            <div>
              <span className={styles.label}>The walkthrough · 30 minutes</span>
              <h2 id="book-h">
                Bring us the workflow <span className={styles.accent}>you&rsquo;re tired of.</span>
              </h2>
              <p className={`${styles.sub} ${styles.forAny}`}>
                The one that eats a morning every week, or the one that broke last month. Show it to us. We&rsquo;ll show
                you, live, how it runs with the guardrails on, and tell you straight if it&rsquo;s not worth building.
              </p>
              <p className={`${styles.sub} ${styles.forStuck}`}>
                Bring the one that keeps breaking. We&rsquo;ll show you, live, how the same workflow runs with
                MachineSpeed, with scopes, approvals and a record, and how we&rsquo;d move it without pausing the business.
              </p>
              <p className={`${styles.sub} ${styles.forScale}`}>
                Bring the one you want every team to have. We&rsquo;ll show you, live, how it runs once, under one set of
                rules, and how the next team gets it in days.
              </p>
              <div className={styles.actions}>
                {/* TODO: replace href with the live booking link */}
                <a className={`${styles.btn} ${styles.btnPrimary}`} href="#book">
                  Pick a time <Arrow />
                </a>
              </div>
              <ul className={styles.agenda}>
                {AGENDA.map((a) => (
                  <li key={a.when}>
                    <b>{a.when}</b>
                    <span><strong>{a.lead}</strong> {a.body}</span>
                  </li>
                ))}
              </ul>
              {/* TODO: confirm this capacity statement reflects how you actually book sprints. */}
              <p className={`${styles.sub} ${styles.capacity}`}>
                We run a handful of sprints at a time, so the engineers on your call are the ones who build. If
                we&rsquo;re full, we&rsquo;ll tell you the next start date rather than take the booking.
              </p>
            </div>
            <Intake />
          </div>
        </section>
      </main>

      <footer className={styles.msFoot}>
        <div className={styles.wrap}>
          <div className={styles.foot}>
            <div>
              <Mark />
              <p className={styles.footTag}>Agents that do the work at machine speed, with controls that answer to people.</p>
            </div>
            <nav className={styles.footLinks} aria-label="MachineSpeed footer">
              {SECTIONS.slice(1, 3).map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
              <Link href="/whitepaper">Whitepaper</Link>
              <a href="/llm.txt" target="_blank" rel="noreferrer">llm.txt<span className="sr-only"> (opens in a new tab)</span></a>
              <a href="#book">Contact</a>
            </nav>
          </div>
          <div className={styles.legal}>
            <span>© 2026 MachineSpeed</span>
            <span>built on <em>quirq</em> technology</span>
          </div>
        </div>
      </footer>

      {/* The site's own footer, so this page closes the way every other route does. */}
      <SiteFooter />
    </div>
  );
}
