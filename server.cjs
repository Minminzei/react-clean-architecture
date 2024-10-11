const dotenv = require("dotenv");
const express = require("express");
const OpenAI = require("openai");
const path = require("path");

dotenv.config();
const PORT = parseInt(process.env.PORT || "");
const HOST = process.env.HOST || "localhost";
const OPENAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY;

const app = express();
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.get("/users/:id", (req, res) => {
  res.json({
    id: req.params.id,
    name: "ゲスト",
    image: `http://${HOST}:${PORT}/user.png`,
  });
});
app.post("/translates", async (req, res) => {
  const { text } = req.body;
  const prompt = `次の文章を英訳してください。\n\n${text}`;
  const openai = new OpenAI({
    apiKey: OPENAI_SECRET_KEY,
  });
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });
    res.json({
      id: "1",
      text: response.choices[0].message.content?.trim() ?? text,
    });
  } catch {
    res.status(500).json({
      error: "Failed to translate the text",
    });
  }
});
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
