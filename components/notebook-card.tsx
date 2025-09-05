"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Notebook } from "@/db/schema";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2 } from "lucide-react";
import { deleteNotebook } from "@/server/notebooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NotebookCardProps {
  notebook: Notebook;
}

export default function NotebookCard({ notebook }: NotebookCardProps) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteNotebook(notebook.id);

      if (response.success) {
        toast.success("دفترچه با موفقیت حذف شد");
        router.refresh();
      }
    } catch {
      toast.error("Failed to delete notebook");
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };
  return (
<Card>
  <CardHeader>
    <CardTitle>{notebook.name}</CardTitle>
  </CardHeader>
  <CardContent>
    <p>{notebook.notes?.length ?? 0} نوت‌</p>
  </CardContent>
  <CardFooter className="flex justify-end gap-2">
    <Link href={`/dashboard/notebook/${notebook.id}`}>
      <Button variant="outline">مشاهده</Button>
    </Link>

    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={isDeleting}>
          {isDeleting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Trash2 className="size-4" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>آیا مطمئن هستید؟</AlertDialogTitle>
          <AlertDialogDescription>
            این عمل قابل بازگشت نیست. این کار نوت‌بوک و تمام نوت‌های آن را به‌صورت دائمی حذف خواهد کرد.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>لغو</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            ادامه
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </CardFooter>
</Card>

  );
}
