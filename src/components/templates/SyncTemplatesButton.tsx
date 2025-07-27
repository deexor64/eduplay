import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

type SyncTemplatesButtonProps = {
  handleSyncTemplates: Function;
}

export default function SyncTemplateButton(props: SyncTemplatesButtonProps) {

  const [isSyncing, setIsSyncing] = useState(false);

  async function syncIconAnimation() {
    setIsSyncing(true);
    props.handleSyncTemplates();
    setIsSyncing(false);
  }

  return (
    <button  onClick={syncIconAnimation} disabled={isSyncing} title="Sync Templates"
      className={`ml-auto h-fit p-2 rounded-md text-white transition-all duration-200 ${
      isSyncing 
        ? "bg-gray-500 cursor-not-allowed" 
        : "bg-green-600 hover:bg-green-700"
    }`}>
      <FontAwesomeIcon icon={faSync} 
      className={`${isSyncing ? "animate-spin" : ""}`} />
    </button>
  );
}
