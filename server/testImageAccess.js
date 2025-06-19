// testImageAccess.js
import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function testImageGenerationAccess() {
  try {
    const response = await openai.images.generate({
      model: "dall-e-2", // You can also try "dall-e-3" if you think it's available
      prompt: "a futuristic city with flying cars",
      n: 1,
      size: "512x512",
    });
    console.log("✅ Image generation is enabled!");
    console.log(response);
  } catch (error) {
    console.error("❌ Image generation failed:");
    console.error(JSON.stringify(error?.error || error?.response?.data || error.message, null, 2));
  }
}

testImageGenerationAccess();
