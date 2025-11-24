const hrs = document.querySelector("#inpH");
const min = document.querySelector("#inpM");
const sec = document.querySelector("#inpS");

const btn = document.querySelector("#btn");

let timer;
let isRunning = false;

btn.addEventListener("click", () => {

    if (isRunning) {
        clearInterval(timer)
        hrs.value = "00";
        min.value = "00";
        sec.value = "00";
        btn.innerHTML = "Start";
        isRunning = false;
        // console.log("HI")
        return;
    }

    let hours = parseInt(hrs.value) || 0;
    let minutes = parseInt(min.value) || 0;
    let seconds = parseInt(sec.value) || 0;

    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds <= 0) return;

    btn.innerHTML = "Stop";
    isRunning = true;

    timer = setInterval(() => {

        if (totalSeconds <= 0) {
            clearInterval(timer);
            alert("Countdown Finished");
            return;
        }

        totalSeconds--;

        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        hrs.value = String(h).padStart(2, "0");
        min.value = String(m).padStart(2, "0");
        sec.value = String(s).padStart(2, "0");

    }, 1000)

})