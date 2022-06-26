
const pBtn = document.getElementById("btn-p")
const btnContainer = document.getElementById("btn-container")
const formContainerP = document.getElementById("form-p-container")
const formP = document.getElementById("form-p")
const inputX = formP.querySelector('#sequence-x')
const inputY = formP.querySelector('#sequence-y')
let pearsonCoefficient

//logic for button (considering the possibility of adding more functions)
function hideSmth(el) {
    el.classList.add("non-active")
}

function displaySmth(el) {
    el.classList.remove("non-active")
}


pBtn.addEventListener("click", () => {
        hideSmth(btnContainer)
        displaySmth(formContainerP)
})


// math logic
function countAverage(array) {
    let sum = 0
    for(let i = 0; i < array.length; i++) {
        sum += array[i]
    }
    const average = sum / array.length
    return average
}

function countDispersion(array, average) {
    let arraySquares = array.map((el) => {
        return el ** 2
    })
    let sumOfSquares = 0
    for(let i=0; i < arraySquares.length; i++) {
        sumOfSquares += arraySquares[i]
    }

    let dispersion = sumOfSquares/arraySquares.length - average * average 
    console.log(dispersion)
    return dispersion
    
}



function pearsonCount(xArray, yArray) {
    const xAvMultiplyYAv = countAverage(xArray) * countAverage(yArray)
    let multiplyAv = 0
    for(let i = 0; i < xArray.length; i++) {
        multiplyAv += xArray[i] * yArray[i] / xArray.length
    }
    console.log(xAvMultiplyYAv)
    console.log(multiplyAv)

    pearsonCoefficient = (multiplyAv - xAvMultiplyYAv) / ((countDispersion(xArray, countAverage(xArray)) ** 0.5) * (countDispersion(yArray, countAverage(yArray)) ** 0.5)
    )
    return pearsonCoefficient
}



formP.addEventListener("submit", () => {
    let inputXvalue = inputX.value
    let inputYvalue = inputY.value
    inputXvalue = "[" + inputXvalue + "]"
    inputYvalue = "[" + inputYvalue + "]"
    let xArray = JSON.parse(inputXvalue)
    let yArray = JSON.parse(inputYvalue)
    pearsonCount(xArray, yArray)

    document.body.innerHTML = `
    <div class="result-container">
    <h2> Результат для: </h2>
    <p>X = ${inputX.value}</p>
    <p>Y = ${inputY.value}</p>
    <h2>R = ${pearsonCoefficient}</h2>
    </div>
    ` 
})


