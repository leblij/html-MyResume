const vragen = [
    {
        vraag: 'Wat is 2 + 2?',
        opties: ['3', '4', '5', '6'],
        juist: 1
    },
    {
        vraag: 'Wat is de hoofdstad van Belgi\u00eb?',
        opties: ['Antwerpen', 'Gent', 'Brussel', 'Luik'],
        juist: 2
    }
];
let index = 0;
let correct = 0;

function toonVraag() {
    if (index >= vragen.length) {
        alert('Training voltooid. Juist: ' + correct + '/' + vragen.length);
        let stats = JSON.parse(localStorage.getItem('fm_progress')) || {correct:0,total:0};
        stats.correct += correct;
        stats.total += vragen.length;
        localStorage.setItem('fm_progress', JSON.stringify(stats));
        return;
    }
    const v = vragen[index];
    document.getElementById('question').innerText = v.vraag;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    v.opties.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => antwoord(i);
        optionsDiv.appendChild(btn);
    });
}

function antwoord(i) {
    const v = vragen[index];
    if (i === v.juist) {
        alert('Correct!');
        correct++;
    } else {
        alert('Fout. Het juiste antwoord is ' + v.opties[v.juist]);
    }
    index++;
    toonVraag();
}

document.addEventListener('DOMContentLoaded', toonVraag);
