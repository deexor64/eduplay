function generateRandomHash(inputString: string) {

  // Generate a random salt
  // const salt = crypto.randomBytes(16).toString('hex');

  // // Create a hash using the input string and the salt
  // const hash = crypto.createHash('sha256').update(inputString + salt).digest('hex');

  return `${Date.now()}_${inputString}`;
}

export default generateRandomHash;
