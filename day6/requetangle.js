class rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    
    calculateArea(){
        return this.width * this.height
    }

    calculatePerimeter(){
        return 2 * (this.width + this.height)
    }
}



const rectangleOne = new rectangle(15, 9)

console.log("Rectangle area:", rectangleOne.calculateArea());
console.log("Rectangle perimeter:", rectangleOne.calculatePerimeter());