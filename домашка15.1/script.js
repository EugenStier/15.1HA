class Shape {
  draw() {
    console.log("i am drawing");
  }
}
class Restangle extends Shape {
  draw() {
    console.log("i am drawing Restangle");
  }
}
class Circle extends Shape {
  draw() {
    console.log("i am drawing Circle");
  }
}
// const circlei = new Circle();
// const restangle = new Restangle();
const array = [new Circle(), new Restangle()];
array.forEach((el) => el.draw());
