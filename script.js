var i = 1;
var waiting_for_input = false;
var clipboard;
var mode = 0;

function handleKeyPress(event) {
  if (event.keyCode === 13) {
    input();
  }
}

function init(){
    printmessage("Hallo, ich bin T.I.N.A, dein persönlicher Assistent und Berater um deine Aufgaben zu erfüllen!", "left", 750);
    printmessage("Wie kann ich dir helfen?", "left", 1250)
}

document.addEventListener("keydown", handleKeyPress);

function input(){
    var input = document.getElementById("textfeld").value;

    if (input === "") {
        return;
      }

    if (input == "Stop" || input == "stop" || input == "Abbrechen" || input == "abbrechen") {
        document.getElementById("textfeld").value = "";
        printmessage(input, "right")    
        window.location.reload()
        return;
        
    }
    
    if (mode == 0){
        enter()
    }else{
        clipboard = input
        var data = clipboard.split(",")
        /*for(var x = 0; x < data.length; x++){
            alert(data[x]);
        }*/
        /*const ibanPattern = new RegExp("\w{2}\d{20}","i")*/
        const ibanPattern = new RegExp("^\\w{2}\\d{20}$","i")
        const namePattern = new RegExp("^[a-z]+\\s[a-z]+$","i")
        const betragPattern = new RegExp("^\\d+.(\\d{1}|\\d{2})$")
        if(ibanPattern.test(data[0])){
            if(namePattern.test(data[1])){
                if(betragPattern.test(data[2])){
                    printmessage(
                        "IBAN: " + data[0] +
                        "\nName: " + data[1] +
                        "\nBetrag: " + data[2],"left")
                    printmessage("Überweisung in Auftrag, bitte TAN bestätigen.","left", 500)
                    input.value = "";
                    document.getElementById("textfeld").value = "";
                    mode = 0
                }else{
                    printmessage(input,"right")
                    printmessage("Betrag falsch","left", 500)
                }
            }else{
                printmessage(input,"right", 500)
                printmessage("Name falsch","left", 500)
            }
        }else{
            printmessage(input,"right", 500)
            printmessage("IBAN falsch","left", 1000)
        }
    }
}



function enter(){
    var input = document.getElementById("textfeld").value;
    printmessage(input, "right");

    if (waiting_for_input) {
        var clipboard = input;
        printmessage("Wie viel Geld möchten Sie an " + input + " überweisen?")
      }
    else {
        const keywords = ["Überweisung","IBAN","BIC","SEPA","frage"];
    
        const text = document.getElementById("textfeld").value;
    
        document.getElementById("textfeld").value = "";
    
        for(var x = 0; x < keywords.length; x++){
            var pattern = new RegExp(keywords[x], "i");
    
            if(pattern.test(text)){
                var result = keywords[x];
                break;
            }
        }
        switch(result){
            case "Überweisung":
                Überweisung();
                break;
            case "IBAN":
                printmessage("Die Internationale Bankkontonummer ist eine internationale, standardisierte Notation für Kontonummern.", "left", 500);
                printmessage("Diese hat den Ländercode (Buchstaben), dann 20 Ziffern inklusive BIC.", "left", 1000);
                break;
            case "BIC":
                printmessage("Die Norm ISO 9362 beschreibt einen international standardisierten Code zur Identifikation von Geschäftsstellen im Zahlungsverkehr.", "left", 500);
                break;
            case "SEPA":
                printmessage("SEPA bezeichnet den einheitlichen Euro-Zahlungsverkehrsraum (englisch: Single Euro Payments Area). Innerhalb dieses Gebiets gibt es einheitliche Verfahren für bargeldloses Bezahlen in Euro.", "left", 500);
                break;
            case "frage":
                printmessage("Hier sind die häufigsten Anfragen an mich:\n-Wie kann ich eine Überweisung tätigen?\n-Wo finde ich meine Depot Übersicht?\n-Wo finde ich meine Überweisungen?","left", 500)
                break;
            default:
                printmessage("Tut mir Leid, das habe ich nicht verstanden. Bitte versuchen Sie es erneut.","left", 500);
                break;
        }
    }
}

function Überweisung(){
    printmessage("Um die Überweisung durchzuführen sind die folgenden Informationen benötigt: ", "left", 500)
    printmessage("Bitte gib die IBAN, Vorname Nachname und Betrag ein:", "left", 1000)
    mode = 1;
}


/*
function createTextbox(message, position){
    var x = document.createElement("div");
    x.textContent = message;
    x.classList.add("message-box")
    x.classList.add(position);
    document.getElementById("chatBox").appendChild(x)

    var chatBox = document.getElementById("chatBox");
    chatBox.scrollTop = chatBox.scrollHeight;
}
*/

function createTextbox(message, position) {
    var x = document.createElement("div");
    x.textContent = message;
    x.classList.add("message-box");
    x.classList.add(position);
    document.getElementById("chatBox").appendChild(x);

    var chatBox = document.getElementById("chatBox");
    chatBox.scrollTop = chatBox.scrollHeight;

    if (position == "left"){
        var audio = document.getElementById("computer-audio");
        audio.play();
    }
    if (position == "right"){
        var audio = document.getElementById("user-audio");
        audio.play();
    }

    if (position == "left"){
        var audio = document.getElementById("computer-audio");
        audio.play();
    }


    // Trigger the animation effect after a short delay
    setTimeout(() => {
      x.classList.add("animate");
    }, 50); // Adjust the delay time (in milliseconds) as needed
  }

/*
function printmessage(message, position){ //position: "right" or "left"
    createTextbox(message, position)

}
*/

function printmessage(message, position, delay = 0) {
    /*
    document.addEventListener('DOMContentLoaded', () => {
        const gif = document.getElementById("talk")
        gif.play();
    });
    */
    setTimeout(() => {
      createTextbox(message, position);
    }, delay);
    /*
    document.getElementById("logo").style.visibility = true;
    document.getElementById("logoTalk").style.visibility = false;
    */
  }