import { useState, useCallback } from "react";

export default function usePrompt() {
  const [promptState, setPromptState] = useState<{
    message: string;
    defaultValue?: string;
    resolve?: (value: string | null) => void;
  } | null>(null);

  const prompt = useCallback((message: string, defaultValue?: string) => {
    return new Promise<string | null>((resolve) => {
      setPromptState({ message, defaultValue, resolve });
    });
  }, []);

  return { prompt, promptState, setPromptState };
}
