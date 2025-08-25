"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { FileText, Link } from "lucide-react";
import { Input } from "@/components/ui/input";

const ContextInput = () => {
  const [context, setContext] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileUploadHandler = () => {
    fileInputRef.current?.click();
  };

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/context/upload", {
      method: "POST",
      body: formData,
    });

    console.log(response);
    

    if (!response.ok) {
      throw new Error("File upload failed");
    }

    return response.json();
  };

  useEffect(() => {
    if (file) {
      uploadFile(file)
        .then((data) => {
          console.log("File uploaded successfully:", data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  }, [file]);

  return (
    <div className="h-full flex flex-col gap-4 font-family-roboto">
      <Textarea
        className="resize-none h-1/4 focus:outline-none"
        value={context}
        onChange={(e) => setContext(e.target.value)}
        placeholder="Enter context here..."
      />

      {/* add source - attach docs or website url */}
      <div>
        <p className="">Add source</p>

        <div className="flex items-center gap-3">
          <div>
            <Button
              className="cursor-pointer flex gap-2 bg-slate-700 items-center"
              onClick={fileUploadHandler}
            >
              <FileText className="mr-1" />
              <span>Upload document</span>
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt,.csv"
              placeholder="Pick a document"
              className="hidden"
            />
          </div>
          <div>
            <Button
              className="cursor-pointer flex gap-2 bg-slate-700 items-center"
              onClick={fileUploadHandler}
            >
              <Link className="mr-1" />
              <span>Upload link</span>
            </Button>
            <Input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt,.csv"
              placeholder="Enter URL or document name"
              className="hidden"
              onChange={fileChangeHandler}
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="font-family-roboto py-4 bg-neutral-700 text-white">
        Submit
      </Button>
    </div>
  );
};

export default ContextInput;
