export const questions = []

const randomNum = (min, max) => {
    return Math.trunc(Math.random() * (max - min) + min)
}

const symbols = ["+","-", "/", "*"]

const generateQuestion = () => {
    let firstPart = randomNum(5,99)
    const symbol = symbols[randomNum(0,3)]
    let lastPart = randomNum(5,99)
    if (symbol === "/") {
        if (lastPart === 1) {
           lastPart = randomNum(3,6)
        }
        firstPart = lastPart * randomNum(1,70)
    }

    if (symbol === "-" && lastPart >= firstPart) {
        firstPart += firstPart * randomNum(2,4)
    }

    return {
        question: `${firstPart} ${symbol} ${lastPart}`,
        answer: function () {
            if (symbol === "+") {
                return firstPart + lastPart
            } else if (symbol === "-") {
                return firstPart - lastPart
            } else if (symbol === "*") {
                return firstPart * lastPart
            } else if (symbol === "/") {
                return firstPart / lastPart
            }
        }
    }
}

for (let index = 0; index < 20 ; index++) {
    let questionObj = generateQuestion()
    const newObj = {
        question: questionObj.question,
        answer: questionObj.answer(),
        // response: Number(answerInput),
        response: "NOT ANSWERED",
        correct: false
    }
    questions.push(newObj)
}