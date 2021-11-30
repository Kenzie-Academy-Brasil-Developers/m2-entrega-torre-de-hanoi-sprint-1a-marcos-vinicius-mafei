// const game = document.querySelector(".game")
let currentDisk = 0
let count = 0
const modalVitoria = document.getElementById('modalVitoria')
const modalRegras = document.getElementById('modalRegras')
const buttonReset = document.querySelectorAll("button")[3]
const main = document.querySelector("main")
const selectDificultPop = document.querySelector(".selectDificult")
selectDificultPop.addEventListener("click", selectDificult)
let defaultPosition = []
let towersArray = []
let toWin = 0

// cria os discos e as torres //
function createGame(diskNumber = 3) {
    const game = document.createElement("div")
    game.classList.add("game")
    main.appendChild(game)
    for (let towers = 0; towers < 3; towers++) {
        const tower = document.createElement("div")
        if (towers === 0) {
            for (let i = 0; i < diskNumber; i++) {
                const disk = document.createElement("div")
                disk.classList.add("disk" + (diskNumber - i))
                disk.classList.add("disks")
                tower.appendChild(disk)
                defaultPosition.push(disk)
            }
        }
        tower.classList.add("game--towers")
        tower.addEventListener("click",getDisk)
        towersArray.push(tower)
        game.appendChild(tower)
        main.style.height = "70.5vh"
    }
    for(let i = 0; i <3;i++){
        const div = document.createElement("div")
        if(i === 0){
            div.classList.add("game--bottom")
        }else if(i === 1){
            div.classList.add("game--grass")
            div.innerText = "total movements: 0"
        }else{
            div.classList.add("game--ground")
            const buttonReset = document.createElement("button")
            buttonReset.classList.add("reset--button")
            buttonReset.innerText = "Reset"
            buttonReset.addEventListener("click",reset)
            const changeDifficult = document.createElement("button")
            changeDifficult.innerText = "Change difficult"
            changeDifficult.classList.add("changeDifficult--button")
            changeDifficult.addEventListener("click",changeOtherDifficult)
            div.appendChild(changeDifficult)
            div.appendChild(buttonReset)
        }
        main.appendChild(div)
    }
}

function selectDificult(event){
    defaultPosition = []
    towersArray = []
    if(event.target.classList.contains("dificcult")){
        let difficult = event.target.innerText
        if(difficult==="Easy"){
            createGame(3)
            toWin = 3
        }else if(difficult==="Normal"){
            createGame(4)
            toWin = 4
        }else if(difficult==="Hard"){
            createGame(5)
            toWin = 5
        }
        selectDificultPop.classList.add("displayNone")
    }
}

buttonReset.addEventListener("click", reset)

function getDisk(event) {
    currentDisk = event.currentTarget.lastChild
    for(let i = 0;i<towersArray.length;i++){
        towersArray[i].removeEventListener("click", getDisk)
        towersArray[i].addEventListener("click",moveDisk)
    }
}


function moveDisk(event) {
    for(let i = 0;i<towersArray.length;i++){
        towersArray[i].addEventListener("click", getDisk)
        towersArray[i].removeEventListener("click",moveDisk)
    }
    if(event.currentTarget.childNodes.length === 0 || currentDisk.offsetWidth < event.currentTarget.lastChild.offsetWidth){
    event.currentTarget.appendChild(currentDisk)
    count++
    document.querySelector(".game--grass").innerText =`Total de movimentos: ${count}`
    }else if(currentDisk.offsetWidth > event.currentTarget.lastChild.offsetWidth){
        modalRegras.classList.remove("displayNone")
        function hide(){
            modalRegras.classList.add("displayNone")
        }
        setTimeout(hide,3000)
    }
    if(towersArray[2].childNodes.length === toWin){
        modalVitoria.classList.remove("displayNone")
    }
}

function reset(){
    for(let i=0;i<defaultPosition.length;i++){
       towersArray[0].appendChild(defaultPosition[i])
    }
    modalVitoria.classList.add("displayNone")
    count = 0
    document.querySelector(".game--grass").innerText =`Total de movimentos: ${count}`
}

function changeOtherDifficult(){
    main.innerHTML = ""
    selectDificultPop.classList.remove("displayNone")
    main.style.height = "0px"
}
