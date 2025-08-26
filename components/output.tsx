"use client";
import { useState } from "react";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "./ai-elements/prompt-input";
import { Conversation, ConversationContent } from "./ai-elements/conversation";
import { Message, MessageContent } from "./ai-elements/message";
import { Response } from "./ai-elements/response";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  status?: "sending" | "sent" | "error";
}

const Output = () => {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: chatInput }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let fullResponse = "";

    //assistant message placeholder
    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: fullResponse,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMessage]);

    while (true) {
      const { done, value } = (await reader?.read()) ?? {};
      if (done) break;

      const chunk = decoder.decode(value);

      const lines = chunk.split("\n");
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = JSON.parse(line.slice(6));
          fullResponse += data.content;

          // Update the streaming message in real-time
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, content: fullResponse }
                : msg
            )
          );
        }
      }
    }
  };

  return (
    <div className="h-full flex flex-col gap-2 pb-4">
      <Conversation className="grow overflow-y-auto h-full no-scrollbar">
        <ConversationContent>
          {messages.map((message) => (
            <Message key={message.id} from={message.role}>
              <MessageContent>
                <Response>{message.content}</Response>
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
      </Conversation>

      <PromptInput onSubmit={handleSend} className="mt-4 relative">
        <PromptInputTextarea
          onChange={(e) => {
            setChatInput(e.target.value);
          }}
          value={chatInput}
        />
        <PromptInputToolbar>
          <PromptInputSubmit
            className="absolute right-4 top-1/2 -translate-y-1/2"
            disabled={false}
            status={"ready"}
          />
        </PromptInputToolbar>
      </PromptInput>
    </div>
  );
};

export default Output;
