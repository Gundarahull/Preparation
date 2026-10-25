import { createTool } from "@mastra/core/tools";
import { z } from 'zod';
import { randomUUID } from 'crypto';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Define a structured interface for the notes database array
interface NoteItem {
  title: string;
  content: string;
  noteid: string;
  createdAt: string;
}

const filePath = path.join(process.cwd(), 'src', 'data', 'notes.txt');

async function loadAndSaveFile(newNote: NoteItem): Promise<boolean> {
  try {
    let currentNotes: NoteItem[] = [];

    if (existsSync(filePath)) {
      const fileData = await fs.readFile(filePath, 'utf8');
      if (fileData.trim()) {
        currentNotes = JSON.parse(fileData) as NoteItem[];
      }
    } else {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
    }

    currentNotes.push(newNote);

    await fs.writeFile(filePath, JSON.stringify(currentNotes, null, 2), 'utf8');
    return true;

  } catch (error) {
    console.error("Failed to commit notes record update:", error);
    return false;
  }
}

export const writeTool = createTool({
  id: 'writingTool',
  description: 'Saving the notes safely into the system tracking files.',
  inputSchema: z.object({
    title: z.string().describe("Name for the note eg: Ticket, Bus passes"),
    content: z.string().describe("The descriptive block contents of the note body")
  }),
  outputSchema: z.object({
    success: z.boolean(),
    title: z.string(),
    content: z.string(),
    noteid: z.string(),
    error: z.string().optional()
  }),

  execute: async ({ title, content }) => {
    // Cast input fields cleanly based on your inputSchema requirements

    const noteUuid = randomUUID();
    const noteItem: NoteItem = {
      title,
      content,
      noteid: noteUuid,
      createdAt: new Date().toISOString(),
    };

    const isSaved = await loadAndSaveFile(noteItem);

    if (!isSaved) {
      return {
        success: false,
        title,
        content,
        noteid: "",
        error: "Failed to read or write database storage records."
      };
    }

    return {
      success: true,
      title,
      content,
      noteid: noteUuid,
      error: undefined
    };
  }
});
