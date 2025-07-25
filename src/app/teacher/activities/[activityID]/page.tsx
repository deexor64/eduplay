"use client"

import ViewActivityLayout from "@/components/templates/ViewActivityLayout";
import TemplateProvider from "@/contexts/TemplateProvider";

export default function Activity() {

  return (
    <TemplateProvider>
      <ViewActivityLayout viewMode="PREVIEW" />
    </TemplateProvider>
  )

}
