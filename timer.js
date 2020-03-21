let second = 1000;
let seconds = 30;
let minutes = 1;
let then = Date.now();

let timer = document.GetElementById("time_left");

function decrementTime(){
    if(seconds > 0){
        seconds--;
        setTime(seconds, minutes);
    }else if(minutes > 0){
        minutes--;
        seconds += 60;
        setTime(seconds, minutes);
    }else{
        window.alert("Time up!");
    }

}

function setTime(int sec, int min){
    timer.innerHTML = min + ":" + sec;
}

function main(){
    let now = Date.now();
    if(now - then > second){
        decrementTime();
    }
    requestAnimationFrame(main);
}

main();