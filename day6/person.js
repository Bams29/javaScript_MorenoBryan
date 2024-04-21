class Person {
        constructor(name, age, country) {
        this.name = name;
        this.age = age;
        this.country = country;
        }
    
        displayDetails() {
        console.log(`Name: ${this.name}`);
        console.log(`Age: ${this.age}`);
        console.log(`Country: ${this.country}`);
        }
    }
    
    // Creating instances of Person
    const person1 = new Person("John", 30, "USA");
    const person2 = new Person("Alice", 25, "Canada");
    
    // Displaying details of each person
    console.log("Person 1 details:");
    person1.displayDetails();
    console.log("-------------------------");
    console.log("Person 2 details:");
    person2.displayDetails();