import chalk from 'chalk';
import Groq from 'groq-sdk';
import { prompt } from '../prompt.js';
import dotenv from 'dotenv';
dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function getGroqChatCompletion(
  fileContent,
  targetLang,
  providerModel
) {
  try {
    if (!GROQ_API_KEY) {
      throw new Error(
        'GROQ API key not found. Please set the GROQ_API_KEY environment variable in .env.'
      );
    }
    const groq = new Groq({ apiKey: GROQ_API_KEY });

    return groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt(fileContent, targetLang),
        },
      ],
      model: providerModel || 'llama3-8b-8192',
      temperature: 0.2, // value between 0 and 2. the lower is more deterministic, higher is more creative and random
    });
  } catch (err) {
    console.error(chalk.red('Error connecting to GROQ:', err.message));
    process.exit(1);
  }
}
