import Link from "next/link";
import SidebarScaffold from "@/components/SidebarScaffold";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata(
  "Privacy Policy",
  "How DevTools Hub handles account details, tool history, contact inquiries, analytics, cookies, and advertising.",
  "/privacy-policy",
);

export default function PrivacyPolicyPage() {
  return (
    <SidebarScaffold title="Privacy Policy">
      <main className="mx-auto min-h-screen max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <header className="rounded-4xl border border-(--border) bg-white p-8 shadow-sm sm:p-10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-(--muted)">Reviewed 2026-10-26</p>
          <h1 className="mt-3 font-serif text-3xl italic text-(--ink) sm:text-4xl">Privacy Policy</h1>
          <p className="mt-4 text-sm leading-7 text-(--muted)">
            This summary describes data handling visible in the DevTools Hub application. Google, EmailJS, the database host, and other services may have additional practices not controlled by this website. Contact WebCodeveloper if you have a privacy question or request.
          </p>
        </header>

        <section className="mt-8 rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl italic text-(--ink)">Tool inputs and account history</h2>
          <p className="mt-3 text-sm leading-7 text-(--muted)">
            Most tool calculations run in your browser. This does not mean all information always stays on your device: JSON Formatter, JWT Decoder, Base64 Converter, Image to Base64, Gradient Generator, Markdown Preview, and UUID Generator can send a history entry to this site when you are signed in. History entries can contain tool input and output; image history records the file name and a generated-output note rather than the image itself.
          </p>
          <p className="mt-3 text-sm leading-7 text-(--muted)">
            History is stored in the site database and the application returns up to the 50 most recent entries for an account. The application does not define a public retention period or automatic expiry for these records. Do not submit passwords, private keys, authentication secrets, or sensitive production data. Email{" "}
            <a className="underline underline-offset-4" href="mailto:webcodeveloper731@gmail.com">webcodeveloper731@gmail.com</a>{" "}
            to ask about an account or history deletion.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl italic text-(--ink)">Accounts and session cookies</h2>
          <p className="mt-3 text-sm leading-7 text-(--muted)">
            If you create an account, the application stores a username, a password hash, and an account creation timestamp in its database. It uses an HTTP-only session cookie named <code>devtools_session</code>; the configured session lifetime is 24 hours. The registration form does not ask for an email address.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl italic text-(--ink)">Contact inquiries</h2>
          <p className="mt-3 text-sm leading-7 text-(--muted)">
            The optional contact form submits your name, email address, optional phone number, selected service, subject, message, and submission time through EmailJS when the service is configured. EmailJS and the configured email provider may process that information to deliver the inquiry. You can instead email{" "}
            <a className="underline underline-offset-4" href="mailto:webcodeveloper731@gmail.com">webcodeveloper731@gmail.com</a>.
          </p>
          <p className="mt-3 text-sm leading-7 text-(--muted)">
            The site code does not specify how long the recipient or email provider retains inquiries. Do not include sensitive credentials in a message.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl italic text-(--ink)">Analytics and location signals</h2>
          <p className="mt-3 text-sm leading-7 text-(--muted)">
            The site loads Google Analytics and records page views and tool-use events. It also reads browser language and time zone and requests country, region, and city values from hosting request headers; configured analytics services may receive those values. Microsoft Clarity can also load when its project identifier is configured. These third parties process data under their own terms and privacy notices.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl italic text-(--ink)">Advertising, cookies, and third parties</h2>
          <p className="mt-3 text-sm leading-7 text-(--muted)">
            The application loads Google AdSense. Google and its partners may use cookies or similar technologies to deliver, measure, and personalize advertising, subject to your settings, location, and applicable Google policies. This codebase does not implement a consent-management interface; the publisher should confirm the appropriate consent configuration for the regions served.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-(--muted)">
            <li><a className="underline underline-offset-4" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
            <li><a className="underline underline-offset-4" href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">EmailJS Privacy Policy</a></li>
            <li><a className="underline underline-offset-4" href="https://clarity.microsoft.com/terms" target="_blank" rel="noopener noreferrer">Microsoft Clarity terms</a> (if Clarity is configured)</li>
          </ul>
        </section>

        <section className="mt-8 rounded-3xl border border-(--border) bg-(--surface) p-6">
          <h2 className="font-serif text-2xl italic text-(--ink)">Questions and requests</h2>
          <p className="mt-3 text-sm leading-7 text-(--muted)">
            For privacy questions or requests about account data, contact the publisher at{" "}
            <a className="underline underline-offset-4" href="mailto:webcodeveloper731@gmail.com">webcodeveloper731@gmail.com</a>. You can also review the <Link href="/terms-and-conditions" className="underline underline-offset-4">Terms and Conditions</Link>.
          </p>
        </section>
      </main>
    </SidebarScaffold>
  );
}
