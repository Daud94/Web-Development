document.querySelectorAll(".drum").forEach(drum => {
    drum.addEventListener("click",function (){
        let buttonInnerHTML = this.innerHTML; // or drum.innerHTML
        animateButton(buttonInnerHTML);
        switch (buttonInnerHTML){
            case "w":
                playAudio("crash.mp3");
                break;
            case "a":
                playAudio("kick-bass.mp3");
                break;
            case "s":
                playAudio("snare.mp3");
                break;
            case "d":
                playAudio("tom-1.mp3");
                break
            case "j":
                playAudio("tom-2.mp3");
                break
            case "k":
                playAudio("tom-3.mp3");
                break
            default:
                playAudio("tom-4.mp3");
        }
    })
    drum.addEventListener("keypress",function (event) {
        let key = event.key
        animateButton(key);
        switch (key){
            case "w":
                playAudio("crash.mp3");
                break;
            case "a":
                playAudio("kick-bass.mp3");
                break;
            case "s":
                playAudio("snare.mp3");
                break;
            case "d":
                playAudio("tom-1.mp3");
                break
            case "j":
                playAudio("tom-2.mp3");
                break
            case "k":
                playAudio("tom-3.mp3");
                break
            default:
                playAudio("tom-4.mp3");
        }
    })
})

function playAudio(song){
    let audio = new Audio(`sounds/${song}`);
    audio.play();
}
function animateButton(currentKey){
    document.querySelector(`.${currentKey}`).classList.add("pressed");
    setTimeout(function(){
        document.querySelector(`.${currentKey}`).classList.remove("pressed");
    },300);
}
