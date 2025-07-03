export default function generateUniqueID() {
  const randHex = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
  return randHex // 1 - 8 character hex string
}
