import { useEffect, useState } from "react";

type MessageProps = {
  message: string;
  type: "warning" | "error" | "message" | "success";
};

function AlertBox(props: MessageProps) {

  const [visible, setVisible] = useState(true);

  useEffect(function () {
    const timeout = setTimeout(function () {
      setVisible(false);
    }, 5000);
    return function () {
      clearTimeout(timeout);
    };
  }, []);

  if (!visible) {
    return null;
  }

  let style = "bg-white text-gray-900 border border-gray-300";
  if (props.type === "warning") {
    style = "bg-red-100 text-red-700";
  } else if (props.type === "error") {
    style = "bg-gray-200 text-gray-700";
  } else if (props.type === "success") {
    style = "bg-green-100 text-green-700";
  }

  return (
    <div className={`fixed left-1/2 top-6 transform -translate-x-1/2 p-4 rounded-lg shadow-md
      flex items-center gap-4 z-50 transition-all ${style}`}>
      <span className="flex-1">{props.message}</span>
      <button
        className="text-xl font-bold"
        onClick={function () {
          setVisible(false);
        }}
      >
        ✖
      </button>
    </div>
  );
}

export default AlertBox;
