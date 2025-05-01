// const Arrow = ({ extraStyle }) => {
//   return (
//     <svg
//       className={`shrink-0 w-12 fill-neutral-content opacity-70 ${extraStyle}`}
//       viewBox="0 0 138 138"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <g>
//         <path
//           fillRule="evenodd"
//           clipRule="evenodd"
//           d="M72.9644 5.31431C98.8774 43.8211 83.3812 88.048 54.9567 120.735C54.4696 121.298 54.5274 122.151 55.0896 122.639C55.6518 123.126 56.5051 123.068 56.9922 122.506C86.2147 88.9044 101.84 43.3918 75.2003 3.80657C74.7866 3.18904 73.9486 3.02602 73.3287 3.44222C72.7113 3.85613 72.5484 4.69426 72.9644 5.31431Z"
//         />
//         <path
//           fillRule="evenodd"
//           clipRule="evenodd"
//           d="M56.5084 121.007C56.9835 118.685 57.6119 115.777 57.6736 115.445C59.3456 106.446 59.5323 97.67 58.4433 88.5628C58.3558 87.8236 57.6824 87.2948 56.9433 87.3824C56.2042 87.4699 55.6756 88.1435 55.7631 88.8828C56.8219 97.7138 56.6432 106.225 55.0203 114.954C54.926 115.463 53.5093 121.999 53.3221 123.342C53.2427 123.893 53.3688 124.229 53.4061 124.305C53.5887 124.719 53.8782 124.911 54.1287 125.015C54.4123 125.13 54.9267 125.205 55.5376 124.926C56.1758 124.631 57.3434 123.699 57.6571 123.487C62.3995 120.309 67.4155 116.348 72.791 113.634C77.9171 111.045 83.3769 109.588 89.255 111.269C89.9704 111.475 90.7181 111.057 90.9235 110.342C91.1288 109.626 90.7117 108.878 89.9963 108.673C83.424 106.794 77.3049 108.33 71.5763 111.223C66.2328 113.922 61.2322 117.814 56.5084 121.007Z"
//         />
//       </g>
//     </svg>
//   );
// };
const Step = ({ emoji, text }) => {
  return (
    <div className="w-full md:w-48 flex flex-col gap-2 items-center justify-center">
      <span className="text-4xl">{emoji}</span>
      <h3 className="font-bold">{text}</h3>
    </div>
  );
};

// Problem Agitation: A crucial, yet overlooked, component for a landing page that sells.
// It goes under your Hero section, and above your Features section.
// Your Hero section makes a promise to the customer: "Our product will help you achieve XYZ".
// Your Problem section explains what happens to the customer if its problem isn't solved.
// The copy should NEVER mention your product. Instead, it should dig the emotional outcome of not fixing a problem.
// For instance:
// - Hero: "ShipFast helps developers launch startups fast"
// - Problem Agitation: "Developers spend too much time adding features, get overwhelmed, and quit." (not about ShipFast at all)
// - Features: "ShipFast has user auth, Stripe, emails all set up for you"
const Problem = () => {
  return (
    // <section className="bg-neutral text-neutral-content">
    //   <div className="max-w-7xl mx-auto px-8 py-8 md:py-32 text-center flex flex-col">
        
    //     {/* Header */}
    //     <h2 className="max-w-3xl mx-auto font-extrabold text-4xl md:text-5xl tracking-tight mb-6 md:mb-8">
    //     The Hidden Risk of Guesswork

    //     </h2>

    //     {/* Subtext */}
    //     <div className="max-w-xl mx-auto text-lg opacity-90 leading-relaxed mb-8 md:mb-12">
    //       <p className="mb-4">Most LinkedIn creators rely on guesswork.</p>
    //       <p className="mb-4">
    //         LinkedSense removes the uncertainty by providing clear, AI-powered content insights.
    //       </p>
    //     </div>

    //     {/* Benefits Section with `flex-grow` */}
    //     <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-4 flex-grow">
    //       <Step emoji="✅" text="Discover What Works Best" />
    //       <Step emoji="✅" text="Get real-time engagement analysis" />
    //       <Step emoji="✅" text="Optimise your content strategy" />
    //     </div>

    //     {/* CTA - Kept at bottom without increasing section size */}
    //     <div className="max-w-xl mx-auto text-lg leading-relaxed mt-auto pt-12">
    //       <p className="font-bold text-2xl">Start making data-driven LinkedIn posts today.</p>
    //     </div>

    //   </div>
    // </section>
    <section className="bg-neutral text-neutral-content">
      <div className="max-w-7xl mx-auto px-8 py-8 md:py-32 text-center flex flex-col">
        
        {/* Header */}
        <h2 className="max-w-3xl mx-auto font-extrabold text-4xl md:text-5xl tracking-tight mb-6 md:mb-8">
          The Hidden Risk of Guesswork
        </h2>

        {/* Subtext */}
        <div className="max-w-xl mx-auto text-lg opacity-90 leading-relaxed mb-8 md:mb-12">
          <p className="mb-4">
            Most LinkedIn creators don&apos;t fail because they&apos;re bad writers — they fail because they post without a clear strategy.
          </p>
          <p className="mb-4">
            When you guess what to post, your audience feels it, your growth stalls, and opportunities pass you by.
          </p>
          <p className="mb-4">
            Inconsistent, scattered content doesn&apos;t just slow you down — it actively damages your reputation over time.
          </p>
        </div>

        {/* Benefits Section with `flex-grow` */}
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-4 flex-grow">
          <Step emoji="✅" text="Discover What Resonates" />
          <Step emoji="✅" text="Get Smarter Post Insights" />
          <Step emoji="✅" text="Grow With Confidence" />
        </div>

        {/* CTA - Kept at bottom without increasing section size */}
        <div className="max-w-xl mx-auto text-lg leading-relaxed mt-auto pt-12">
          <p className="font-bold text-2xl">Start building a strategic LinkedIn presence today.</p>
        </div>

      </div>
    </section>



  );
};

export default Problem;
