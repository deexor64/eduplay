type LayoutProps = {
  activityTitle: string;
  coverImageSrc: string;
  activityDescription: string;
  children: React.ReactNode;
}

function Layout(props: LayoutProps) {
  return (

    <div className="max-w-6xl mx-auto p-4 pb-14 bg-blue-100">

      {/* activity title */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {props.activityTitle}
        </h1>
      </header>

      {/* cover image */}
      <section className="mb-6">
        <img
          src={props.coverImageSrc}
          alt="Cover"
          className="w-full h-[2in] object-contain rounded-xl shadow-md border"
        />
      </section>

      {/* description */}
      <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
        <p className="text-lg text-gray-700">
          {props.activityDescription}
        </p>
      </section>

      {/* activity content */}
      {props.children}

    </div>
  );
}

export default Layout;
