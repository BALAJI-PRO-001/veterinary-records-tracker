import express, {NextFunction, Request, Response} from "express";
import adminRouter from "./routes/admin.route";
import dotenv from "dotenv";

const app = express();
dotenv.config(); 

app.use(express.json());

app.use("/api/v1", adminRouter);



app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = err.statusCode || 500;
  const message: string = err.message || "Internal server error.";
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message
  });
});



const HOST = process.env.HOST || "localhost";
const PROTOCOL = process.env.PROTOCOL || "http";
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
  console.log("URL: " + `${PROTOCOL}://${HOST}:${PORT}/` )
});