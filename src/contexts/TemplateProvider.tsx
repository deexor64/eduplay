import React, { useState } from 'react';

export const TemplateContext = React.createContext<{
  templateValues: any,
  setTemplateValues: React.Dispatch<React.SetStateAction<any>>,
  }>({
      templateValues: null,
      setTemplateValues: () => {},
  });

export default function TemplateProvider(props: { children: React.ReactNode }) {

  const [templateValues, setTemplateValues] = useState<any>({});

  return (
    <TemplateContext.Provider value={{ templateValues, setTemplateValues }}>
      {props.children}
    </TemplateContext.Provider>
  );
}
  