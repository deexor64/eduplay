import { useState, useCallback } from "react";

export default function useConfirm() {
  
  const [confirmState, setConfirmState] = useState<{
    message: string;
    resolve?: (value: boolean) => void;
  } | null>(null);

  const confirm = useCallback((message: string) => {
    return new Promise<boolean>((resolve) => {
      setConfirmState({ message, resolve });
    });
  }, []);

  return { confirm, confirmState, setConfirmState };
  
}
