import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
         {`Last Updated: 2025-05-05

Welcome to Thinkd.In!

These Terms of Service ("Terms") govern your use of the Thinkd.in website at https://thinkd.in ("Website") and the services provided by Thinkd.In. By using our Website and services, you agree to these Terms.

1. Description of Thinkd.in

Thinkd.In is a platform that provides tools and AI-powered generators to help users develop their LinkedIn strategy, content, and personal brand more efficiently.

2. Ownership and Usage Rights

When you purchase a plan from Thinkd.in, you gain access to tools and generated content to support your marketing or professional growth. You may use this content for personal or business use, but you may not resell, redistribute, or claim ownership of the platform or its underlying code. We offer a full refund within 7 days of purchase upon request.

3. User Data and Privacy

We collect user data including name, email, and payment information to deliver our services. Please refer to our Privacy Policy at https://thinkd.in/privacy-policy for full details on data usage.

4. Non-Personal Data Collection

We use cookies to collect non-personal data, such as browser type and usage patterns, to improve your experience and optimize our services.

5. Governing Law

These Terms are governed by the laws of France.

6. Updates to the Terms

We may revise these Terms periodically. Any significant changes will be communicated via email.

If you have any questions about these Terms, please contact us at info@thinkd.in.

Thank you for using Thinkd.in!`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
