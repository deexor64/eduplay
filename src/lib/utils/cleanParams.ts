// removes undefined and empty values from url query strings
export default function cleanParams(params: Record<string, any>): Record<string, string> {
  
  const cleanParams:Record<string, string> = {};
  
  for (const [key, value] of Object.entries(params)) {
    if (value != null) {
      cleanParams[key] = String(value);
    }
  }
  
  return cleanParams;
  
}
