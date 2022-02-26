
let boo = {
    //valori in cui salvare le tre risposte
    one : null, two : null, three : null
};


function changeTo(event){
    const select = event.currentTarget;
    
    //setto l'immagine selezionata via element.dataset.choiceId
    const scelta = select.dataset.choiceId;
    
    select.classList.add("selected");
    select.classList.remove("deselected");
    select.querySelector(".checkbox").src = "images/checked.png";
    
    //definisco const others come parentNode (tutti e 9 i div della stessa domanda)
    const others = select.parentNode.querySelectorAll("div");
    
    //for(let box of boxes){    così prenderei ogni div di tutti e 3 i riquadri
    for(other of others){
        if(other.dataset.choiceId  !== scelta){
            other.classList.remove("selected");
            other.classList.add("deselected");
            other.querySelector(".checkbox").src = "images/unchecked.png";
        }
    }

    
    boo[select.dataset.questionId]=scelta;  //inserisco in boo il valore della risposta.
    //cioè se scelgo nella prima domanda la 5, nella seconda la 3 e nella terza la 8 ho
    // boo = { one : 5, two : 3, three: 8 };  

    // se tutti e 3 i riquadri hanno una risposta, blocca tutto!

    if(boo["one"] !== null && boo["two"] !== null && boo["three"] !== null){
        for(box of boxes){
            box.removeEventListener("click",changeTo);  }
        // e inoltre faccio comparire la risposta del quiz
    check(boo); 
    //gli passo l'array di choiceId, cioè quali risposte sono selezionate per ogni domanda
    }
}

function trovaResult(){
    let result;
    // if boo[one] == etc ... i vari casi
    if(boo["one"] == boo["two"] && boo["one"] == boo["three"]){
        result = boo["one"];
        return result;  }
    if(boo["three"] == boo["two"]){
        result = boo["two"]; // two = three
        return result;
    }   else {
        result= boo["one"];
        return result;  }
}

function check(){
    result=trovaResult();
    // if boo[one] == etc ... i vari casi
    // result viene usato come index di RESULTS_MAP 
    let resultDiv = document.createElement("div");
    resultDiv.classList.add("risResult"); //importante per identificare il nuovo div per la risposta

    let resultTitle = document.createElement("h1");
    let resultText  = document.createElement("p");
    let resultButton  = document.createElement("div");
    let resultTextButton  = document.createElement("span");

    let article = document.querySelector('body article'); // art**
    article.appendChild(resultDiv); //ha come classe risResult
    let inside = document.querySelector('article div.risResult');
    inside.appendChild(resultTitle);
    inside.appendChild(resultText);
    
    resultTitle.textContent = RESULTS_MAP[result].title;
    resultText.textContent = RESULTS_MAP[result].contents;

    // per reset

    //let resultButton  = document.createElement("div");
    //let resultTextButton  = document.createElement("span");
    //let article = document.querySelector('body article'); 
    //let inside = document.querySelector('article .risResult');
    inside.appendChild(resultButton);
    let insideDiv = document.querySelector('article div.risResult div');
    insideDiv.appendChild(resultTextButton);
    resultTextButton.textContent = "Reset!";
    insideDiv.addEventListener("click", reset);

    
}

function reset(event){
    //rimuovo a tutti le classi selected e deselected, tolgo le spunte di checked e riattivo la selezionabilità
    for(let box of boxes){
        box.classList.remove("selected");
        box.classList.remove("deselected");
        box.querySelector(".checkbox").src = "images/unchecked.png";
        box.addEventListener("click", changeTo);
    }
    

    let resultDiv = document.querySelector("div.risResult");
    //resultDiv.classList.remove("risResult");
    let article = document.querySelector("body article");
    article.removeChild(resultDiv);
    
    //boo["one"] = null;
    //boo["two"] = null;
    //boo["three"] = null; //non mi resetta l'array

    boo = {one : null, two : null, three : null };

    window.scroll(0,0);

}

const boxes = document.querySelectorAll(".choice-grid div"); 
//così prendo tutti e 3 i choice grid!
//per prendere solo i div della stessa domanda devo invece usare parentNode.

for(let box of boxes){
    box.addEventListener("click", changeTo);
}