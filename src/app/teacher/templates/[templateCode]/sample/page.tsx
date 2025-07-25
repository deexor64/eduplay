"use client"

import ViewActivityLayout from "@/components/templates/ViewActivityLayout";
import TemplateProvider from "@/contexts/TemplateProvider";

export default function Sample() {

  return (
    <TemplateProvider>
      <ViewActivityLayout viewMode="SAMPLE" />
    </TemplateProvider>
  )

}
