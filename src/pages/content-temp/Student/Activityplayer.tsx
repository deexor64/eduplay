import { useParams } from "react-router";

const ActivityPlayer = () => {
  const { activityId } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Activity: {activityId}</h1>
      {/* Here you will render the correct component based on type */}
      <p>Activity content or game will load here based on template type.</p>
    </div>
  );
};

export default ActivityPlayer;
