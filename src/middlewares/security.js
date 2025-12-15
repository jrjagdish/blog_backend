import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";


export const securityHeaders = helmet();

// Rate limiters
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5,
  message: { message: "Too many requests, try again later." },
});

export const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Too many requests, try again later." },
});
