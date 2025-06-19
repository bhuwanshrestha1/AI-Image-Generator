import fetch from "node-fetch";
import { v2 as cloudinary } from "cloudinary";
import { createError } from "../error.js";
import * as dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper: Upload a Buffer to Cloudinary using a stream
const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === "") {
      return next(createError(400, "Prompt is required"));
    }

    // Call Hugging Face API
    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (response.status === 202) {
      // Model is loading or processing, ask client to retry later
      return next(createError(503, "Model is loading, please try again shortly."));
    }

    if (!response.ok) {
      const errorText = await response.text();
      return next(createError(response.status, `HuggingFace API error: ${errorText}`));
    }

    // Get raw image data buffer from response
    const buffer = await response.buffer();

    // Upload image buffer to Cloudinary
    const uploadResult = await streamUpload(buffer);

    res.status(200).json({
      success: true,
      url: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("Image generation error:", error);
    next(createError(500, error.message || "Unknown error occurred"));
  }
};
