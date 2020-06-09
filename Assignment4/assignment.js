const sayHello = (name="Max") => console.log("Hi " + name);

sayHello("Aravind");
sayHello();

const checkInput = (cb, ...strings) => {
  let validInput = true;
  for (const curString of strings){
    if (curString === ""){
      validInput = false;
      break;
    }
  }
  if (validInput) cb();
};


const printLog = () => console.log("Input Valid");

checkInput(printLog, "aravind" , "kjhd", " ugfousg");
checkInput(printLog, "" , "kjhd", " ugfousg");
