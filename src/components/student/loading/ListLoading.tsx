import Lottie, { useLottie } from "lottie-react";

export default function ListLoading() {
  return (
    <Lottie animationData={require("/public/animations/spin-loading.json")}
      loop={true} className="w-30 h-30" />
  );
}
