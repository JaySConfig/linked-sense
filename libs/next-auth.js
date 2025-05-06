// // import GoogleProvider from "next-auth/providers/google";
// // import EmailProvider from "next-auth/providers/email";
// // import { MongoDBAdapter } from "@auth/mongodb-adapter";
// // import config from "@/config";
// // import connectMongo from "./mongo";

// // export const authOptions = {
// //   // Set any random key in .env.local
// //   secret: process.env.NEXTAUTH_SECRET,
// //   providers: [
// //     GoogleProvider({
// //       // Follow the "Login with Google" tutorial to get your credentials
// //       clientId: process.env.GOOGLE_ID,
// //       clientSecret: process.env.GOOGLE_SECRET,
// //       async profile(profile) {
// //         console.log("Google profile:", profile); // Log profile data
// //         return {
// //           id: profile.sub,
// //           name: profile.given_name ? profile.given_name : profile.name,
// //           email: profile.email,
// //           image: profile.picture,
// //           createdAt: new Date(),
// //         };
// //       },
// //     }),
// //     // Follow the "Login with Email" tutorial to set up your email server
// //     // Requires a MongoDB database. Set MONOGODB_URI env variable.
// // //     ...(connectMongo
// // //       ? [
// // //           EmailProvider({
// // //             server: {
// // //               host: "smtp.resend.com",
// // //               port: 465,
// // //               auth: {
// // //                 user: "resend",
// // //                 pass: process.env.RESEND_API_KEY,
// // //               },
// // //             },
// // //             from: config.resend.fromNoReply,
// // //           }),
// // //         ]
// // //       : []),
// //   ],
// // //   // New users will be saved in Database (MongoDB Atlas). Each user (model) has some fields like name, email, image, etc..
// // //   // Requires a MongoDB database. Set MONOGODB_URI env variable.
// // //   // Learn more about the model type: https://next-auth.js.org/v3/adapters/models
// //   ...(connectMongo && { adapter: MongoDBAdapter(connectMongo) }),

// //   callbacks: {
// //     session: async ({ session, token }) => {
// //       if (session?.user) {
// //         session.user.id = token.sub;
// //       }
// //       return session;
// //     },
// //   },
// //   session: {
// //     strategy: "jwt",
// //   },
// // //   theme: {
// // //     brandColor: config.colors.main,
// // //     // Add you own logo below. Recommended size is rectangle (i.e. 200x50px) and show your logo + name.
// // //     // It will be used in the login flow to display your logo. If you don't add it, it will look faded.
// //     // logo: `https://${config.domainName}/logoAndName.png`,
// // //   },
// // };


// /////// google gemini version

// // Your libs/next-auth.js file
// // libs/next-auth.js (Final Corrected Version)

// import GoogleProvider from "next-auth/providers/google";
// import { Resend } from "resend";
// import EmailProvider from "next-auth/providers/email";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import config from "@/config"; // Assuming you use this
// import connectMongo from "./mongo"; // <--- Make sure this path is correct and the function works!

// export const authOptions = {
//   // Set any random key in .env.local
//   secret: process.env.NEXTAUTH_SECRET,

//   providers: [
//     Resend({
//       apiKey: process.env.RESEND_API_KEY,
//       from: "noreply@mail.thinkd.in"
//     }),
//     GoogleProvider({
//       // Follow the "Login with Google" tutorial to get your credentials
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//       async profile(profile) {
//         // This profile function helps prepare the initial user object
//         console.log("Google profile:", profile); // Log profile data
//         return {
//           id: profile.sub, // The adapter should map this initial provider ID to the DB ID
//           name: profile.given_name ? profile.given_name : profile.name,
//           email: profile.email,
//           image: profile.picture,
//           createdAt: new Date(), // Added for potential use by adapter/schema
//         };
//       },
//     }),
    
//     ...(connectMongo
//       ? EmailProvider({
//             server: {
//               host: "smtp.resend.com",
//               port: 465,
//               auth: {
//                 user: "resend",
//                 pass: process.env.RESEND_API_KEY,
//               },
//             },
//             from: config.resend.fromNoReply,
//           }),
//         ]
//       : []),
//   ],

//   // --- Use YOUR original adapter syntax, uncommented ---
//   // Ensure connectMongo correctly provides a promise resolving to the MongoClient
//   ...(connectMongo && { adapter: MongoDBAdapter(connectMongo) }),

//   // --- Ensure this session block is UNCOMMENTED ---
//   session: {
//     strategy: "jwt", // JWT strategy is needed for callbacks
//   },



// // Inside your authOptions
//   callbacks: {
//     async jwt({ token, user }) {
//       console.log("\n--- JWT Callback Start ---");
//       // console.log("JWT - Initial Token:", JSON.stringify(token, null, 2));
//       // console.log("JWT - User object received:", JSON.stringify(user, null, 2)); // Will be undefined except on sign-in

//       // Add user ID to the token ONLY on initial sign-in when 'user' object is present
//       // On subsequent calls, the token passed in should already have the .id if added previously.
//       if (user?.id) {
//         console.log(`JWT Callback: Sign-in detected. Found user.id: ${user.id}. Adding to token.id`);
//         token.id = user.id;
//       } else {
//         console.log("JWT Callback: Not sign-in event (user obj undefined). Returning token as is.");
//       }

//       // console.log("JWT Callback - Returning Token:", JSON.stringify(token, null, 2)); // Check if token.id persists
//       console.log("--- JWT Callback End ---\n");
//       // Always return the token. If sign-in, it now has the id. If not sign-in, it returns the existing token.
//       return token;
//     },

//     async session({ session, token }) {
//       console.log("\n--- Session Callback Start ---");
//       // console.log("Session - Received Token:", JSON.stringify(token, null, 2)); // Check if token has .id
//       // console.log("Session - Initial Session Object:", JSON.stringify(session, null, 2));

//       // Add the id from the token (if it exists) to the session.user object
//       if (token?.id && session.user) {
//         console.log(`Session Callback: Found token.id: ${token.id}. Adding to session.user.id`);
//         session.user.id = token.id;
//       } else {
//         console.log(`Session Callback: token.id (${token?.id}) NOT found in token OR session.user missing.`);
//       }

//       // console.log("Session Callback - Returning Session:", JSON.stringify(session, null, 2)); // Check final session
//       console.log("--- Session Callback End ---\n");
//       return session;
//     }
//   }, // --- End of callbacks block ---
//   // Optional theme settings (keeping commented as in your code)
//   theme: {
//     brandColor: config.colors.main,
//     logo: `https://${config.domainName}/logoAndName.png`,
//   },
// };


import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import config from "@/config";
import connectMongo from "./mongo";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.given_name ? profile.given_name : profile.name,
          email: profile.email,
          image: profile.picture,
          createdAt: new Date(),
        };
      },
    }),
    ...(connectMongo
      ? [
          EmailProvider({
            server: {
              host: "smtp.resend.com",
              port: 465,
              auth: {
                user: "resend",
                pass: process.env.RESEND_API_KEY,
              }
            },
            from: "noreply@mail.thinkd.in"
          }),
        ]
      : []),
  ],
  
  ...(connectMongo && { adapter: MongoDBAdapter(connectMongo) }),
  
  session: {
    strategy: "jwt",
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id;
      }
      return session;
    }
  },
  
  theme: {
    brandColor: config.colors.main,
    // logo: `https://${config.domainName}/logoAndName.png`,
    logo: "/logo.png", 
  },
};