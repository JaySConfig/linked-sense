// File: models/TemporarySubmission.js 
import mongoose from 'mongoose';

const temporarySubmissionSchema = new mongoose.Schema({
  // Use a field named 'id' or rely on default '_id' but ensure it matches 
  // the unique ID generated during form submission
  _id: { 
    type: String, 
    required: true,
  },
  // Field to store the actual answers object
  submissionData: { 
    type: mongoose.Schema.Types.Mixed, // Store the { answers: {...} } object
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // --- IMPORTANT: Add TTL Index for automatic cleanup ---
    // This tells MongoDB to automatically delete documents after 1 hour (3600 seconds)
    // Create this index in your MongoDB shell or Compass:
    // db.temporarysubmissions.createIndex( { "createdAt": 1 }, { expireAfterSeconds: 3600 } )
    index: { expires: '1h' }, // Mongoose syntax for TTL index (needs index created in DB too)
  },
  // Optional: Link to user if they are logged in during submission
  // userId: { type: String } 
});

// Create the model explicitly
const TemporarySubmission = 
  mongoose.models.TemporarySubmission || 
  mongoose.model('TemporarySubmission', temporarySubmissionSchema);

// Export the model, ensuring it's not re-defined during hot-reloads
export default mongoose.models.TemporarySubmission || mongoose.model('TemporarySubmission', temporarySubmissionSchema);