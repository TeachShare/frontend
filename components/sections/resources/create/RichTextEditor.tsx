"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { Extension } from "@tiptap/core";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading2,
  Heading3,
  LucideIcon,
} from "lucide-react";

// 1. Declare the custom Font Size commands for TypeScript
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

// 2. Create the custom Font Size Extension
const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize: (fontSize) => ({ chain }) => {
        return chain().setMark("textStyle", { fontSize }).run();
      },
      unsetFontSize: () => ({ chain }) => {
        return chain().setMark("textStyle", { fontSize: null }).run();
      },
    };
  },
});

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: {
  onClick: () => void;
  isActive: boolean;
  icon: LucideIcon;
}) => (
  <button
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`p-1.5 rounded transition-colors ${
      isActive
        ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white"
        : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800"
    }`}
  >
    <Icon size={14} />
  </button>
);

const FontSizeSelector = ({ editor }: { editor: any }) => {
  const fontSizes = ["12px", "14px", "16px", "18px", "20px", "24px", "30px", "36px"];

  return (
    <select
      onChange={(e) => {
        const size = e.target.value;
        if (size) {
          editor.chain().focus().setFontSize(size).run();
        } else {
          editor.chain().focus().unsetFontSize().run();
        }
      }}
      value={editor.getAttributes("textStyle").fontSize || ""}
      className="h-7 px-1 text-xs bg-transparent border border-zinc-200 dark:border-zinc-700/60 rounded text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-400 cursor-pointer transition-colors"
    >
      <option value="">Size</option>
      {fontSizes.map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
  );
};

// 3. Create a simple Color Picker Component
const TextColorSelector = ({ editor }: { editor: any }) => {
  return (
    <div className="relative flex items-center justify-center w-7 h-7 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
      <input
        type="color"
        onInput={(event) => {
          editor.chain().focus().setColor((event.target as HTMLInputElement).value).run();
        }}
        value={editor.getAttributes('textStyle').color || '#000000'}
        className="w-5 h-5 p-0 border-0 rounded cursor-pointer bg-transparent overflow-hidden"
        title="Text Color"
      />
    </div>
  );
};

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export const RichTextEditor = ({ value, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit, 
      TextStyle, 
      FontSize,
      Color, 
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert min-h-[250px] w-full bg-transparent p-6 text-[13px] leading-relaxed text-zinc-900 dark:text-zinc-400 focus:outline-none max-w-none transition-colors duration-300 tiptap",
      },
    },
  });

  // Sync external value with editor content
  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden transition-colors duration-300">
      {editor && (
        <div className="flex items-center gap-1 p-2 border-b border-zinc-200 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900/30 transition-colors duration-300">
          
          <FontSizeSelector editor={editor} />
          <TextColorSelector editor={editor} />
          
          <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1" />
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            icon={Bold}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            icon={Italic}
          />
          
          <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1" />
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            icon={List}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            icon={ListOrdered}
          />
          
          <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1" />
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive("heading", { level: 2 })}
            icon={Heading2}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive("heading", { level: 3 })}
            icon={Heading3}
          />

          <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1" />
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            icon={Quote}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive("codeBlock")}
            icon={Code}
          />
        </div>
      )}
      <div onClick={() => editor?.commands.focus()} className="cursor-text">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};