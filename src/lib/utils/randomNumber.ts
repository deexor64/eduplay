// Generate a random number within a range
// When seed is given number is deterministic

export default function randomNumber(min: number, max: number, seed?: string): number {
  
  let num: number;

  if (seed) {
    // Simple deterministic hash
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0; // force 32-bit
    }
    num = Math.abs(hash);
  } else {
    num = Math.floor(Math.random() * 0xffffffff);
  }

  return min + (num % (max - min + 1));
  
}
