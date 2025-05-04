// // File: app/api/save-temporary-submission/route.js
// import { NextResponse } from 'next/server';
// import connectMongo from '@/libs/mongoose'; // Your DB connection
// import TemporarySubmission from '@/models/TemporarySubmission'; // Your temporary model

// export async function POST(request) {
//   try {
//     // 1. Get data from the request body
//     const { id, answers } = await request.json();

//     if (!id || !answers) {
//       return NextResponse.json({ error: 'Missing submission ID or answers' }, { status: 400 });
//     }
//     console.log("TemporarySubmission import type:", typeof TemporarySubmission);

//     console.log(`API: [/api/save-temp] - Received submission ID: ${id}`);

//     // 2. Connect to DB
//     await connectMongo();
//     console.log("API: [/api/save-temp] - DB Connected.");

//     // 3. Create and save the new temporary submission document
//     const newSubmission = new TemporarySubmission({
//       _id: id, // Use the ID generated on the client as the document _id
//       submissionData: { answers }, // Store the answers object
//       createdAt: new Date() // createdAt is handled by schema default/TTL index
//     });

//     await newSubmission.save();
//     console.log(`API: [/api/save-temp] - Successfully saved submission ID: ${id}`);

//     // 4. Respond with success
//     return NextResponse.json({ success: true, submissionId: id }, { status: 201 }); // 201 Created

//   } catch (error) {
//     console.error(`API: [/api/save-temp] - Error saving submission:`, error);
//     // Check for potential duplicate key error if ID generation somehow clashes
//     if (error.code === 11000) { 
//          return NextResponse.json({ error: 'Submission ID conflict.' }, { status: 409 });
//     }
//     return NextResponse.json({ error: 'Failed to save submission data.' }, { status: 500 });
//   }
// }

// // export async function POST(request) {
// //     console.log("POST request received!");
// //     return Response.json({ message: "It worked!" });
// //   }

// app/api/save-temporary-submission/route.js
import { NextResponse } from 'next/server';
import connectMongo from '@/libs/mongoose';
import TemporarySubmissionModel from '@/models/TemporarySubmission';

export async function POST(request) {
  try {
    // 1. Get data from the request body
    const { id, answers } = await request.json();

    if (!id || !answers) {
      return NextResponse.json({ error: 'Missing submission ID or answers' }, { status: 400 });
    }

    // console.log(`API: [/api/save-temp] - Received submission ID: ${id}`);
    // console.log("TemporarySubmission type:", typeof TemporarySubmissionModel);

    // 2. Connect to DB
    await connectMongo();
    // console.log("API: [/api/save-temp] - DB Connected.");

    // 3. Create the document directly without using "new"
    try {
      // Try alternative approach if constructor isn't working
      const newSubmission = await TemporarySubmissionModel.create({
        _id: id,
        submissionData: { answers },
        createdAt: new Date()
      });

      // console.log(`API: [/api/save-temp] - Successfully saved submission ID: ${id}`);
      return NextResponse.json({ success: true, submissionId: id }, { status: 201 });
    } catch (modelError) {
      console.error(`API: [/api/save-temp] - Model error:`, modelError);
      
      // If that fails, try a more direct approach with the mongoose connection
      const conn = await connectMongo();
      const TempSubmissionDirect = conn.model('TemporarySubmission');
      
      await TempSubmissionDirect.create({
        _id: id,
        submissionData: { answers },
        createdAt: new Date()
      });
      
      // console.log(`API: [/api/save-temp] - Successfully saved submission ID: ${id} (direct method)`);
      return NextResponse.json({ success: true, submissionId: id }, { status: 201 });
    }
  } catch (error) {
    console.error(`API: [/api/save-temp] - Error saving submission:`, error);
    // Check for potential duplicate key error if ID generation somehow clashes
    if (error.code === 11000) { 
      return NextResponse.json({ error: 'Submission ID conflict.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to save submission data.' }, { status: 500 });
  }
}