class A {
    constructor(arg) {
        this.arg = arg;
    }
}

class B extends A {
    constructor(arg, argB) {
        super(arg);
        this.argB = argB;
    }
}

class C extends B {
    constructor(arg, argB, argC) {
        super(arg, argB);
        this.argC = argC;
    }
}

// Create instances of each class and log their properties
const objC = new C("arg1", "arg2", "arg3");
console.log(objC.arg);    // Output: "arg1"
console.log(objC.argB);   // Output: "arg2"
console.log(objC.argC);   // Output: "arg3"
