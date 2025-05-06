// import { categories, articles } from "./_assets/content";
// import CardArticle from "./_assets/components/CardArticle";
// import CardCategory from "./_assets/components/CardCategory";
// import config from "@/config";
// import { getSEOTags } from "@/libs/seo";

// export const metadata = getSEOTags({
//   title: `${config.appName} Blog | Stripe Chargeback Protection`,
//   description:
//     "Learn how to prevent chargebacks, how to accept payments online, and keep your Stripe account in good standing",
//   canonicalUrlRelative: "/blog",
// });

// export default async function Blog() {
//   const articlesToDisplay = articles
//     .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
//     .slice(0, 6);
//   return (
//     <>
//       <section className="text-center max-w-xl mx-auto mt-12 mb-24 md:mb-32">
//         <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight mb-6">
//           The {config.appName} Blog
//         </h1>
//         <p className="text-lg opacity-80 leading-relaxed">
//           Learn how to ship your startup in days, not weeks. And get the latest
//           updates about the boilerplate
//         </p>
//       </section>

//       <section className="grid lg:grid-cols-2 mb-24 md:mb-32 gap-8">
//         {articlesToDisplay.map((article, i) => (
//           <CardArticle
//             article={article}
//             key={article.slug}
//             isImagePriority={i <= 2}
//           />
//         ))}
//       </section>

//       <section>
//         <p className="font-bold text-2xl lg:text-4xl tracking-tight text-center mb-8 md:mb-12">
//           Browse articles by category
//         </p>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {categories.map((category) => (
//             <CardCategory key={category.slug} category={category} tag="div" />
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }

import config from "@/config";
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: `${config.appName} Blog | LinkedIn Growth Strategies`,
  description:
    "Learn how to build a strategic LinkedIn presence, develop content calendars, and grow your professional audience effectively.",
  canonicalUrlRelative: "/blog",
});

export default async function Blog() {
  // Placeholder categories that align with your product
  const placeholderCategories = [
    { title: "LinkedIn Strategy", slug: "#" },
    { title: "Content Planning", slug: "#" },
    { title: "Audience Growth", slug: "#" },
    { title: "Personal Branding", slug: "#" }
  ];

  return (
    <>
      <section className="text-center max-w-xl mx-auto mt-12 mb-24 md:mb-32">
        <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight mb-6">
          The {config.appName} Blog
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          Strategic insights and practical advice to help you build your LinkedIn presence effectively.
        </p>
        
        <div className="mt-8 p-6 bg-base-200 rounded-lg">
          <h2 className="font-bold text-xl mb-3">Coming Soon</h2>
          <p>
            We are working on creating valuable content to help you master LinkedIn. 
            Check back soon for articles on strategy development, content creation, 
            and audience growth.
          </p>
        </div>
      </section>

      <section>
        <p className="font-bold text-2xl lg:text-4xl tracking-tight text-center mb-8 md:mb-12">
          Future Content Categories
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {placeholderCategories.map((category) => (
            <div 
              key={category.title}
              className="p-4 bg-base-200 text-base-content rounded-box"
            >
              <h3 className="md:text-lg font-medium">{category.title}</h3>
            </div>
          ))}
        </div>
      </section>
      
      <section className="max-w-xl mx-auto text-center mt-24 mb-12">
        <p className="text-base-content/70">
          Want to be notified when we publish new content? 
          <a href="/" className="text-primary ml-1 hover:underline">
            Sign up for updates
          </a>
        </p>
      </section>
    </>
  );
}