const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "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";

app.post("/generate", async (req, res) => {
    const input = req.body.input;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: `Generate 5 short Instagram captions about ${input}`
                    }
                ]
            })
        });

        const data = await response.json();

        res.json({
            output: data.choices[0].message.content
        });

    } catch (error) {
        console.log(error);
        res.json({ error: "Server failed" });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});