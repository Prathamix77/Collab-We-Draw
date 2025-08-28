// import {
//   Request,
//   Response,
//   NextFunction,
//   RequestHandler,
//   request,
// } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { JWT_SECRET } from "@repo/auth/auth";

// declare global {
//   namespace Express {
//     interface Request {
//       userId?: string;
//     }
//   }
// }

// export function Middleware(req: Request, res: Response, next: NextFunction) {
//   const authHeader = req.headers;

//   const decoded = jwt.verify(authHeader as unknown as string, JWT_SECRET) as JwtPayload;
//   console.log(decoded);
  
//   if (!decoded.userId) {
//     res.status(403).json({
//       message: "Not valid user",
//     });

//     req.userId = decoded.userId;
//     next();
//   }

//   res.status(403).json({
//     message: "Not allowed",
//     token: authHeader,
//   });
// }
