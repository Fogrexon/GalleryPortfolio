/* eslint-disable no-return-assign */
/* eslint-disable no-bitwise */
export class Random {
  x: number;

  y: number;

  z: number;

  w: number;

  constructor(seed = 88675123) {
    this.x = 123456789;
    this.y = 362436069;
    this.z = 521288629;
    this.w = seed;
  }

  // XorShift
  nextInt() {
    const t = this.x ^ (this.x << 11);
    this.x = this.y; this.y = this.z; this.z = this.w;
    return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
  }

  next() {
    return Math.abs(this.nextInt()) / (2 ** 31 - 1);
  }
}
