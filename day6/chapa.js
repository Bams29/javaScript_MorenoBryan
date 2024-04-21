class Shape {
    calculateArea() {
        console.log("Area calculation not implemented for generic shape");
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    calculateArea() {
        const area = Math.PI * Math.pow(this.radius, 2);
        console.log(`Circle Area: ${area.toFixed(2)}`);
    }
}

class Triangle extends Shape {
    constructor(base, height) {
        super();
        this.base = base;
        this.height = height;
    }

    calculateArea() {
        const area = 0.5 * this.base * this.height;
        console.log(`Triangle Area: ${area.toFixed(2)}`);
    }
}

// Creating instances and calculating areas
const circle = new Circle(5);
circle.calculateArea(); // Output: Circle Area: 78.54

const triangle = new Triangle(6, 4);
triangle.calculateArea(); // Output: Triangle Area: 12.00
