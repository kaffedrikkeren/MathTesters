const max1 = 20;
const max2 = 20;

function getNumber1() {
    return getRandom(0, max1);
}

function getNumber2() {
    return getRandom(0, max2);
}

function isAnswerCorrect(input1, input2, output) {
    return output == input1 + input2;
}
