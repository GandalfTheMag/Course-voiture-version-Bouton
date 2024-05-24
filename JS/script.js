const course = document.getElementById("container-course");
const btnGo = document.getElementById("go");
const btnReset = document.getElementById("reset");
const car = document.getElementsByClassName("car");
const vic1 = document.getElementById("victoire1");
const vic2 = document.getElementById("victoire2");
const cont = document.getElementById("decompte");
const scoreB = document.getElementById("scoreBleu");
const scoreR = document.getElementById("scoreRouge");
const timeBox = document.getElementById("time-box")
let carCourse;
let timerv;
let newtimer;
let i;
let comptBleu = 0;
let comptRouge = 0;
let v=0;
let vv=1;
let myTime=0;

class Voiture{
    #x;
    #y;
    constructor(x,y, imag) {
        this.#x = x;
        this.#y = y;
        this.creer(imag);
    }
    getx() {
        return this.#x;
    }
    gety() {
        return this.#y;
    }
    setx(x) {
        this.#x = x;
    }
    sety(y) {
        this.#y = y;
    }
}

Voiture.prototype.creer = function(imag) {
    carCourse = document.createElement("img");
    carCourse.src = imag;
    course.appendChild(carCourse);
    carCourse.setAttribute("class", "car");
    carCourse.style.position = "relative";
    carCourse.style.left = this.getx() + "px";
    carCourse.style.top = this.gety() + "px";
    carCourse.style.width = "100px";
    
};

let car1 = new Voiture(1000,75, "./img/car1.png");
let car2 = new Voiture(900,175, "./img/car2.png");

btnGo.addEventListener("click", go);
btnReset.addEventListener("click", res);
document.addEventListener("keyup", function(e) {
    if ((e.keyCode == 99) && (v==0) && (vv==0)) {
        
        if (car1.getx() < 80){
        
            vic2.style.display = "none";
            vic1.style.display = "block";
            cont.style.display= "none";
            comptRouge += 1;
            scoreR.textContent = comptRouge;
            if (car2.getx() > 0) {
                startConfetti();
            }
            clearInterval(timerv);
            v=1;
        }
        else{
            btnReset.style.display = "inline";
            btnGo.style.display = "none";
            carCourse = document.getElementsByClassName("car")[0];
            car1.deplacer(20);
        }

    }
    if ((e.keyCode == 87) && (v==0) && (vv==0)) {
       
        if (car2.getx() < -20) {
        
            vic2.style.display = "block";
            vic1.style.display = "none";
            cont.style.display= "none";
            comptBleu += 1;
            scoreB.textContent = comptBleu;
            if (car1.getx() > 100) {
                startConfetti();
            }
            btnReset.style.display = "inline";
            btnGo.style.display = "none";
            clearInterval(timerv);
            v=2;
        }
        else{
            
            carCourse = document.getElementsByClassName("car")[1];
            car2.deplacer(20);
        }
    }
});

Voiture.prototype.deplacer = function(distance) {
    //console.log(this.x);
    let newDistance = this.getx() - distance;
    this.setx(newDistance);
    carCourse.style.position = "relative";
    carCourse.style.left = this.getx() + "px";
    carCourse.style.top = this.gety() + "px";
    carCourse.style.width = "100px";
    
}

function go(){
    btnGo.style.display = "none";
    btnReset.style.display = "inline";
    cont.style.display= "block";
    cont.textContent="";
    v=0;
    i=3;
    newtimer = setInterval(decompte,1000);
}

function res(){
    i=3;
    v=0;
    vv=1;
    myTime=0;
    car1.setx(1000);
    car2.setx(900);
    clearInterval(timerv);
    clearInterval(newtimer);
    cont.textContent="";
    vic2.style.display = "none";
    vic1.style.display = "none";
    btnGo.style.display = "inline";
    btnReset.style.display = "none";
    timeBox.textContent = "0";
    carCourse = document.getElementsByClassName("car")[0];
    car1.deplacer(0);
    carCourse = document.getElementsByClassName("car")[1];
    car2.deplacer(0);
    stopConfetti(); 
}

function timer(){

    timerv = setInterval(timeCount,10);
}

function decompte(){
    cont.textContent = i;
    if(i == 0){
        cont.textContent = "GO !";
        btnGo.style.display = "none";
        btnReset.style.display = "inline";
        clearInterval(newtimer);
        timer();
        vv=0;
    }
    i--;
}

function timeCount(){

    myTime++;
    timeBox.textContent = myTime;
}



