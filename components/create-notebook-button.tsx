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
import { createNotebook } from "@/server/notebooks";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

export const CreateNotebookButton = () => {
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
      const userId = (await authClient.getSession()).data?.user.id;
      

      if (!userId) {
        toast.error("You must be logged in to create a notebook");
        return;
      }

      const response = await createNotebook({
        ...values,
        userId,
      });
      if (response.success) {
        form.reset();
        toast.success("دفتری با موفقیت ساخته شد");
        router.refresh();
        setIsOpen(false);
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Failed to create notebook");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-max cursor-pointer">ساخت دفترچه</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ساخت دفترچه</DialogTitle>
          <DialogDescription>
            یک دفترچه جدید بسازید تا نوت‌های خود را ذخیره کنید.
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
                    <Input placeholder="دفترچه من" {...field} />
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
