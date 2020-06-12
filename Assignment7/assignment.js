class Course{

    set price(value) {
        if (value < 0) this._price = 0;
        else this._price = value;
    }

    get price(){
        return `\$${this._price}`;
    }

    constructor(title, length, price){
        this.title = title;
        this.length = length;
        this.price = price;
    }

    calculate(){
        return this.length/this._price;
    }

    summary(){
        return `${this.title} is a ${this.length} hr(s) course available for ${this.price}`;
    }
}

class PracticalCourse extends Course {
    constructor(title, length, price, exerciseCount){
        super(title, length, price);
        this.exerciseCount = exerciseCount;
    }
}

class TheoreticalCourse extends Course {
    constructor(title, length, price){
        super(title, length, price);
    }

    publish(){
        console.log("Publish method called..!");
    }
}


const course1 = new Course("Java Script", 52, 300);
const course2 = new Course("React JS", 60, 400);
console.log(course1);
console.log(course2);

console.log(course1.calculate());
console.log(course1.summary());
console.log(course2.calculate());
console.log(course2.summary());


const practicalCourse = new PracticalCourse("Angular", 70, 500, 10);
console.log(practicalCourse.exerciseCount);

const tCourse = new TheoreticalCourse("React Native", 49, 600);
tCourse.publish();

