const game = document.querySelector(".game")
let currentDisk = 0
let count = 0
const modalVitoria = document.getElementById('modalVitoria')
const modalRegras = document.getElementById('modalRegras')
const buttonReset = document.querySelectorAll("button")[3]
const main = document.querySelector("main")
const selectDificultPop = document.querySelector(".selectDificult")
selectDificultPop.addEventListener("click", selectDificult)
const defaultPosition = []
const towersArray = []

// cria os discos e as torres //
function createGame(diskNumber = 3) {

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
        }
        main.appendChild(div)
    }
}

function selectDificult(event){
    if(event.target.classList.contains("dificcult")){
        let difficult = event.target.innerText
        if(difficult==="Easy"){
            createGame(3)
        }else if(difficult==="Normal"){
            createGame(4)
        }else if(difficult==="Hard"){
            createGame(5)
        }
        selectDificultPop.classList.add("displayNone")
    }
}

// createGame()

// cria funcionalidades do jogo // 

// const tower1 = document.getElementsByClassName("game--towers")[0]
// const tower2 = document.getElementsByClassName("game--towers")[1]
// const tower3 = document.getElementsByClassName("game--towers")[2]

// tower1.addEventListener("click", getDisk)
// tower2.addEventListener("click", getDisk)
// tower3.addEventListener("click", getDisk)
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
    if(towersArray[2].childNodes.length === 3){
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
