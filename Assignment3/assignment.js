const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)
console.log(randomNumber);
if (randomNumber > 0.7){
    alert("Random Number greater than 0.7" );
}

let tempArray = [22,55,78,95];

for (let i=0; i<tempArray.length; i++){
    console.log(tempArray[i]);
}

for (const num of tempArray){
    console.log(num);
}

for (let i=tempArray.length-1; i>=0; i--){
    console.log(tempArray[i]);
}

const rand2 = Math.random();
console.log(randomNumber);
if ((randomNumber > 0.7 && rand2 > 0.7) || (randomNumber < 0.2 || rand2 < 0.2)){
    alert("Both are greater thasn 0.7 (or) Atleast one number is not greater than 0.2");
}