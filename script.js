const zahlInput = document.getElementById('zahlInput');
const splitButton = document.getElementById('splitButton');
if (zahlInput) {
    zahlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { 
            e.preventDefault(); 
            splitButton.click(); 
        }
    });
}

function aufteilen() {
    const zahl = parseInt(document.getElementById('zahlInput').value);
    const maxPotenz = parseInt(document.getElementById('maxPotenz').value);
    if (isNaN(zahl) || zahl < 0 || isNaN(maxPotenz) || maxPotenz < 0) {
        document.getElementById('ergebnis').innerText = 'Bitte geben Sie gültige positive Zahlen ein.';
        return;
    }
    let rest = zahl;
    let ergebnis = '';
    let potenz = maxPotenz;
    let teile = [];
    while (rest > 0 && potenz >= 1) {
        const anzahl = Math.floor(rest / potenz);
        if (anzahl > 0) {
            teile.push(potenz + ' * ' + anzahl);

            const wert = anzahl * potenz;
            rest -= wert;
        } else {
            //teile.push('0*' + wert);
        }
        potenz /= 2;
    }

    ergebnis += teile.join('\n');
    if (rest > 0) {
        ergebnis +='\n(Rest: ' + rest + ')';
    }
    document.getElementById('summe').innerText = zahl;
    document.getElementById('ergebnis').innerText = ergebnis;
}