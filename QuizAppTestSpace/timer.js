let second = 1000;
let seconds = 1;
let minutes = 2;
let then = Date.now();

let timer = document.getElementById("time_left");

function decrementTime(){
    if(seconds > 0){
        seconds--;
        setTime(seconds, minutes);
    }else if(minutes > 0){
        minutes--;
        seconds += 59;
        setTime(seconds, minutes);
    }else{
        window.alert("Time up!");
    }
    then = Date.now();
}

function setTime(sec , min){
    if(sec < 10){
        timer.innerHTML = min + ":0" + sec;
    }else{
        timer.innerHTML = min + ":" + sec;
    }
}

function main(){
    let now = Date.now();
    if(now - then > second){
        decrementTime();
    }
    requestAnimationFrame(main);
}

main();