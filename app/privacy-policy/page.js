import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://thinkd.in
// - Name: ShipFast
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: info@thinkd.in

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
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
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: 2025-05-05

Thank you for visiting Thinkd.in ("we," "us," or "our"). This Privacy Policy outlines how we collect, use, and protect your personal and non-personal information when you use our website located at https://thinkd.in (the "Website").

By accessing or using the Website, you agree to the terms of this Privacy Policy. If you do not agree with the practices described in this policy, please do not use the Website.

1. Information We Collect

1.1 Personal Data

We collect the following personal information from you:

Name: Used to personalize your experience and communicate effectively.
Email: Used to send you your generated content, important updates, and communications.
Payment Information: Collected and processed securely via third-party payment processors. We do not store your payment details.

1.2 Non-Personal Data

We use cookies and similar technologies to collect non-personal data such as browser type, device information, and usage patterns to improve the functionality and performance of our services.

2. Purpose of Data Collection

Your data is collected solely for the purpose of processing orders, generating and delivering content, and improving our services.

3. Data Sharing

We do not share your personal data with third parties, except as necessary to process payments or operate our service infrastructure. We never sell your data.

4. Children's Privacy

Thinkd.in is not intended for children under 13. We do not knowingly collect information from children. If you believe a child has submitted personal data, please contact us.

5. Updates to This Policy

We may update this Privacy Policy from time to time. Users will be notified of significant changes via email.

6. Contact Information

For questions or concerns regarding this Privacy Policy, please contact:

Email: info@thinkd.in

By using Thinkd.In, you consent to the terms of this Privacy Policy.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
