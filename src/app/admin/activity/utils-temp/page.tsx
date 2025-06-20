import { useParams } from "next/navigation";
import { Suspense, lazy } from "react";


// import a component by name
function loadComponent(name: string, mode: "create" | "view") {
  if (mode == "create") return lazy(() => import(`../../[templates]/${name}.tmpl/Create`));
  else return lazy(() => import(`../../[templates]/${name}.tmpl/View`));
};

// component that renders an another component based on a dynamic name
export default function RenderTemplate(props: any) {

  const { templateName } = useParams();

  if (!templateName) return <div>No content specified</div>;

  let LessonComponent;

  try {
    LessonComponent = loadComponent(templateName, props.mode);
  } catch (error) {
    return <div>Lesson "{templateName}" not found.</div>;
  }

  return (
    <Suspense fallback={<div>Loading lesson...</div>}>
      <LessonComponent />
    </Suspense>
  );
};
