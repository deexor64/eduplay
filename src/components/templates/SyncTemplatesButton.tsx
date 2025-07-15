import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

type SyncTemplatesButtonProps = {
  syncTemplates: () => void;
};

export default function SyncTemplateButton(props: SyncTemplatesButtonProps) {

  return (
    <button
      onClick={async () => {
        props.syncTemplates();
      }}
      title="Sync Templates"
      className="ml-auto h-fit p-2 rounded-md bg-green-600 hover:bg-green-700 text-white">
      <FontAwesomeIcon icon={faSync} />
    </button>
  );
}
