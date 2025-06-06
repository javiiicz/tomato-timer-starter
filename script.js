const timerDisplay = document.getElementById('time-left');
let studyCount = 0;
let breakCount = 0;
let currentTimerID = ''
const container = document.querySelector('.container');
let timer = 1500
let isRunning = false;
let session = 'study'

function updateTimerDisplay(minutes, seconds) {
    let padded_seconds = seconds.toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${padded_seconds}`
}

function startTimer() {
    stopTimer()
    setTimer(timer)

    const timerID = setInterval(() => {
        timer -= 1;
        setTimer(timer)
        if (timer < 0) {
            clearInterval(timerID);
            if (session === 'study') {
                startBreakSession()
                startTimer()
            } else {
                startStudySession()
                startTimer()
            }
        }
    }, 1000)
    
    currentTimerID = timerID;
}

function startStudySession() {
    stopTimer()
    timer = 1500
    setTimer(timer);
    studyCount++;
    document.getElementById('study-count').textContent = studyCount;
    session = 'study';
    timerColor()
}

function startBreakSession() {
    stopTimer()
    if (studyCount > 0 && studyCount % 4 == 0) {
        timer = 900
    } else {
        timer = 300
    }
    
    setTimer(timer);
    breakCount++;
    document.getElementById('break-count').textContent = breakCount;
    session = 'break';
    timerColor()
}


function setTimer(duration) {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    updateTimerDisplay(minutes, seconds);
}

function stopTimer() {
    clearInterval(currentTimerID)
}

function timerToggle() {
    if (isRunning) {
        stopTimer()
    }
    else {
        startTimer()
    }
    isRunning = !isRunning
    timerColor()
}

function timerColor() {
    if (!isRunning) {
        container.style.backgroundColor = 'grey'
    }
    else if (session === 'study') {
        container.style.backgroundColor = 'green'
    }
    else if (session === 'break') {
        container.style.backgroundColor = 'red'
    }
}

const studyButton = document.getElementById('study-btn');
studyButton.addEventListener('click', startStudySession)

const breakButton = document.getElementById('break-btn');
breakButton.addEventListener('click', startBreakSession)

const startButton = document.getElementById('start-stop-btn');
startButton.addEventListener('click', timerToggle)

timerColor()