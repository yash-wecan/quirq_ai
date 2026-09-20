"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { PICKS } from "./content";
import styles from "./machinespeed.module.css";

/**
 * "What would you bring?" The intake card beside the closing section.
 *
 * TODO: this is still the prototype from the source file. Submitting only
 * shows the confirmation; nothing is sent anywhere. Wire it to a real
 * endpoint (or a booking link) before this route ships.
 */
export function Intake() {
  const id = useId();
  const [pick, setPick] = useState<string | null>(null);
  const [warn, setWarn] = useState(false);
  const [sent, setSent] = useState(false);
  const email = useRef<HTMLInputElement>(null);

  const choose = (label: string) => setPick(pick === label ? null : label);

  const DEFAULT_EXAMPLE =
    "e.g. Three people re-key orders between Shopify and NetSuite every morning, and our Zapier fix keeps breaking";
  const example = PICKS.find((p) => p.label === pick)?.example || DEFAULT_EXAMPLE;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const field = email.current;
    if (!field?.value || !field.checkValidity()) {
      setWarn(true);
      field?.focus();
      return;
    }
    setSent(true);
  };

  return (
    <form className={styles.intake} noValidate onSubmit={submit}>
      {sent ? (
        <div className={styles.sent} role="status">
          <b>✓ Got it</b>
          <p>We&rsquo;ll reply within one business day to set up your walkthrough. You won&rsquo;t need to repeat any of this on the call.</p>
        </div>
      ) : (
        <div className={styles.intakeFields}>
          <div className={styles.intakeH}>
            <h3>What kind of business are you?</h3>
            <span className={styles.k}>Pick one · optional</span>
          </div>
          <div className={styles.picks} role="group" aria-label="Your kind of business">
            {PICKS.map((p) => (
              <button key={p.label} type="button" aria-pressed={pick === p.label} onClick={() => choose(p.label)}>
                {p.label}
              </button>
            ))}
          </div>
          <div className={styles.field}>
            <label htmlFor={`${id}-about`}>Which workflow would you bring? A sentence or two is enough</label>
            <textarea id={`${id}-about`} name="about" rows={3} placeholder={example} />
          </div>
          <div className={styles.field}>
            <label htmlFor={`${id}-tools`}>Tools it touches today</label>
            <input id={`${id}-tools`} name="tools" type="text" placeholder="A quick list is enough" />
          </div>
          <div className={styles.two}>
            <div className={styles.field}>
              <label htmlFor={`${id}-team`}>Team size</label>
              <input id={`${id}-team`} name="team" type="text" inputMode="numeric" placeholder="Roughly" />
            </div>
            <div className={styles.field}>
              <label htmlFor={`${id}-email`}>Work email</label>
              <input ref={email} id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="you@company.com" />
            </div>
          </div>
          <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit">
            Request my walkthrough <span className={styles.arr} aria-hidden>→</span>
          </button>
          <p className={`${styles.intakeFoot}${warn ? ` ${styles.intakeWarn}` : ""}`} aria-live="polite">
            {warn ? "Add a work email so we can reply." : "We reply within one business day. No sequence, no SDR."}
          </p>
        </div>
      )}
    </form>
  );
}
