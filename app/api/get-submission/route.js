// File: app/api/get-submission/route.js
import { NextResponse } from 'next/server';
import connectMongo from '@/libs/mongoose'; // Import your DB connection utility
import TemporarySubmission from '@/models/TemporarySubmission'; // Import your new temporary submission model

// Optional: If you need authentication later
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/libs/next-auth';

export async function GET(request) {
  // Optional: Add authentication check if needed
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  // Extract the 'id' query parameter from the request URL
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing submission ID' }, { status: 400 });
  }

  console.log(`API: [/api/get-submission] - Request received for ID: ${id}`);

  try {
    // Connect to the database using your utility
    await connectMongo();
    console.log("API: [/api/get-submission] - Database connected.");

    // Find the temporary submission document using the provided ID.
    // We use findById because your TemporarySubmission schema uses '_id: String'.
    // Using .lean() returns a plain JavaScript object, which is faster if you don't need Mongoose documents features.
    const submissionRecord = await TemporarySubmission.findById(id).lean();

    // Check if a record was found
    if (!submissionRecord) {
      console.log(`API: [/api/get-submission] - Submission ID not found: ${id}`);
      return NextResponse.json({ error: 'Submission not found or expired' }, { status: 404 });
    }

    // --- Optional: Delete after retrieval ---
    // If you want the submission data to be strictly one-time use,
    // you can delete it after successfully finding it.
    // Comment this out if you want the data to persist until the TTL expires.
    try {
       await TemporarySubmission.findByIdAndDelete(id);
       console.log(`API: [/api/get-submission] - Deleted temporary submission: ${id}`);
    } catch (deleteError) {
       console.error(`API: [/api/get-submission] - Failed to delete temporary submission ${id}:`, deleteError);
       // Usually okay to continue and return the data even if delete fails
    }
    // --- End Optional Delete ---


    // Return the actual submission data 
    // (Make sure 'submissionData' is the correct field name in your TemporarySubmission model)
    console.log(`API: [/api/get-submission] - Found data for ${id}. Returning submissionData.`);
    return NextResponse.json(submissionRecord.submissionData || {}, { status: 200 });

  } catch (error) {
    console.error(`API: [/api/get-submission] - Error processing request for ID ${id}:`, error);
    // Avoid sending detailed errors to the client in production
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}