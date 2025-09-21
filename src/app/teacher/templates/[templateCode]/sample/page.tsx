"use client"

import ViewActivityLayout from "@/components/templates/ViewActivityLayout";
import TemplateProvider from "@/contexts/TemplateProvider";

export default function Sample() {

  return (
    <TemplateProvider>
      <div className="student-page">
        <ViewActivityLayout viewMode="SAMPLE" />
      </div>
    </TemplateProvider>
  )

}
