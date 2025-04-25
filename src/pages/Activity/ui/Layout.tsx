import ActivityTitle from "./ActivityTitle";
import CoverImage from "./CoverImage";
import Description from "./Description";
import Footer from "./Footer";

function Layout(props: any) {
  return (
    <div className="max-w-6xl mx-auto p-4 bg-blue-100">
      <ActivityTitle title={props.title} />
      <CoverImage />
      <Description />
      {props.children}
      <Footer />
    </div>
  );
}

export default Layout;
