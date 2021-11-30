const game = document.querySelector(".game")
let currentDisk = 0
let count = 0
let movimentsCount = document.getElementsByClassName("game--grass")[0]
const modalVitoria = document.getElementById('modalVitoria')
const modalRegras = document.getElementById('modalRegras')
const button = document.querySelector("button")
const defaultPosition = []
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
        game.appendChild(tower)
    }
}

createGame()

// cria funcionalidades do jogo // 

const tower1 = document.getElementsByClassName("game--towers")[0]
const tower2 = document.getElementsByClassName("game--towers")[1]
const tower3 = document.getElementsByClassName("game--towers")[2]

tower1.addEventListener("click", getDisk)
tower2.addEventListener("click", getDisk)
tower3.addEventListener("click", getDisk)
button.addEventListener("click", reset)

function getDisk(event) {
    currentDisk = event.currentTarget.lastChild
    tower1.removeEventListener("click", getDisk)
    tower2.removeEventListener("click", getDisk)
    tower3.removeEventListener("click", getDisk)
    tower1.addEventListener("click", moveDisk)
    tower2.addEventListener("click", moveDisk)
    tower3.addEventListener("click", moveDisk)
}


function moveDisk(event) {
    tower1.removeEventListener("click", moveDisk)
    tower2.removeEventListener("click", moveDisk)
    tower3.removeEventListener("click", moveDisk)
    tower1.addEventListener("click", getDisk)
    tower2.addEventListener("click", getDisk)
    tower3.addEventListener("click", getDisk)
    if(event.currentTarget.childNodes.length === 0 || currentDisk.offsetWidth < event.currentTarget.lastChild.offsetWidth){
    event.currentTarget.appendChild(currentDisk)
    count++
    movimentsCount.innerText =`Total de movimentos: ${count}`
    }else if(currentDisk.offsetWidth > event.currentTarget.lastChild.offsetWidth){
        modalRegras.classList.remove("displayNone")
        function hide(){
            modalRegras.classList.add("displayNone")
        }
        setTimeout(hide,3000)
    }
    if(tower3.childNodes.length === 3){
        modalVitoria.classList.remove("displayNone")
    }
}

function reset(){
    for(let i=0;i<defaultPosition.length;i++){
        tower1.appendChild(defaultPosition[i])
    }
    modalVitoria.classList.add("displayNone")
    count = 0
    movimentsCount.innerText =`Total de movimentos: ${count}`
}
