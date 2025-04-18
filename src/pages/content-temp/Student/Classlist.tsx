import { Link } from "react-router";

const ClassList = () => {
  const classes = [
    { id: "grade1-math", title: "Grade 1 - Mathematics" },
    { id: "grade1-science", title: "Grade 1 - Science" },
    { id: "grade2-english", title: "Grade 2 - English" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Classes</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {classes.map(cls => (
          <li key={cls.id} className="p-4 bg-white shadow rounded-lg">
            <Link to={`/classes/${cls.id}`} className="text-blue-500 hover:underline">
              {cls.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;
