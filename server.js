app.post("/generate", async (req, res) => {
    const input = req.body.input;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.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}`,
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

        console.log("FULL RESPONSE:", JSON.stringify(data, null, 2));

        if (!data.choices) {
            return res.json({
                error: "API Error: " + (data.error?.message || "Unknown")
            });
        }

        res.json({
            output: data.choices[0].message.content
        });

    } catch (error) {
        console.log("CRASH ERROR:", error);
        res.json({ error: "Server crashed" });
    }
});