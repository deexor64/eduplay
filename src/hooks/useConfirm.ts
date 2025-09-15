import { useState, useCallback } from "react";

export default function useConfirm() {
  
  const [state, setState] = useState<{
    message: string;
    resolve?: (value: boolean) => void;
  } | null>(null);

  const confirm = useCallback((message: string) => {
    return new Promise<boolean>((resolve) => {
      setState({ message, resolve });
    });
  }, []);

  return { confirm, state, setState };
  
}
