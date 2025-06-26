export async function generateHash(input: string) {
  
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const encoder = new TextEncoder();
  const data = encoder.encode(input + Array.from(salt).join());

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return hashHex; // 64 character hex string
  
}

export function generateUniqueID() {
  const randHex = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
  return randHex // 1 - 8 character hex string
}
