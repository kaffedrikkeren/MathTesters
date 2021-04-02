const max1 = 10;
const max2 = 9;

function getNumber1(number2) {
    return number2 * getRandom(0, max1);
}

function getNumber2() {
    return getRandom(0, max2) + 1;
}

function isAnswerCorrect(input1, input2, output) {
    return output == input1 / input2;
}
