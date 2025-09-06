"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createNote } from "@/server/notes";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

export const CreateNoteButton = ({ notebookId }: { notebookId: string }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      const response = await createNote({
        title: values.name,
        content: {},
        notebookId,
      });

      if (response.success) {
        form.reset();
        toast.success("نوت با موفقیت ساخته شد");
        router.refresh();
        setIsOpen(false);
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error(" خطایی رخ داد. لطفا دوباره امتحان کنید");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-max cursor-pointer">ساخت نوت</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ساخت نوت</DialogTitle>
          <DialogDescription>
          یک نوت جدید بسازید.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام</FormLabel>
                  <FormControl>
                    <Input placeholder="My Note" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="cursor-pointer" disabled={isLoading} type="submit">
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "ساختن"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
