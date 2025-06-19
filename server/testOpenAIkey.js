import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testAPIKey() {
  try {
    const response = await openai.models.list();
    console.log("API Key is valid! Models list:");
    console.log(response.data.map(model => model.id));
  } catch (error) {
    console.error("API Key validation failed:");
    console.error(error.response?.data || error.message || error);
  }
}

testAPIKey();
