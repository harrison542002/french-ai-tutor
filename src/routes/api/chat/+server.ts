import { json, type RequestHandler } from "@sveltejs/kit";
import { OpenAI } from "openai";
import { SECRET_API_KEY } from "$env/static/private";

const openai = new OpenAI({
  apiKey: SECRET_API_KEY,
});

/**
 * This is the main API that is used to get response from OpenAPI.
 */
export const POST: RequestHandler = async ({ request }) => {
  const { prompt } = await request.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an expert French language teacher and I am a student. Please respond me in Markdown.",
        },
        { role: "user", content: prompt },
      ],
      stream: true,
    });

    // Create a stream to send the data to the client in chunks
    const readableStream = new ReadableStream({
      start(controller) {
        (async () => {
          try {
            // Read and process the stream
            for await (const chunk of completion) {
              const [choice] = chunk.choices;
              const { content } = choice.delta;

              // If content exists, write it to the stream
              if (content) {
                controller.enqueue(content);
              }
            }
            controller.close(); // End the stream once all data is sent
          } catch (error) {
            controller.error(error); // Handle any error during streaming
          }
        })();
      },
    });

    // Return the streaming response to the client
    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    return json(
      { error: "Failed to get response from OpenAI" },
      { status: 500 }
    );
  }
};
