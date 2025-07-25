"use client"

import { EdgeStoreProvider } from "@/lib/edgestore";
import CreateActivityLayout from "@/components/templates/CreateActivityLayout";
import TemplateProvider from "@/contexts/TemplateProvider";


export default function Create() {
  
  return (
    <EdgeStoreProvider>
      <TemplateProvider>
        <CreateActivityLayout /> 
      </TemplateProvider>
    </EdgeStoreProvider>
  )
};
