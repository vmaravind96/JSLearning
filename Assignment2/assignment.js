const task3Element = document.getElementById('task-3');

function first(){
    alert("First Function");
}

function second(message){
    alert(message);
}

function third(s1, s2, s3){
    return s1+s2+s3;
}

first();
second("Second Function");

task3Element.addEventListener('click', first);

alert(third("Third", "Function", "Called...!"));
