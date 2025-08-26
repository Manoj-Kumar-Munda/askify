import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const { message } = await req.json();
    const embeddings = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY,
      model: "text-embedding-3-large",
    });

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: process.env.QDRANT_URL,
        collectionName: "askify",
      }
    );

    const vectorRetriever = vectorStore.asRetriever({
      k: 3,
    });

    const relevantChunks = await vectorRetriever.invoke(message);

    const SYSTEM_PROMPT = `You are a helpful assistant. Use the following context to answer the user's question.\n\nContext:\n${relevantChunks.join(
      "\n"
    )}\n\nUser's question:\n${message}\n\nAnswer:`;

    const stream = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: message,
        },
      ],
      stream: true,
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0].delta.content ?? "";
          if (content) {
            const text = encoder.encode(
              `data: ${JSON.stringify({ content })}\n\n`
            );
            controller.enqueue(text);
          }
        }

        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error parsing request JSON:", error);
    return new Response("Error processing request", { status: 500 });
  }
}
