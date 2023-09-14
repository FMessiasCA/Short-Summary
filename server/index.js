import cors from "cors";
import express from "express";

import { convert } from "./convert.js";
import { download } from "./download.js";
import { transcribe } from "./transcribe.js";
import { summarize } from "./summarize.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/summary/:id', async (req, res) => {
  try {
    await download(req.params.id);
    const audioConverted = await convert();
  
    const result = await transcribe(audioConverted);

    return res.json({ result });
  } catch (error) {
    console.log(error);
    return response.json({ error });
  }
});

app.post("/summary", async (req, response) => {
  try {
    const result = await summarize(req.body.text)
    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
});

app.listen(3333, () => {
  console.log("Server is running on port 3333")
});