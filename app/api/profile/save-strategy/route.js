
/// ---- //// gemini apparently this will work ---- 


// Working Code /////// //// ///// /// /// // // /

// api/profile/save-strategy/route.js (Corrected endDate Calculation)
// api/profile/save-strategy/route.js (Corrected endDate Calculation within Combined Logic)

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
// Ensure all needed date-fns functions are imported
import { addDays, getDay, startOfDay, isBefore, isAfter, parseISO, nextMonday, startOfWeek, isValid } from 'date-fns';
import mongoose from "mongoose";

// --- BACKEND IMPLEMENTATION of calculatePostDate ---
// Calculates the specific date for a post based on its index
const calculatePostDateBackend = (startDate, index, postsPerWeek) => {
    let startDateObj = startDate instanceof Date ? startDate : new Date(startDate);
    if (isNaN(startDateObj)) { console.error("Invalid start date in calc"); return null; }
    if (postsPerWeek <= 0) postsPerWeek = 5;
    const weekIndex = Math.floor(index / postsPerWeek);
    const postWithinWeek = index % postsPerWeek;
    let weekStart = addDays(startDateObj, weekIndex * 7);
    // Ensure week starts on Monday for calculation consistency
    if (getDay(weekStart) !== 1) {
        weekStart = startOfWeek(weekStart, { weekStartsOn: 1 });
    }
    let dayOffset = 0;
    switch(postsPerWeek) {
      case 1: dayOffset = 0; break; case 2: dayOffset = postWithinWeek === 0 ? 0 : 3; break;
      case 3: dayOffset = postWithinWeek * 2; break; case 4: dayOffset = postWithinWeek < 2 ? postWithinWeek : postWithinWeek + 1; break;
      case 5: dayOffset = postWithinWeek; break; default: dayOffset = Math.floor(postWithinWeek * (5 / postsPerWeek)); break;
    }
    const calculatedDate = addDays(weekStart, dayOffset);
    // console.log(`Calc Post Date: Start=${startDateObj.toISOString()}, Idx=${index}, PW=${postsPerWeek} -> ${calculatedDate.toISOString()}`); // Verbose log
    return calculatedDate;
};
// --- End calculatePostDateBackend ---

// addWeekdays removed as it's no longer used for endDate calculation

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const userId = session.user.id;
  console.log(`\n--- API /save-strategy: Request for user ${userId} ---`);

  try {
    const { submissionId, answers, foundation, calendar, contentCalendar } = await req.json();
    const isStrategyOnlySave = foundation && (!calendar || !contentCalendar);

    await connectMongo();
    const currentUser = await User.findById(userId);
    if (!currentUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Ensure profile structure exists
    if (!currentUser.profile) currentUser.profile = {};
    if (!currentUser.profile.linkedinStrategy) currentUser.profile.linkedinStrategy = {};
    if (!Array.isArray(currentUser.profile.linkedinStrategy.savedCalendars)) {
        currentUser.profile.linkedinStrategy.savedCalendars = [];
    }

    if (isStrategyOnlySave) {
      // Handle strategy-only save (from results page)
      console.log("API /save-strategy: Processing strategy-only save");
      currentUser.profile.linkedinStrategy = {
          foundation: foundation, answers: answers, submissionId: submissionId,
          savedAt: new Date(), savedCalendars: []
      };
      await currentUser.save();
      console.log("API /save-strategy: Strategy-only save complete.");
      return NextResponse.json({ success: true, message: "Strategy foundation saved!" });

    } else {
      // Handle calendar save (from profile page)
      console.log("API /save-strategy: Processing calendar save");
      if (!foundation || !calendar || !contentCalendar?.rows?.length) {
        return NextResponse.json({ error: "Incomplete calendar data received" }, { status: 400 });
      }
      const savedCalendars = currentUser.profile.linkedinStrategy.savedCalendars;
      const calendarRows = contentCalendar.rows;

      // --- Limit Check ---
      const CALENDAR_LIMIT = 3;
      if (savedCalendars.length >= CALENDAR_LIMIT) {
         return NextResponse.json({ error: `Calendar limit (${CALENDAR_LIMIT}) reached.` }, { status: 400 });
      }

      // --- Calculate Start Date ---
      let newStartDate;
      if (savedCalendars.length === 0) {
        const now = startOfDay(new Date());
        newStartDate = getDay(now) === 1 ? now : nextMonday(now);
        console.log("API /save-strategy: First calendar starting on:", newStartDate?.toISOString());
      } else {
        // Sort ASCENDING to get the last element (latest end date)
        const calendarsWithDates = savedCalendars.map(cal => ({ endDate: cal.endDate instanceof Date ? cal.endDate : new Date(cal.endDate) })).filter(d => isValid(d.endDate));
        if (calendarsWithDates.length === 0) throw new Error("No valid end dates in existing calendars");
        calendarsWithDates.sort((a, b) => a.endDate.getTime() - b.endDate.getTime());
        const latestEndDate = calendarsWithDates[calendarsWithDates.length - 1].endDate;
        console.log("API /save-strategy: Latest calendar end date:", latestEndDate?.toISOString());

        // Find next Monday STRICTLY AFTER latest end date
        newStartDate = nextMonday(latestEndDate);
        if (isBefore(newStartDate, latestEndDate) || startOfDay(newStartDate).getTime() === startOfDay(latestEndDate).getTime()) {
            newStartDate = addDays(newStartDate, 7);
        }
        console.log("API /save-strategy: New calendar will start on:", newStartDate?.toISOString());
      }

      // --- *** CORRECTED End Date Calculation *** ---
      const postsPerWeek = Math.ceil(calendarRows.length / 4); // Assuming 4 weeks
      const lastPostIndex = calendarRows.length - 1;
      console.log(`API /save-strategy: Calculating endDate: lastPostIndex=${lastPostIndex}, postsPerWeek=${postsPerWeek}`);
      // Use calculatePostDateBackend to find the date of the LAST post
      const newEndDate = calculatePostDateBackend(newStartDate, lastPostIndex, postsPerWeek);
      console.log(`API /save-strategy: Calculated newEndDate using calculatePostDateBackend:`, newEndDate?.toISOString());
      // --- *** End CORRECTED End Date Calculation *** ---

      if (!newStartDate || !newEndDate || isNaN(newStartDate) || isNaN(newEndDate)) {
        console.error("API /save-strategy: Invalid start or end date calculated", { newStartDate, newEndDate });
        throw new Error("Failed to calculate valid start or end date.");
      }

      // --- Overlap Check --- (Optional)
      // ...

      // Prepare the new calendar entry
      const newCalendarEntry = {
          calendar: calendar, contentCalendar: contentCalendar,
          startDate: newStartDate, endDate: newEndDate, // Use CORRECTED endDate
          posts: [], savedAt: new Date()
      };

      // Update strategy fields and push new calendar
      currentUser.profile.linkedinStrategy.foundation = foundation;
      currentUser.profile.linkedinStrategy.answers = answers;
      currentUser.profile.linkedinStrategy.submissionId = submissionId;
      currentUser.profile.linkedinStrategy.savedCalendars.push(newCalendarEntry);
      currentUser.profile.linkedinStrategy.savedAt = new Date();
      currentUser.markModified('profile.linkedinStrategy');

      console.log(`API /save-strategy: Attempting save with ${currentUser.profile.linkedinStrategy.savedCalendars.length} calendars`);
      await currentUser.save();
      console.log("API /save-strategy: Calendar save complete.");

      return NextResponse.json({ success: true, message: "Calendar saved successfully!" });
    }
  } catch (error) {
    console.error('API /save-strategy: Error:', error);
    return NextResponse.json({ error: error.message, details: error.stack }, { status: 500 });
  } finally {
      console.log(`--- API /save-strategy: END Request for user ${userId} ---\n`);
  }
}