const examVragen = [
    {
        vraag: 'Wat is 5 * 3?',
        opties: ['8', '15', '20', '18'],
        juist: 1
    },
    {
        vraag: 'Hoeveel provincies heeft Vlaanderen?',
        opties: ['4', '5', '6', '7'],
        juist: 1
    }
];
let examIndex = 0;
let antwoorden = [];
let timer;

function startExam() {
    examIndex = 0;
    antwoorden = new Array(examVragen.length).fill(null);
    toonExamVraag();
    startTimer(15 * 60); // 15 minuten
}

function startTimer(seconden) {
    const timerSpan = document.getElementById('timer');
    timer = setInterval(() => {
        if (seconden <= 0) {
            clearInterval(timer);
            eindeExam();
        } else {
            seconden--;
            const min = Math.floor(seconden / 60);
            const sec = seconden % 60;
            timerSpan.innerText = `${min}:${sec.toString().padStart(2,'0')}`;
        }
    }, 1000);
}

function toonExamVraag() {
    const v = examVragen[examIndex];
    document.getElementById('exam-question').innerText = v.vraag;
    const opts = document.getElementById('exam-options');
    opts.innerHTML = '';
    v.opties.forEach((opt, i) => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'antwoord';
        radio.value = i;
        if (antwoorden[examIndex] === i) radio.checked = true;
        label.appendChild(radio);
        label.append(opt);
        opts.appendChild(label);
        opts.appendChild(document.createElement('br'));
    });
}

function volgende() {
    const geselecteerd = document.querySelector('input[name="antwoord"]:checked');
    if (geselecteerd) {
        antwoorden[examIndex] = parseInt(geselecteerd.value);
    }
    if (examIndex < examVragen.length - 1) {
        examIndex++;
        toonExamVraag();
    } else {
        eindeExam();
    }
}

function eindeExam() {
    clearInterval(timer);
    let correct = 0;
    examVragen.forEach((v, i) => {
        if (antwoorden[i] === v.juist) correct++;
    });
    alert('Exam afgewerkt. Score: ' + correct + '/' + examVragen.length);
    let stats = JSON.parse(localStorage.getItem('fm_progress')) || {correct:0,total:0};
    stats.correct += correct;
    stats.total += examVragen.length;
    localStorage.setItem('fm_progress', JSON.stringify(stats));
    window.location.href = 'progress.html';
}

function calculate() {
    const a = parseFloat(document.getElementById('calc-a').value);
    const b = parseFloat(document.getElementById('calc-b').value);
    const op = document.getElementById('calc-op').value;
    let result = 0;
    if (op === '+') result = a + b;
    if (op === '-') result = a - b;
    if (op === '*') result = a * b;
    if (op === '/') result = a / b;
    document.getElementById('calc-result').value = result;
}

document.addEventListener('DOMContentLoaded', () => {
    startExam();
});
