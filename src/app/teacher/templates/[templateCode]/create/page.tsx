"use client"

import { EdgeStoreProvider } from "@/lib/edgestore";
import CreateActivityLayout from "@/components/templates/CreateActivityLayout";

export default function Create() {
  
  return (
    <EdgeStoreProvider>
      <CreateActivityLayout /> 
    </EdgeStoreProvider>
  )
};
