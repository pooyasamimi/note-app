"use server";

import { db } from "@/db/drizzle";
import { InsertNotebook, notebooks } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export const createNotebook = async (values: InsertNotebook) => {
  try {
    await db.insert(notebooks).values(values);
    return { success: true, message: "دفترچه با موفقیت ایجاد شد" };
  } catch {
    return { success: false, message: "ایجاد دفترچه موفقیت‌آمیز نبود" };
  }
};

export const getNotebooks = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userId = session?.user?.id;

    if (!userId) {
      return { success: false, message: "کاربر یافت نشد" };
    }

    const notebooksByUser = await db.query.notebooks.findMany({
      where: eq(notebooks.userId, userId),
      with: {
        notes: true,
      },
    });

    return { success: true, notebooks: notebooksByUser };
  } catch {
    return { success: false, message: "دریافت دفترچه‌ها موفقیت‌آمیز نبود" };
  }
};

export const getNotebookById = async (id: string) => {
  try {
    const notebook = await db.query.notebooks.findFirst({
      where: eq(notebooks.id, id),
      with: {
        notes: true,
      },
    });

    return { success: true, notebook };
  } catch {
    return { success: false, message: "دریافت دفترچه موفقیت‌آمیز نبود" };
  }
};

export const updateNotebook = async (id: string, values: InsertNotebook) => {
  try {
    await db.update(notebooks).set(values).where(eq(notebooks.id, id));
    return { success: true, message: "دفترچه با موفقیت به‌روزرسانی شد" };
  } catch {
    return { success: false, message: "به‌روزرسانی دفترچه موفقیت‌آمیز نبود" };
  }
};

export const deleteNotebook = async (id: string) => {
  try {
    await db.delete(notebooks).where(eq(notebooks.id, id));
    return { success: true, message: "دفترچه با موفقیت حذف شد" };
  } catch {
    return { success: false, message: "حذف دفترچه موفقیت‌آمیز نبود" };
  }
};
