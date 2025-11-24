const hrs = document.querySelector("#inpH");
const min = document.querySelector("#inpM");
const sec = document.querySelector("#inpS");

const btn = document.querySelector("#btn");
const pauseBtn = document.querySelector("#pause");
const inputs = [hrs, min, sec]

let timer;
let isRunning = false;

// btn.style.backgroundColor = "green";

btn.addEventListener("click", () => {

    if (!inputs.some(input => input.value)) {
        alert("please set timer!")
        return;
    }

    if (isRunning) {
        clearInterval(timer)
        hrs.value = "";
        min.value = "";
        sec.value = "";
        btn.innerHTML = "Start";

        btn.classList.remove("btn-danger");
        btn.classList.add("btn-success");

        isRunning = false;
        // console.log("HI")
        inputs.forEach(input => input.disabled = false);
        inputs.forEach(input => input.classList.add("bg-white"))

        return;
    }

    let hours = parseInt(hrs.value) || 0;
    let minutes = parseInt(min.value) || 0;
    let seconds = parseInt(sec.value) || 0;

    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds <= 0) return;

    btn.innerHTML = "Stop";

    btn.classList.remove("btn-success");
    btn.classList.add("btn-danger");

    isRunning = true;

    inputs.forEach(input => input.disabled = true);
    inputs.forEach(input => input.classList.add("bg-white"))

    timer = setInterval(() => {

        if (totalSeconds <= 0) {
            clearInterval(timer);
            alert("Countdown Finished");

            inputs.forEach(input => input.disabled = false);
            inputs.forEach(input => input.classList.add("bg-white"))

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

pauseBtn.addEventListener("click", () => {
    if (!isRunning) return;
    clearInterval(timer);
    console.log("first")
    isRunning = false;
    btn.innerHTML = "Start";

    btn.classList.remove("btn-danger");
    btn.classList.add("btn-success");

    inputs.forEach(input => input.disabled = false);
    inputs.forEach(input => input.classList.add("bg-white"))
})