import Lottie, { useLottie } from "lottie-react";

export default function ListEmpty() {
  return (
    <Lottie animationData={require("/public/animations/empty.json")}
      loop={true} className="w-50 h-50" />
  );
}
