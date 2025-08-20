import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return new Response("Missing file", { status: 400 });
  }

  try {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const filePath = path.join(uploadsDir, file.name);
    const buffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));

    const loader = new PDFLoader(filePath);

    const docs = await loader.load();

    const embeddings = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY,
      model: "text-embedding-3-large",
    });

    //create vector store from documents
    await QdrantVectorStore.fromDocuments(docs, embeddings, {
      url: process.env.QDRANT_URL,
      collectionName: "askify",
    });

    console.log("Vector store created successfully");

    return NextResponse.json({
      message: "File uploaded and processed successfully",
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return new Response("Error processing file", { status: 500 });
  }
}
