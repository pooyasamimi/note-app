"use server";

import { db } from "@/db/drizzle";
import { InsertNote, notes } from "@/db/schema";
import { eq } from "drizzle-orm";

export const createNote = async (values: InsertNote) => {
  try {
    await db.insert(notes).values(values);
    return { success: true, message: "نوت با موفقیت ایجاد شد" };
  } catch {
    return { success: false, message: "ایجاد دفترچه موفقیت‌آمیز نبود" };
  }
};

export const getNoteById = async (id: string) => {
  try {
    const note = await db.query.notes.findFirst({
      where: eq(notes.id, id),
      with: {
        notebook: true,
      },
    });

    return { success: true, note };
  } catch {
    return { success: false, message: "دریافت دفترچه موفقیت‌آمیز نبود" };
  }
};

export const updateNote = async (id: string, values: Partial<InsertNote>) => {
  try {
    await db.update(notes).set(values).where(eq(notes.id, id));
    return { success: true, message: "دفترچه با موفقیت به‌روزرسانی شد" };
  } catch {
    return { success: false, message: "به‌روزرسانی دفترچه موفقیت‌آمیز نبود" };
  }
};

export const deleteNote = async (id: string) => {
  try {
    await db.delete(notes).where(eq(notes.id, id));
    return { success: true, message: "دفترچه با موفقیت حذف شد" };
  } catch {
    return { success: false, message: "حذف دفترچه موفقیت‌آمیز نبود" };
  }
};
