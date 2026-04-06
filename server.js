const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
    const input = req.body.input;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [
                    { role: "user", content: `Generate 5 captions about ${input}` }
                ]
            })
        });

        const data = await response.json();

        if (!data.choices) {
            return res.json({
                error: "API Error: " + (data.error?.message || "Unknown")
            });
        }

        res.json({
            output: data.choices[0].message.content
        });

    } catch (error) {
        console.log(error);
        res.json({ error: "Server crashed" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});