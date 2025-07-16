"use client"

import { TemplateViewMode, UserType } from "@/lib/utils/types";
import { useSearchParams } from "next/navigation";
import { lazy, Suspense, useMemo } from "react";
import { EdgeStoreProvider } from "@/lib/edgestore";
import CreateLayout from "@/layouts/CreateLayout";
import ViewLayout from "@/layouts/ViewLayout";

function loadComponent(templateCode: string, viewMode: TemplateViewMode) {
  if (viewMode === "CREATE") return lazy(() => import(`./${templateCode}/Create.tsx`));
  else return lazy(() => import(`./${templateCode}/View.tsx`));
};

export default function Templates(props: any) {
  
  const searchParams = useSearchParams();
  const viewMode = searchParams.get("viewMode") as TemplateViewMode;
  const templateCode = searchParams.get("templateCode") as string;
  
  console.log("Loading component", templateCode,"  ", viewMode);

  const ActivityComponent = useMemo(() => {
    if (!templateCode || !viewMode) return null;
    return loadComponent(templateCode, viewMode);
  }, [templateCode, viewMode]);
  
  return ActivityComponent ? (
    
    <Suspense>
      <EdgeStoreProvider>
        {viewMode === "CREATE" ? 
        <CreateLayout createActivityComponent={ActivityComponent} /> : 
        <ViewLayout viewActivityComponent={ActivityComponent} />
        }
      </EdgeStoreProvider>
    </Suspense>
  ) : null;

};
