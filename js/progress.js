function toonProgress() {
    const stats = JSON.parse(localStorage.getItem('fm_progress')) || {correct:0,total:0};
    const percent = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;
    document.getElementById('progress-info').innerText = `Totaal juist: ${stats.correct} van ${stats.total} vragen (${percent}%)`;
}

document.addEventListener('DOMContentLoaded', toonProgress);
