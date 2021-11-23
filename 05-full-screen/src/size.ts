export class Size {
  width: number;
  height: number;

  constructor(
    width: number = window.innerWidth,
    height: number = window.innerHeight
  ) {
    this.width = width;
    this.height = height;
  }

  get aspect() {
    return this.width / this.height;
  }
}
