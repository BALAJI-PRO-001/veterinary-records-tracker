import express, {NextFunction, Request, Response} from "express";
import adminRouter from "./routes/admin.route";
import pageRouter from "./routes/page.route";
import recordRouter from "./routes/record.route";
import superUserRouter from "./routes/superuser.route";
import cookieParser from "cookie-parser";
import { STATIC_FILES_PATH } from "./utils/constants";
import dotenv from "dotenv";
import { cpuUsage, memoryUsage } from "process";

const app = express();
dotenv.config(); 

app.use(express.json());
app.use(cookieParser());

let requestCount = 0;
let responseTime = 0;
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    responseTime += duration;
    requestCount ++;
  });
  next();
});

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/records", recordRouter);
app.use("/api/v1/super-user", superUserRouter);


app.get("/server-information", (req, res) => {
  res.status(200).json({
    requestCount: requestCount,
    responseTime: responseTime,
    memoryUsage: process.memoryUsage(),
    cpuUsage: process.cpuUsage(),
  });
});


app.use(express.static(STATIC_FILES_PATH));
app.use("/", pageRouter);


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = err.statusCode || 500;
  const message: string = err.message || "Internal server error.";
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message
  });
});



const PORT = process.env.PORT || 3000;


export {
  app, PORT
};