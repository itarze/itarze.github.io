const maxBitSize = 5;
export const sizeOfChoices = (numChoices) => numChoices.map(minBitSize).reduce((p, n) => n + p, 0);
export const packBits = (nums) => nums.reduce((p, [choice, numChoices]) => p << minBitSize(numChoices) | choice, 0) >>> 0;
export const numIntoBytes = (num32) => [num32 >> 24, num32 >> 16, num32 >> 8, num32].map((num) => num & 255);
export const bytesIntoNum = (bytesArr) => (bytesArr[0] << 24 | bytesArr[1] << 16 | bytesArr[2] << 8 | bytesArr[3]) >>> 0;
export const unpackBits = (choiceBits, nums) => nums.reverse().reduce(({res, bits}, numChoices) => ({
  bits: bits >> minBitSize(numChoices),
  res: [bits & (1 << minBitSize(numChoices)) - 1, ...res]
}), {bits: choiceBits, res: []}).res;
export const minBitSize = (num) => 1 + Array(maxBitSize).fill(0).findIndex((_, idx) => 2 << idx >= num);
console.log(412350, bytesIntoNum(numIntoBytes(412350)));
