import { useParams, Link } from "react-router";

const ClassDetail = () => {
  const { classId } = useParams();
  const lessons = [
    { id: "lesson1", title: "Introduction to Addition" },
    { id: "lesson2", title: "Subtraction Basics" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lessons for {classId}</h1>
      <ul className="space-y-4">
        {lessons.map(lesson => (
          <li key={lesson.id}>
            <Link to={`/lessons/${lesson.id}`} className="text-blue-500 hover:underline">
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassDetail;
