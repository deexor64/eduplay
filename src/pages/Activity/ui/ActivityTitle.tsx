function ActivityTitle(props: any) {
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800">
        {props.title}
      </h1>
    </header>
  );
}

export default ActivityTitle;
