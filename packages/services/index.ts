import cors from "cors";
import express, { Response } from "express";

const app = express();
const port = 2004;

app.use(cors());

app.get("/", (_, response: Response) => {
  response.send("Hi from express server 🥳");
});

app.listen(port, () =>
  console.log(`Listening on http://localhost:${port} 🚀🚀🚀`)
);
