"use client";

import * as React from "react";
import debounce from "lodash.debounce";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import { ArrowLeft, ArrowRight, Loader, Search } from "lucide-react";
import { searchProducts } from "@/src/lib/queries/product.queries";
import Link from "next/link";
import { Button } from "../ui/button";

export function SearchBox() {
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const performSearch = React.useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResult([]);
      setIsLoading(false);
      return;
    }
    try {
      const data = await searchProducts(searchQuery);
      setResult(data);
    } catch (err) {
      console.error("search fail:", err);
      setResult([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debounceSearch = React.useMemo(
    () => debounce(performSearch, 400),
    [performSearch],
  );

  const handleChange = (val) => {
    setIsLoading(true);
    setQuery(val);
    debounceSearch(val);
  };

  React.useEffect(() => {
    return () => debounceSearch.cancel();
  }, [debounceSearch]);

  return (
    <div className="flex flex-col gap-4">
      {/* Search-Desktop */}
      <div
        onClick={() => setOpen(true)}
        className="h-10 relative px-2 rounded-3xl bg-white border border-grey220 border-l-0 lg:w-sm  flex items-center"
      >
        <Search className="text-primary size-5" />
        <input
          type="text"
          className="focus:outline-0 px-2.5 w-full text-sm "
          placeholder="اینجا پیداش کن ...."
        />
      </div>

     

      <CommandDialog
        className="sm:max-w-2xl! sm:top-[15%]! sm:translate-y-0! max-sm:h-full! max-sm:w-full! max-sm:max-w-full! max-sm:rounded-none! max-sm:top-0! max-sm:translate-y-0! transition-all duration-300!"
        open={open}
        onOpenChange={setOpen}
      >
        <Command shouldFilter={false}>
          <div className="flex w-full! items-center justify-center">
            <button className="size-12 flex justify-center items-center " >
              <ArrowRight className="cursor-pointer" size={24} onClick={() => setOpen(false)}/>
            </button>
            <CommandInput
              onValueChange={(value) => handleChange(value)}
              placeholder="جستجو در همه محصولات..."
              className="w-full!"
            />
          </div>
          <CommandList>
            {!isLoading && result.length === 0 && query && (
              <CommandEmpty>نتیجه‌ای یافت نشد.</CommandEmpty>
            )}
            {isLoading && (
              <div className="flex justify-center my-2">
                <Loader className="animate-spin" />
              </div>
            )}

            <CommandGroup heading={`نتیجه جستجو:${query}`}>
              {result.map((item) => (
                <CommandItem key={item.id}>
                  <Link href={`/product/${item.slug}`} className="flex gap-1">
                    <Search size={14} />
                    <span className="max-w-2xs truncate">{item.name}</span>
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
