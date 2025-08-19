"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { FileText, Link } from "lucide-react";

const ContextInput = () => {
  const [context, setContext] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileUploadHandler = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <Textarea
        className="resize-none h-full"
        value={context}
        onChange={(e) => setContext(e.target.value)}
        placeholder="Enter context here..."
      />

      {/* add source - attach docs or website url */}
      <div>
        <p>Add source</p>

        <div className="flex items-center gap-3">
          <div>
            <Button
              className="cursor-pointer flex gap-2 bg-slate-700 items-center"
              onClick={fileUploadHandler}
            >
              <FileText className="mr-2" />
              <span>Upload document</span>
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt,.csv"
              placeholder="Enter URL or document name"
              className="hidden"
            />
          </div>
          <div>
            <Button
              className="cursor-pointer flex gap-2 bg-slate-700 items-center"
              onClick={fileUploadHandler}
            >
              <Link className="mr-2" />
              <span>Upload link</span>
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt,.csv"
              placeholder="Enter URL or document name"
              className="hidden"
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="text-lg font-family-roboto py-6 bg-blue-500 "
      >
        Submit
      </Button>
    </div>
  );
};

export default ContextInput;
