Let's continue migrating to server side rendered routes, let's do one step at a time. Let's convert the /search@page.tsx. @endpoints.ts @index.ts @actions 
For the search let's use tanstack query,
Flow: 
Set Up Search Query Hook
Debounce Input for Performance
Backend API for Search
Something like this:
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export function useSearch(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!query) return [];
      const res = await fetch(`/api/search?query=${query}`);
      return res.json();
    },
    enabled: !!query, // Only fetch when query is not empty
  });
}