// cria os discos e as torres //

const game = document.querySelector(".game")
let currentDisk = 0

function createGame(diskNumber = 3) {

    for (let towers = 0; towers < 3; towers++) {
        const tower = document.createElement("div")
        if (towers === 0) {
            for (let i = 0; i < diskNumber; i++) {
                const disk = document.createElement("div")
                disk.classList.add("disk" + (diskNumber - i))
                disk.classList.add("disks")
                tower.appendChild(disk)
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
    }
}