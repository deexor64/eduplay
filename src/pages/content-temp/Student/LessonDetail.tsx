import { useParams, Link } from "react-router";

const LessonDetail = () => {
  const { lessonId } = useParams();
  const activities = [
    { id: "activity1", title: "Addition Puzzle" },
    { id: "activity2", title: "Fill the Blanks" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Activities for {lessonId}</h1>
      <ul className="space-y-4">
        {activities.map(activity => (
          <li key={activity.id}>
            <Link to={`/activities/${activity.id}`} className="text-blue-500 hover:underline">
              {activity.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonDetail;
