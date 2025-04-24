import { useParams } from "react-router";
import { Suspense, lazy } from "react";

// import a component by name
function loadComponent(name: string, path:string) {
  return lazy(() => import(`../pages/${path}/${name}`));
};


// component that renders an another component based on a dynamic name
function LessonRenderer(props: any) {

  const { contentName } = useParams();

  if (!contentName) return <div>No content specified</div>;

  let LessonComponent;

  try {
    LessonComponent = loadComponent(contentName, props.path);
  } catch (error) {
    return <div>Lesson "{contentName}" not found.</div>;
  }

  return (
    <Suspense fallback={<div>Loading lesson...</div>}>
      <LessonComponent />
    </Suspense>
  );
};

export default LessonRenderer;
