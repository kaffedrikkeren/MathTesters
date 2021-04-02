let number1 = 0, number2 = 0;
let rightAnswers = 0, wrongAnswers = 0, rightAnswersPercent = 0;
let thinkingTime = 0, thinkingTimeMedian = 0;
let thinkingStart = null, thinkingEnd = null;
const thinkingTimes = [];

function median(values) {
    values.sort(function (a, b) {
        return a - b;
    });
    if (values.length === 0) return 0
    const half = Math.floor(values.length / 2);
    if (values.length % 2) {
        return values[half];
    }
    else {
        return (values[half - 1] + values[half]) / 2.0;
    }
}

function isNumberPressed(event) {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
        return true;
    }
    else {
        console.log(event.keyCode);
        return false;
    }
}

function parseAnswerPress(event) {
    if (event.keyCode == 13) {
        checkAnswer();
    } else {
        return isNumberPressed(event);
    }
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function show(id) {
    const imgNum = getRandom(1, 9)
    if (id === 'shockedCat') {
        $("#shockedCat").attr('src', `img/shocked_cat_${imgNum}.jpg`);
    }
    if (id === 'happyCat') {
        $("#happyCat").attr('src', `img/happy_cat_${imgNum}.jpg`);
    }
    $(`#${id}`).removeClass('hidden')
    setTimeout(function () {
        $(`#${id}`).addClass('shown')
    }, 10)
}

function hide(id) {
    $(`#${id}`).attr('src', '').removeClass('shown').addClass('hidden');
}

function recountStats(result) {
    if (result) {
        rightAnswers++;
    }
    else {
        wrongAnswers++;
    }
    rightAnswersPercent = rightAnswers / (wrongAnswers + rightAnswers) * 100;
    thinkingEnd = new Date();
    thinkingTime = (thinkingEnd - thinkingStart) / 1000;
    thinkingTimes.push(thinkingTime);
    thinkingTimeMedian = median(thinkingTimes);
}

function updateStats() {
    $("#rightAnswers").text(rightAnswers);
    $("#wrongAnswers").text(wrongAnswers);
    $("#rightAnswersPercent").text(rightAnswersPercent.toFixed(0));
    $("#thinkingTime").text(thinkingTimeMedian.toFixed(2));
}

function displayNewTask() {
    number2 = getNumber2();
    number1 = getNumber1(number2);
    $("#number1").text(number1);
    $("#number2").text(number2);
    $("#answer").val("");
    thinkingStart = new Date();
    $("#answer").focus();
}

function checkAnswer() {
    var checkResult = isAnswerCorrect(number1, number2, parseInt($("#answer").val()));
    recountStats(checkResult);
    updateStats();
    displayCat(checkResult);
    displayNewTask();
}

function displayCat(result) {
    hide("shockedCat");
    hide("happyCat");
    if (result) {
        show("happyCat");
    } else {
        show("shockedCat");
    }
}

$(document).ready(function() {
    hide("happyCat")
    hide("shockedCat")
    displayNewTask();
});
