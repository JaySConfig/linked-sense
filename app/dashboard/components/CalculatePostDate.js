"use client";

import { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
    
    
    const CalculatePostDate = (startDate, index, postsPerWeek) => {
        // [Keep the existing implementation...]
        let startDateObj = startDate;
        if (typeof startDate === 'string') {
          startDateObj = new Date(startDate);
        }
        if (!startDate || !(startDate instanceof Date) || isNaN(startDate)) return null;
        
        const weekIndex = Math.floor(index / postsPerWeek);
        const postWithinWeek = index % postsPerWeek;
        let weekStart = addDays(startDate, weekIndex * 7);
        
        let dayOffset = 0;
        
        switch(postsPerWeek) {
          case 2: // Mon, Thu
            dayOffset = postWithinWeek === 0 ? 0 : 3;
            break;
          case 3: // Mon, Wed, Fri
            dayOffset = postWithinWeek * 2; // 0, 2, 4
            break;
          case 4: // Mon, Tue, Thu, Fri
            dayOffset = postWithinWeek < 2 ? postWithinWeek : postWithinWeek + 1;
            break;
          case 5: // Mon through Fri
            dayOffset = postWithinWeek;
            break;
          default: // Fallback - evenly space within the week
            dayOffset = Math.floor(postWithinWeek * (5 / postsPerWeek));
        }
        
        return addDays(weekStart, dayOffset);
      };


export default CalculatePostDate;