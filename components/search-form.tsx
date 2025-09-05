"use client";

import { Search } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";
import { useQueryState } from "nuqs";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });

  return (
    <form {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative" dir="rtl">
          <Label htmlFor="search" className="sr-only">
            جستوجو
          </Label>
          <SidebarInput
            id="search"
            placeholder="جستوجو در نوت ها..."
            className="ps-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
