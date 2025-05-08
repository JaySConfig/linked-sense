// libs/rate-limiters.js
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Create different rate limiters for different types of endpoints
export const rateLimiters = {
  // For regular API endpoints
  standard: new RateLimiterMemory({
    points: 15,        // 15 requests
    duration: 60,      // per minute
    blockDuration: 300 // Block for 5 minutes if exceeded
  }),
  
  // For resource-intensive operations (like AI generations)
  intensive: new RateLimiterMemory({
    points: 5,          // 5 requests
    duration: 300,      // per 5 minutes
    blockDuration: 600  // Block for 10 minutes if exceeded
  }),
  
  // For very sensitive operations (like payment processing)
  sensitive: new RateLimiterMemory({
    points: 3,          // 3 requests
    duration: 300,      // per 5 minutes
    blockDuration: 900  // Block for 15 minutes if exceeded
  }),
  
  // For less intensive read operations
  read: new RateLimiterMemory({
    points: 30,         // 30 requests
    duration: 60,       // per minute
    blockDuration: 300  // Block for 5 minutes if exceeded
  })
};

/**
 * Check if a request is rate limited
 * @param {string} identifier - The identifier to rate limit by (IP, user ID, etc.)
 * @param {string} limiterType - The type of limiter to use
 * @returns {Promise<Object>} Result object with rate limit status
 */
export async function checkRateLimit(identifier, limiterType = 'standard') {
  const limiter = rateLimiters[limiterType] || rateLimiters.standard;
  
  try {
    await limiter.consume(identifier);
    return { 
      limited: false 
    };
  } catch (rateLimiterRes) {
    const retryAfter = Math.ceil(rateLimiterRes.msBeforeNext / 1000);
    return { 
      limited: true,
      retryAfter
    };
  }
}