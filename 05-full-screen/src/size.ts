export class Size {
  width: number;
  height: number;

  constructor(width: number = 800, height: number = 600) {
    this.width = width;
    this.height = height;
  }

  get aspect() {
    return this.width / this.height;
  }
}
