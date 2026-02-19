import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border rounded shadow-sm">
      {/* 🔥 TOOLBAR (Summernote Style) */}
      <div className="border-bottom bg-light p-2 d-flex flex-wrap gap-2">
        {/* Heading */}
        <select
          className="form-select form-select-sm w-auto"
          onChange={(e) => {
            const level = Number(e.target.value);
            if (level === 0) {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level }).run();
            }
          }}
        >
          <option value="0">Normal</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>

        {/* Bold */}
        <button
          type="button"
          className={`btn btn-sm ${
            editor.isActive("bold") ? "btn-success" : "btn-outline-secondary"
          }`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <b>B</b>
        </button>

        {/* Italic */}
        <button
          type="button"
          className={`btn btn-sm ${
            editor.isActive("italic") ? "btn-success" : "btn-outline-secondary"
          }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <i>I</i>
        </button>

        {/* Underline */}
        <button
          type="button"
          className={`btn btn-sm ${
            editor.isActive("underline")
              ? "btn-success"
              : "btn-outline-secondary"
          }`}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <u>U</u>
        </button>

        {/* Bullet List */}
        <button
          type="button"
          className={`btn btn-sm ${
            editor.isActive("bulletList")
              ? "btn-success"
              : "btn-outline-secondary"
          }`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </button>

        {/* Number List */}
        <button
          type="button"
          className={`btn btn-sm ${
            editor.isActive("orderedList")
              ? "btn-success"
              : "btn-outline-secondary"
          }`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </button>

        {/* Align */}
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          Left
        </button>

        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          Center
        </button>

        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          Right
        </button>

        {/* Clear */}
        <button
          type="button"
          className="btn btn-sm btn-outline-danger ms-auto"
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
        >
          Clear
        </button>
      </div>

      {/* ✍️ EDITOR AREA */}
      <div className="p-3" style={{ minHeight: 220 }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
