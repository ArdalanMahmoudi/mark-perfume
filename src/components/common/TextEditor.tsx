"use client";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p className="text-muted-foreground">loading editor...</p>,
});

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

function TextEditor({ value, onChange }: TextEditorProps) {
  return (
    <ReactQuill
    className="[&_.ql-editor]:min-h-52 [&_.ql-editor]:text-right!"
      theme="snow"
      value={value}
      onChange={onChange}
      modules={{
        toolbar: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["clean"],
          ["rtl"]
        ],
      }}
    />
  );
}

export default TextEditor;
