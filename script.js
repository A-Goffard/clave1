"use strict";

// Variable para rastrear si el audio ya se reprodujo
let audioPlayed = false;

document.addEventListener("DOMContentLoaded", function() {
    // Muestra un mensaje para indicar que se requiere la interacción del usuario
    alert("¡Haga clic en cualquier lugar de la pantalla luego de cerrar esta pestaña para reproducir el audio!");

    

    // Reproduce el audio cuando el usuario hace clic o toca
    document.addEventListener("pointerup", function() {
        // Reproduce el audio solo si no se ha reproducido previamente
        if (!audioPlayed) {
            playAudio();
        }
    });
});

// Función para reproducir el audio
function playAudio() {
    let miAudio = document.getElementById("miAudio");
    let sources = miAudio.getElementsByTagName("source");

    for (let i = 0; i < sources.length; i++) {
        let source = sources[i];
        let audioType = source.type;
        let audioSrc = source.src;

        let audio = new Audio();
        audio.src = audioSrc;
        audio.type = audioType;
        audio.loop = true;
        audio.preload = "auto";

        try {
            audio.load();
            audio.addEventListener("canplaythrough", function() {
                audio.play();
                audioPlayed = true;
            });
            
            audio.addEventListener("error", function(error) {
                console.error("Error al cargar o reproducir audio:", error);
            });

            // Sal del bucle si el audio se ha reproducido exitosamente
            if (audioPlayed) {
                break;
            }
        } catch (error) {
            console.error("Error al cargar audio:", error);
        }
    }
}

//funcion para iniciar canva

let canvas = document.querySelector("canvas");

let ctx = canvas.getContext("2d"); 
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
let str = ["B", " ", "I", " ", "L"," ", "B"," ", "O"," ", "S"," ", "T"," ", "A"," ", "C", "", "K"];
let matrix = str.sort();
let font = 5;
let col = width / font;
let arr = [];

for(let i = 0; i < col; i++) {
    arr[i] = 1;
}

const draw = () => {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#E129FF"; 
    ctx.font = `$(font)px system-iu`;

    for(let i = 0; i < arr.length; i++) {
        let txt = matrix[Math.floor(Math.random()  * matrix.length)];
        ctx.fillText(txt, i * font, arr[i] * font);

        if(arr[i] * font > height && Math.random() > 0.975) {
            arr[i] = 0;
        }

        arr[i]++;
    }
}

setInterval(draw, 15);

window.addEventListener("resize", () => location.reload());