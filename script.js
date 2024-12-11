// JavaScript dalis - script.js
function parseTime(input) {
    const timeRegex24 = /^([01]?\d|2[0-3]):([0-5]\d)$/;
    const timeRegex12 = /^(1[0-2]|0?\d):([0-5]\d)\s?(AM|PM)$/i;

    if (timeRegex24.test(input)) {
        return input; // Jau yra 24 valandų formatas
    } else if (timeRegex12.test(input)) {
        const [, hours, minutes, period] = timeRegex12.exec(input);
        let hours24 = parseInt(hours, 10);

        if (period.toUpperCase() === 'PM' && hours24 !== 12) {
            hours24 += 12;
        } else if (period.toUpperCase() === 'AM' && hours24 === 12) {
            hours24 = 0;
        }

        return `${hours24.toString().padStart(2, '0')}:${minutes}`;
    } else {
        throw new Error('Neteisingas laiko formatas. Naudokite 24 valandų formatą arba AM/PM.');
    }
}

document.getElementById('calculateBtn').addEventListener('click', function() {
    try {
        const startTimeInput = document.getElementById('startTime').value;
        const startDate = document.getElementById('startDate').value;
        const endTimeInput = document.getElementById('endTime').value;
        const endDate = document.getElementById('endDate').value;

        if (!startTimeInput || !startDate || !endTimeInput || !endDate) {
            alert('Prašome užpildyti visus laukus.');
            return;
        }

        const startTime = parseTime(startTimeInput);
        const endTime = parseTime(endTimeInput);

        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${endDate}T${endTime}`);

        if (endDateTime < startDateTime) {
            alert('Pabaigos laikas negali būti anksčiau už pradžios laiką.');
            return;
        }

        const diffMs = endDateTime - startDateTime; // Skirtumas milisekundėmis
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('result').textContent = `Rezultatas: ${diffHours} val. ir ${diffMinutes} min.`;
    } catch (error) {
        alert(error.message);
    }
});

document.getElementById('showFormulaBtn').addEventListener('click', function() {
    const formula = document.getElementById('formula');
    formula.style.display = formula.style.display === 'none' ? 'block' : 'none';
});
