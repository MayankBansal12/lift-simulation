
let floorEl = document.getElementById("floor")
let liftEl = document.getElementById("lift")

function generate(e) {
    e.preventDefault()
    let floorVal = floorEl.value;
    let liftVal = liftEl.value;

    if (!floorVal || !liftVal) {
        alert("floor and lift can't be zero")
        return;
    }

    

}