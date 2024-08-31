
let bodyEl = document.querySelector("body")
let inputEl = document.getElementById("input")
let containerEl = document.getElementById("container")

const data = {
    queue: [],
    lifts: [],
    floors: []
}

// open lifts door
function openDoor() {
    let liftEl = document.getElementById("lift-1")
    let leftDoorEl = liftEl.querySelector(".left-door")
    let rightDoorEl = liftEl.querySelector(".right-door")

    leftDoorEl.style.transform = "translateX(-100%)"
    rightDoorEl.style.transform = "translateX(100%)"

    setTimeout(closeDoor, 2500)
}

// close lifts door
function closeDoor() {
    let liftEl = document.getElementById("lift-1")
    let leftDoorEl = liftEl.querySelector(".left-door")
    let rightDoorEl = liftEl.querySelector(".right-door")

    leftDoorEl.style.transform = "translateX(0%)"
    rightDoorEl.style.transform = "translateX(0%)"

    setTimeout(() => data.lifts[0].isMoving = false, 2500)
}

// add floor and lift
function addFloor(floorNo, liftNo) {
    for (let no = floorNo; no >= 1; no--) {
        let floorDiv = document.createElement("div")
        floorDiv.setAttribute("class", "floor")

        let newDiv = document.createElement("div")
        let floorBtnDiv = document.createElement("div")

        floorBtnDiv.setAttribute("class", "floor-btns")

        // in case of topmost floor
        if (floorNo === no) {
            floorBtnDiv.innerHTML = `<button onClick={moveLift(${no},-1)}>
                                <span class="material-symbols-outlined" style="color: red;">
                                    keyboard_arrow_down
                                </span>
                            </button>
                            <h2 class="">floor ${no}</h2>`
        } else if (no === 1) {
            // in case of first floor

            floorBtnDiv.innerHTML = `<button onClick={moveLift(${no},1)}>
                                <span class="material-symbols-outlined" style="color: green;">
                                    keyboard_arrow_up
                                </span>
                            </button>
                            <h2 class="">floor ${no}</h2>`
        } else {
            floorBtnDiv.innerHTML = `<button onClick={moveLift(${no},1)}>
                                <span class="material-symbols-outlined" style="color: green;">
                                    keyboard_arrow_up
                                </span>
                            </button>
                            <button onClick={moveLift(${no},-1)}>
                                <span class="material-symbols-outlined" style="color: red;">
                                    keyboard_arrow_down
                                </span>
                            </button>
                            <h2 class="">floor ${no}</h2>`
        }

        newDiv.appendChild(floorBtnDiv)

        // place lifts in first floor intially
        if (no === 1) {
            let floorLiftsDiv = document.createElement("div")
            floorLiftsDiv.setAttribute("class", "floor-lifts")

            for (let lift = 1; lift <= liftNo; lift++) {
                floorLiftsDiv.innerHTML += `<p class="lift" id="lift-${lift}">
                            <span class="left-door"></span>
                            <span class="right-door"></span>
                        </p>`

                data.lifts.push({
                    liftNo: lift,
                    currentFloor: 1,
                    direction: 1,
                    isMoving: false
                })
            }

            newDiv.appendChild(floorLiftsDiv)
        }

        let hrEl = document.createElement("hr")
        floorDiv.appendChild(newDiv)
        floorDiv.appendChild(hrEl)

        containerEl.appendChild(floorDiv)
    }
}

// move lift using the queue
function moveLift(floorNo, direction) {
    let liftEl = document.getElementById(`lift-1`)
    let distance = Math.abs(floorNo - data.lifts[0].currentFloor);
    console.log("move lift dis:", distance, " floor: ", floorNo)

    let isLiftMoving = data.lifts[0].isMoving;
    if (isLiftMoving) {
        return;
    }

    data.lifts[0].isMoving = true
    liftEl.style.transform = `translateY(calc(-134.5% * ${floorNo - 1}))`
    liftEl.style.transition = `all ${distance * 2}s ease-in-out`

    setTimeout(() => {
        openDoor();

        data.lifts[0].currentFloor = floorNo
    }, `${distance * 2 * 1000}`)
}

function createFloorAndLift(e) {
    e.preventDefault()

    let floorEl = document.getElementById("floor")
    let liftEl = document.getElementById("lift")

    let floorVal = floorEl.value;
    let liftVal = liftEl.value;

    if (!floorVal || !liftVal) {
        alert("floor and lift can't be zero")
        return;
    }
    if (floorVal <= 1) {
        alert("Floors need to be more than 1")
        return;
    }
    if (liftVal < 1) {
        alert("Lifts need to be more than 0")
        return;
    }

    bodyEl.removeChild(inputEl)

    addFloor(floorVal, liftVal)
}

inputEl.addEventListener("submit", createFloorAndLift)