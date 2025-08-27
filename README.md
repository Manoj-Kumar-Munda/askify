# RAG Chatbot Application  

This project is a Retrieval-Augmented Generation (RAG) chatbot built with **Next.js**, **OpenAI models**, and **QdrantDB**.  
The application allows users to provide context to the chatbot in three different ways:  

1. Enter text in a textarea  
2. Upload a document  
3. Provide a link  

Relevant information is retrieved from QdrantDB (using vector embeddings) and combined with the user’s query before being passed to the OpenAI model. The interface is built with **Vercel AI Elements**, a collection of pre-built chat components based on **shadcn/ui**.  

---

## Features  

- Context creation via text, document upload, or URL  
- Vector storage and retrieval with QdrantDB  
- Embeddings and response generation with OpenAI API  
- Modern chat interface built with Next.js and shadcn/ui components  

---

## Tech Stack  

- **Framework**: Next.js  
- **UI Components**: Vercel AI Elements (built on shadcn/ui)  
- **Vector Database**: QdrantDB  
- **LLM & Embeddings**: OpenAI API  

## Configure Environment Variables

Create a `.env.local` file in the root directory with the following:
```
  OPENAI_API_KEY=your_openai_api_key
  QDRANT_URL=http://localhost:6333
```

## Create docker-compose.yml for Qdrant

In the root directory, create a `docker-compose.yml` file with the following content:

```
  services:
  qdrant:
    image: qdrant/qdrant
    ports:
      - "6333:6333"
```

Make sure you have docker installed, then start Qdrant:

```
  docker-compose up -d
```
