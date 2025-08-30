import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/auth/auth";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function Middleware(req: Request, res: Response, next: NextFunction) {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;
    
    // Check if authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header missing"
      });
    }
    
    // Verify the token directly (no "Bearer " prefix expected)
    const decoded = jwt.verify(authHeader, JWT_SECRET) as JwtPayload;
    
    // Check if the token contains a userId
    if (!decoded.userId) {
      return res.status(403).json({
        message: "Token does not contain user ID"
      });
    }
    
    // Attach userId to the request object
    req.userId = decoded.userId;
    
    // Continue to the next middleware/route handler
    next();
    
  } catch (error) {
    // Handle specific JWT errors
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Token expired"
      });
    }
    
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Invalid token"
      });
    }
    
    // Handle any other errors
    return res.status(500).json({
      message: "Internal server error during authentication"
    });
  }
}