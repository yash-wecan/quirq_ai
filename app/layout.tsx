import type { Metadata, Viewport } from "next";
import { Fira_Mono, Inter, JetBrains_Mono, Poppins } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { Nav } from "@/components/ui/nav";
import "./globals.css";

/* Geometric for the mark, grotesque for reading, mono for anything metered. */
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const fira = Fira_Mono({
  variable: "--font-fira",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const DESCRIPTION =
  "Tokens meter what your AI consumed. quirq meters what it delivered: verified against captured state, priced by the person who wanted it, costed all-in.";

export const metadata: Metadata = {
  metadataBase: new URL("https://quirq.ai"),
  title: {
    default: "quirq · work at light speed",
    template: "%s · quirq",
  },
  description: DESCRIPTION,
  icons: {
    icon: "/assets/favicon.svg",
    apple: "/assets/quirq-mark.jpg",
  },
  openGraph: {
    title: "quirq · work at light speed",
    description: DESCRIPTION,
    url: "https://quirq.ai",
    type: "website",
    images: [{ url: "/assets/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "quirq · work at light speed",
    description: DESCRIPTION,
    images: ["/assets/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${jetbrains.variable} ${fira.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}p||((p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",p.onerror=function(){p=null},(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r));var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="jo Bo Ho init ul hl al ol fl Sa ll gl rl capture getExtension dl No kl calculateEventProperties wl register register_once register_for_session unregister unregister_for_session Tl sl Sl getFeatureFlag getFeatureFlagPayload getFeatureFlagResult getAllFeatureFlags isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync Ml identify setPersonProperties unsetPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset El shutdown setIdentity clearIdentity get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException addExceptionStep captureLog startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty xl bl createPersonProfile setInternalOrTestUser Cl Uo zo opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing ml debug xa Rn getPageViewId captureTraceFeedback captureTraceMetric Xo".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('phc_xK7RTw3AwX7HZ9t9PmKA97JegPBxD2bWZWEaQ3UG7nn5', {
    api_host: 'https://us.i.posthog.com',
    defaults: '2026-05-30',
    person_profiles: 'identified_only',
});`,
          }}
        />
        {/* Entrance animations start from opacity:0. Without JS those inline
            styles would never be cleared, so the page would render blank. */}
        {/* The agent disclosure and copy button need JS, so they are hidden
            rather than left as dead controls; the install command itself
            remains selectable and the page content remains fully readable.
            .cta-bloom is hidden for a different reason: it is a hover-only
            spectrum glow that the opacity reset above would otherwise pin on,
            painting a rainbow blob behind every CTA on the page. */}
        <noscript>
          <style>{`main *, nav, nav * { opacity: 1 !important; transform: none !important; filter: none !important; } .openin-toggle, .copy-command, .menu-toggle, .cta-bloom { display: none !important; }`}</style>
        </noscript>
      </head>
      <body>
        <MotionProvider>
          <Nav />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
