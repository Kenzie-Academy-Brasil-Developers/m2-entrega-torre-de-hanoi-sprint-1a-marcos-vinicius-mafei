function createGame(diskNumber = 3){
    const game = document.querySelector(".game")
    for(let towers = 0; towers < 3;towers++){
    const tower = document.createElement("div")
    if(towers === 0){
        for(let i = 0; i < diskNumber; i++){
            const disk = document.createElement("div")
            disk.classList.add("disk"+(diskNumber-i))
            disk.classList.add("disks")
            tower.appendChild(disk)
        }
    }
    tower.classList.add("game--towers")
    game.appendChild(tower)
    }
}