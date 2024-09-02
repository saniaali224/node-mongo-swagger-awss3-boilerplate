import { GoogleGenerativeAI } from '@google/generative-ai';

const generateArticle = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt =
      req.body.prompt ||
      'Write an article on lebron james performance in this NBA league. only 2 sentences';

    const result = await model.generateContent(prompt);

    // Clean up the response text
    const refinedText = result.response
      .text()
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    console.log(refinedText);
    res.json({ article: refinedText });
  } catch (error) {
    console.error('Error generating article:', error);
    res
      .status(500)
      .json({ message: 'Error generating article', error: error.message });
  }
};
export default {
  generateArticle,
};
