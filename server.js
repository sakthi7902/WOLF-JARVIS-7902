
import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json({ limit: "10kb" }));
app.use(express.static("."));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        reply: "Please enter a message."
      });
    }

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: message,
      config: {
        systemInstruction:
          "You are WOLF JARVIS AI. Reply in Tamil or English according to the user's language."
      }
    });

    res.json({ reply: result.text });

  } catch (error) {
    console.error("Gemini error:", error.message);
    res.status(500).json({
      reply: "JARVIS connection error. Please try again."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("WOLF JARVIS WEBSITE ONLINE");
});


