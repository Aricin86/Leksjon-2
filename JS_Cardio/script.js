/*********************/
/** START OF SCRIPT **/
/*********************/

window.onload = executeProgram;

const myObj = [
    { id: 1, data: "Valg #1" },
    { id: 2, data: "Valg #2" },
    { id: 3, data: "Valg #3" },
    { id: 4, data: "Valg #4" }
];

const testClick = (event) => {
    let newParagraph = document.createElement("p");
    let theText = changeText("Jeg trener på JavaScript");
    
    newParagraph.innerHTML = theText;
    document.body.firstChild.prepend(newParagraph);
};

function changeText(text) {
    let reversedText = text.split("").reverse().join("");
    let array = reversedText.split(" ");
    let newArray = [];

    for (let i = 0; i < array.length; i++) {
        let currentWord = array[i] + "";
        let slicedWord = currentWord.slice(1);
        newArray.push(slicedWord);
    }
    let newText = newArray.join(" ");
    return newText;
}

const resetClick = (event) => {
    makeList();
}

const deleteClick = (event) => {
    event.path[1].remove();
}


function executeProgram() {
    // Lage et main HTML element
    let mainElement = document.createElement("main");
    
    // Legge den til body
    document.body.prepend(mainElement);
    
    // Lage en paragraph
    let paragraph = document.createElement("p");
    
    // Legge til "Jeg trener på JavaScript" i en paragraf
    paragraph.innerHTML = "Jeg trener på JavaScript";
    
    // Gi denne en klasse
    paragraph.className = "para-class";
    
    // Legge den til main elementet
    mainElement.appendChild(paragraph);

    // Lage en select box
    let selectBox = document.createElement("select");

    // Populere selectboksen basert på et object / array (Ex. const myObj = [{id: 1, data: "text"},{id:2, date:"text2"])
    /* 
        Objektet er lagret som en global const øverst i fila.
    */
    for (let i = 0; i < myObj.length; i++) {        
        let optionSelect = document.createElement("option");
        optionSelect.setAttribute("value", myObj[i].id);
        optionSelect.innerHTML = myObj[i].data;
        selectBox.appendChild(optionSelect);
    }

    // I main sentrere selectboksen og sette maksbredde til 500px
    /*
        OBS!    Har tolket dette til å bety at selectboksen skal sentreres 
                på siden og at "main"-taggen skal være maks 500px bred.
                Alle andre vil da også flyttes til midten av siden, men
                er venstre justert.
    */
    selectBox.style.display = "block";
    selectBox.style.margin = "auto";
    mainElement.style.maxWidth = "500px";
    mainElement.style.margin = "auto";
    mainElement.appendChild(selectBox);

    // Lage to knapper (test og reset)
    let btnTest = document.createElement("button");
    btnTest.setAttribute("type", "button");
    btnTest.textContent = "Test";
    let btnReset = document.createElement("button");
    btnReset.textContent = "Reset";
    
    // Legge disse til etter selectboksen
    mainElement.appendChild(btnTest);
    mainElement.appendChild(btnReset);

    // Lage en "click" eventlistener på knappene
    btnTest.addEventListener("click", testClick);
    btnReset.addEventListener("click", resetClick);

    // Klikk på test knappen skal skrive ut teksten i paragrafen. Utskriften skal være reversert og første bokstav er fjernet i hvert ord. (Enten som ny <p> eller i den "gamle" <p>)
    /*
                Se øverst i fila for click-event for Test-knappen.
        OBS:    Tolket det som at setningen skulle reverseres først, så fjerne forbokstav til hvert ord.
    */

    // Lage en ul med 4 listeelementer
    makeList();

    // Legge til en deleteknappe til hvert listeelement
    /*
        Se funksjon "addDeleteButtonsToList" nederst i fila.
    */

    // Legge til eventlistener for å fjerne et og et element med klikk på delete
    /*
        Se funksjon "addDeleteButtonsToList" nederst i fila.
    */

    // Klikk på reset for å få tilbake alle listeelementene
    /*
        Se øverst i fila for click-event for Reset-knappen.
    */

}

function makeList() {
    if (document.body.firstChild.getElementsByTagName('ul')[0]) {
        document.body.firstChild.getElementsByTagName('ul')[0].remove();
    }

    let liste = document.createElement("ul");
    
    for (let i = 1; i <= 4; i++) {
        let punkt = document.createElement("li");
        punkt.innerHTML = "Listeelement #" + [i];
        liste.appendChild(punkt);
    }
    document.body.firstChild.appendChild(liste);
    
    addDeleteButtonsToList(); 
}

function addDeleteButtonsToList() {

    for (let i = 0; i < 4; i++) {
        let btnDelete = document.createElement("button");
        btnDelete.textContent = "Delete";

        /* 
            Dette er nest siste steg i JS Cardioen
            Se øverst i fila for click-event
        */
        btnDelete.addEventListener("click", deleteClick);

        document.body.firstChild.getElementsByTagName('ul')[0].childNodes[i].appendChild(btnDelete);
    }
}


/*******************/
/** END OF SCRIPT **/
/*******************/