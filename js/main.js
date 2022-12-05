'use strict'

var gQuests
var gCurrQuestIdx
var gCountCorrect
var gElRestartBtn
var gElStartBtn
var gElModal
var gElBox
var gElAnswers

function onInit() {
    gElRestartBtn = document.querySelector('.restartBtn')
    gElStartBtn = document.querySelector('.startBtn')
    gElModal = document.querySelector('.modal')
    gElBox = document.querySelector('.box')
    gElAnswers = document.querySelector('.answers')
    gElModal.style.display = 'none'
    gElRestartBtn.style.display = 'none'
    createQuests()
}

function onStartGame() {
    gElModal.style.display = 'none'
    gElRestartBtn.style.display = 'none'
    gElBox.style.display = 'block'
    gElAnswers.style.display = 'block'
    gCurrQuestIdx = 0
    gCountCorrect = 0
    renderQuest()
}

function createQuests() {
    gQuests = [
        { id: 0, opts: ['Puss in boots', 'Bad kitty!'], correctOptIndex: 1 },
        { id: 1, opts: ['Astronaut', 'Moon walk'], correctOptIndex: 0 },
        { id: 2, opts: ['Just Do It!', 'Tom and Jerry'], correctOptIndex: 1 },
        { id: 3, opts: ['Chilling sloth', 'A day at the beach'], correctOptIndex: 0 },
        { id: 4, opts: ['My dog can\'t see!', 'Clifford'], correctOptIndex: 0 },
        { id: 5, opts: ['Kung Fu Panda', 'Mulan'], correctOptIndex: 1 },
        { id: 6, opts: ['Hippo Hugs', 'Sleepy baby'], correctOptIndex: 0 }
    ]
}

function renderQuest() {

    // Show current answer options
    var strHTML = ''
    const optsLength = gQuests[gCurrQuestIdx].opts.length
    for (var i = 0; i < optsLength; i++) {
        const ans = gQuests[gCurrQuestIdx].opts[i]
        const correctAns = gQuests[gCurrQuestIdx].correctOptIndex === i 
        strHTML += `<button onclick="onCellClicked(this, ${correctAns})">${ans}</button>`
    }
    gElAnswers.innerHTML = strHTML
    // Show current image
    const elImg = document.querySelector('.question')
    elImg.src = `img/${gCurrQuestIdx}.jpeg`
    
}

function onCellClicked(elAns, correctAns) {
    if (gCurrQuestIdx === gQuests.length - 1) { 
        
        // If this was the final round
        gElBox.style.display = 'none'
        // If won
        if (gCountCorrect >= gQuests.length / 2) {
            gElModal.style.display = 'block'
            const audio = new Audio('sound/win.mp3')
            audio.play()
        }
        gElRestartBtn.style.display = 'block'
        gElStartBtn.style.display = 'none'

    } else if (correctAns) { 
        
        // If the answer is correct
        const audio = new Audio('sound/right.mp3')
        audio.play()
        elAns.style.backgroundColor = 'green'
        gCurrQuestIdx++
        gCountCorrect++
        setTimeout(renderQuest, 100)

    } else { 
        
        // If the answer is incorrect
        const audio = new Audio('sound/wrong.mp3')
        audio.play()
        elAns.style.backgroundColor = 'red'
        gCurrQuestIdx++
        setTimeout(renderQuest, 100)

    }
}




