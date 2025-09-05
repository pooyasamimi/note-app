"use client";

import {
  useEditor,
  EditorContent,
  useEditorState,
  type JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Highlight from '@tiptap/extension-highlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { TableKit } from '@tiptap/extension-table'
import Heading from '@tiptap/extension-heading'


import { createLowlight, all } from 'lowlight'
import 'highlight.js/styles/monokai.css'

import Text from "@tiptap/extension-text";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Strikethrough,
  Code,
  Link as LinkIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignRight,
  AlignJustify,
  Link2Off,
  ChevronDown,
  Superscript as SuperscriptIcon,
  Subscript as SubscriptIcon,
  Highlighter,
  Minus,
  Grid3X3,
} from "lucide-react";
import { updateNote } from "@/server/notes";
import { useState } from "react";


interface RichTextEditorProps {
  content?: JSONContent[];
  noteId?: string;
}

const RichTextEditor = ({ content, noteId }: RichTextEditorProps) => {
  const [activeHeading, setActiveHeading] = useState("normal");


  const lowlight = createLowlight(all)



  const editor = useEditor({
    extensions: [
      StarterKit,
      Paragraph.configure({
        HTMLAttributes: {
          dir: "auto",
        }
      }),
      Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: {
          dir: "auto",
        }
      }),
      Document,
      Text,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
      Subscript,
      Superscript,
      Highlight.configure({
        HTMLAttributes: {
          style: 'background-color: #e6472c;', 
        },
      }),
      CodeBlockLowlight.configure({ lowlight }),
      HorizontalRule,
      TableKit.configure({
        table: {
          resizable: true,
          HTMLAttributes: {
            class: "table-auto border-collapse border border-gray-300 w-[300px] mx-auto"
          }
        }

      }),
    ],
    immediatelyRender: false,
    autofocus: true,
    editable: true,
    injectCSS: false,
    onUpdate: ({ editor }) => {
      if (noteId) {
        const content = editor.getJSON();
        updateNote(noteId, { content });
      }
    },
    content: content ?? {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Getting started" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Welcome to the " },
            {
              type: "text",
              text: "Simple Editor",
              marks: [{ type: "italic" }],
            },
            { type: "text", text: " template! This template integrates " },
            { type: "text", text: "open source", marks: [{ type: "bold" }] },
            {
              type: "text",
              text: " UI components and Tiptap extensions licensed under ",
            },
            { type: "text", text: "MIT", marks: [{ type: "bold" }] },
            { type: "text", text: "." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Integrate it by following the " },
            {
              type: "text",
              text: "Tiptap UI Components docs",
              marks: [{ type: "code" }],
            },
            { type: "text", text: " or using our CLI tool." },
          ],
        },
        {
          type: "codeBlock",
          content: [{ type: "text", text: "npx @tiptap/cli init" }],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Features" }],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "A fully responsive rich text editor with built-in support for common formatting and layout tools. Type markdown ",
                },
                { type: "text", text: "**", marks: [{ type: "bold" }] },
                { type: "text", text: " or use keyboard shortcuts " },
                { type: "text", text: "⌘+B", marks: [{ type: "code" }] },
                { type: "text", text: " for most all common markdown marks." },
              ],
            },
          ],
        },
      ],
    },
  });

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor) return {};
      return {
        isBold: ctx.editor?.isActive("bold"),
        canBold: ctx.editor?.can().chain().focus().toggleBold().run(),
        isItalic: ctx.editor?.isActive("italic"),
        canItalic: ctx.editor?.can().chain().focus().toggleItalic().run(),
        isStrike: ctx.editor?.isActive("strike"),
        canStrike: ctx.editor?.can().chain().focus().toggleStrike().run(),
        isCode: ctx.editor?.isActive("code"),
        canCode: ctx.editor?.can().chain().focus().toggleCode().run(),
        isParagraph: ctx.editor?.isActive("paragraph"),
        isHeading1: ctx.editor?.isActive("heading", { level: 1 }),
        isHeading2: ctx.editor?.isActive("heading", { level: 2 }),
        isHeading3: ctx.editor?.isActive("heading", { level: 3 }),
        isBulletList: ctx.editor?.isActive("bulletList"),
        isOrderedList: ctx.editor?.isActive("orderedList"),
        isCodeBlock: ctx.editor?.isActive("codeBlock"),
        isBlockquote: ctx.editor?.isActive("blockquote"),
        canUndo: ctx.editor?.can().chain().focus().undo().run(),
        canRedo: ctx.editor?.can().chain().focus().redo().run(),
      };
    },
  });

  console.log(editor?.isActive("heading", { level: 2 }));


  const getActiveHeading = () => {
    if (editor?.isActive("heading", { level: 1 })) return "H1";
    if (editor?.isActive("heading", { level: 2 })) return "H2";
    if (editor?.isActive("heading", { level: 3 })) return "H3";
    if (editor?.isActive("paragraph")) return "Paragraph";
    return "Normal";
  };


  return (
    <div className="w-7xl min-w-7xl resize-x bg-card text-card-foreground rounded-lg overflow-hidden border">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-muted/50 border-b">
        {/* Undo/Redo */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editorState?.canUndo}
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editorState?.canRedo}
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <Redo className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Heading Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-accent gap-1"
            >
              {getActiveHeading()}
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-popover border">
            <DropdownMenuItem
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Heading 1
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Heading 2
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Heading 3
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor?.chain().focus().setParagraph().run()}
              className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
            >

              Paragraph
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Lists */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}

          className={`size-8 p-0 hover:bg-accent ${editorState?.isBulletList
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
            }`}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`size-8 p-0 hover:bg-accent ${editorState?.isOrderedList
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
            }`}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Text Formatting */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editorState?.canBold}
          className={`size-8 p-0 hover:bg-accent ${editorState?.isBold
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
            }`}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editorState?.canItalic}
          className={`size-8 p-0 hover:bg-accent ${editorState?.isItalic
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
            }`}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          disabled={!editorState?.canStrike}
          className={`size-8 p-0 hover:bg-accent ${editorState?.isStrike
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
            }`}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleHighlight().run()}
          className={`size-8 p-0 hover:bg-accent ${editorState?.isStrike
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
            }`}
        >
          <Highlighter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          disabled={!editorState?.canCode}
          className={`size-8 p-0 hover:bg-accent ${editorState?.isCode
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
            }`}
        >
          <Code className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Additional Tools */}
        <Button
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) {
              editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
            }
          }}
          variant="ghost"
          size="sm"
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().unsetLink().run()}
          disabled={!editor?.isActive("link")}
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <Link2Off className="h-4 w-4" />
        </Button>

        <Button
          onClick={() => editor?.chain().focus().toggleSuperscript().run()}
          variant="ghost"
          size="sm"
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <SuperscriptIcon className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor?.chain().focus().toggleSubscript().run()}
          variant="ghost"
          size="sm"
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <SubscriptIcon className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Alignment */}
        <Button
          onClick={() => editor?.chain().focus().setTextAlign('left').run()}
          variant="ghost"
          size="sm"
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor?.chain().focus().setTextAlign('right').run()}
          variant="ghost"
          size="sm"
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor?.chain().focus().setTextAlign('justify').run()}

          variant="ghost"
          size="sm"
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <AlignJustify className="h-4 w-4" />
        </Button>


        {/* <div className="flex-1" /> */}

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}

          variant="ghost"
          size="sm"
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}

          variant="ghost"
          size="sm"
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <Grid3X3 className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-accent gap-1"
            >
              Table Setting
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-popover border">
            <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => editor?.chain().focus().addColumnBefore().run()}>Add column before</DropdownMenuItem>
            <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => editor?.chain().focus().addColumnAfter().run()}>Add column after</DropdownMenuItem>
            <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => editor?.chain().focus().deleteColumn().run()}>Delete column</DropdownMenuItem>
            <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => editor?.chain().focus().addRowBefore().run()}>Add row before</DropdownMenuItem>
            <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => editor?.chain().focus().addRowAfter().run()}>Add row after</DropdownMenuItem>
            <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => editor?.chain().focus().deleteRow().run()}>Delete row</DropdownMenuItem>
            <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => editor?.chain().focus().deleteTable().run()}>Delete table</DropdownMenuItem>
            <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => editor?.chain().focus().mergeCells().run()}>Merge cells</DropdownMenuItem>
            <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => editor?.chain().focus().splitCell().run()}>Split cell</DropdownMenuItem>
            <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => editor?.chain().focus().toggleHeaderColumn().run()}>Toggle header column</DropdownMenuItem>
            <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => editor?.chain().focus().toggleHeaderRow().run()}>Toggle header row</DropdownMenuItem>
            <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => editor?.chain().focus().toggleHeaderCell().run()}>Toggle header cell</DropdownMenuItem>
            <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => editor?.chain().focus().mergeOrSplit().run()}>Merge or split</DropdownMenuItem>
            <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => editor?.chain().focus().setCellAttribute('colspan', 2).run()}>
              Set cell attribute
            </DropdownMenuItem>
            <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => editor?.chain().focus().fixTables().run()}>Fix tables</DropdownMenuItem>
            <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => editor?.chain().focus().goToNextCell().run()}>Go to next cell</DropdownMenuItem>
            <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => editor?.chain().focus().goToPreviousCell().run()}>Go to previous cell</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <div className="w-px h-6 bg-border mx-1" /> */}

        <Button
          onClick={() => editor?.chain().focus().insertContent("🔥").run()}
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent bg-red-50/15"
        >
          🔥
        </Button>
        <Button
          onClick={() => editor?.chain().focus().insertContent("😃").run()}
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent bg-red-50/15"
        >
          😃
        </Button>
        <Button
          onClick={() => editor?.chain().focus().insertContent("😺").run()}
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent bg-red-50/15"
        >
          😺
        </Button>
        <Button
          onClick={() => editor?.chain().focus().insertContent("🤯").run()}
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent bg-red-50/15"
        >
          🤯
        </Button>
        <Button
          onClick={() => editor?.chain().focus().insertContent("✌").run()}
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent bg-red-50/15"
        >
          ✌
        </Button>
        <Button
          onClick={() => editor?.chain().focus().insertContent("💜").run()}
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent bg-red-50/15"
        >
          💜
        </Button>
        <Button
          onClick={() => editor?.chain().focus().insertContent("🌵").run()}
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent bg-red-50/15"
        >
          🌵
        </Button>
        <Button
          onClick={() => editor?.chain().focus().insertContent("😎").run()}
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent bg-red-50/15"
        >
          😎
        </Button>
        <Button
          onClick={() => editor?.chain().focus().insertContent("😍").run()}
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent bg-red-50/15"
        >
          😍
        </Button>


      </div>

      {/* Editor Content */}
      <div className="min-h-96 p-6 bg-card">
        <EditorContent

          editor={editor}
          className="prose prose-neutral dark:prose-invert max-w-none focus:outline-none [&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:min-h-96 [&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mb-4 [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mb-3 [&_.ProseMirror_p]:mb-4 [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-border [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_pre]:bg-muted [&_.ProseMirror_pre]:p-4 [&_.ProseMirror_pre]:rounded [&_.ProseMirror_pre]:overflow-x-auto [&_.ProseMirror_code]:bg-muted [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:rounded"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;