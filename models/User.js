// import mongoose from "mongoose";
// import toJSON from "./plugins/toJSON";

// // USER SCHEMA
// const userSchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       trim: true,
//     },
//     email: {
//       type: String,
//       trim: true,
//       lowercase: true,
//       private: true,
//     },
//     image: {
//       type: String,
//     },
//     // Used in the Stripe webhook to identify the user in Stripe and later create Customer Portal or prefill user credit card details
//     customerId: {
//       type: String,
//       validate(value) {
//         return value.includes("cus_");
//       },
//     },
//     // Used in the Stripe webhook. should match a plan in config.js file.
//     priceId: {
//       type: String,
//       validate(value) {
//         return value.includes("price_");
//       },
//     },
//     // Used to determine if the user has access to the product—it's turn on/off by the Stripe webhook
//     hasAccess: {
//       type: Boolean,
//       default: false,
//     },
//     // ADD THIS PROFILE FIELD
//     profile: {
//       typeOfProfile: String,
//       industry: String,
//       role: String,
//       experience: String,
//       expertise: String,
//       linkedinGoals: [String],
//       targetAudience: String,
//       professionalBrand: String,
//       influencers: String,
//       examplePosts: String,
//       uniquePerspective: String
//     }
//   },
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//   }
// );

// // add plugin that converts mongoose to json
// userSchema.plugin(toJSON);

// export default mongoose.models.User || mongoose.model("User", userSchema);


// models/User.js
import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// USER SCHEMA
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      private: true,
    },
    image: {
      type: String,
    },
    // Used in the Stripe webhook to identify the user in Stripe and later create Customer Portal or prefill user credit card details
    customerId: {
      type: String,
      validate(value) {
        return value.includes("cus_");
      },
    },
    // Used in the Stripe webhook. should match a plan in config.js file.
    priceId: {
      type: String,
      validate(value) {
        return value.includes("price_");
      },
    },
    // Used to determine if the user has access to the product—it's turn on/off by the Stripe webhook
    hasAccess: {
      type: Boolean,
      default: false,
    },
    // Updated profile field to include LinkedIn strategy data
    profile: {
      typeOfProfile: String,
      industry: String,
      role: String,
      experience: String,
      expertise: String,
      linkedinGoals: [String],
      targetAudience: String,
      professionalBrand: String,
      influencers: String,
      examplePosts: String,
      uniquePerspective: String,
      // New fields for LinkedIn strategy
      linkedinStrategy: {
        submissionId: String,
        answers: mongoose.Schema.Types.Mixed,
        foundation: String,
        calendar: String,
        contentCalendar: mongoose.Schema.Types.Mixed,
        savedAt: Date,
        // Array to store saved posts
        savedPosts: [
          {
            postIndex: Number,
            content: String,
            pillar: String,
            topic: String,
            approach: String,
            contentType: String,
            weekDay: String,
            savedAt: Date
          }
        ]
      }
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

export default mongoose.models.User || mongoose.model("User", userSchema);