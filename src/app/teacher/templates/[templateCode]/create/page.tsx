"use client"

import { EdgeStoreProvider } from "@/lib/edgestore";
import CreateActivityLayout from "@/components/layouts/CreateActivityLayout";

export default function Create() {
  
  return (
    <EdgeStoreProvider>
      <CreateActivityLayout /> 
    </EdgeStoreProvider>
  )
};
