const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI('AIzaSyAXktjW59GQs6ppR4lDFFNqBc0KDvD0Y5w'); 
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

app.post('/generate-recipe', async (req, res) => {
    const { cuisine, ingredients, temperature } = req.body;

    const prompt = `Generate a recipe for ${cuisine} cuisine using the following ingredients: ${ingredients}.`;

    try {
        const result = await model.generateContent(prompt, {
            temperature,
            maxOutputTokens: 300,
        });

        res.json({ recipe: result.response.text });
    } catch (error) {
        console.error('Error generating recipe:', error.message);
        res.status(500).json({ error: 'Failed to generate the recipe.' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:3000`);
});
