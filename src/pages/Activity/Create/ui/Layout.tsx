import Title from "./Title";
import ActivityTitle from "./ActivityTitle";
import CoverImage from "./CoverImage";
import Description from "./Description";
import ActivityOptions from "./ActivityOptions";
import Footer from "./Footer";

function Layout(props: any) {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <Title title={props.title} />
      <ActivityTitle />
      {/* <CoverImage /> */}
      <Description />
      {props.children}
      <ActivityOptions />
      <Footer />
    </div>
  );
}

export default Layout;
