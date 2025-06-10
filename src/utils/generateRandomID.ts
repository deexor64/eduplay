export default function generateRandomHash(inputString: string) {

  // // Generate a random salt
  // const salt = crypto.randomBytes(16).toString('hex');

  // // Create a hash using the input string and the salt
  // const hash = crypto.createHash('sha256').update(inputString + salt).digest('hex');
  // under impalemtation

  return `${Date.now()}_${inputString}`;
}

export function generateUniqueID() {
  return crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
}
