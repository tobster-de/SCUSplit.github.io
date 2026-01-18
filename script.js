const translations = {
    de: {
        title: "Cargo-Aufteilung",
        h1: "Cargo aufteilen",
        labelZahl: "Anzahl SCUs",
        labelMax: "Max. Container-Größe",
        placeholderZahl: "Anzahl SCUs",
        button: "Aufteilen",
        error: "Bitte geben Sie gültige positive Zahlen ein.",
    },
    en: {
        title: "Cargo Splitting",
        h1: "Split Cargo",
        labelZahl: "Number of SCUs",
        labelMax: "Max. Container Size",
        placeholderZahl: "Number of SCUs",
        button: "Split",
        error: "Please enter valid positive numbers.",
    }
};

const lang = navigator.language.startsWith('de') ? 'de' : 'en';
document.documentElement.lang = lang;
document.title = translations[lang].title;
document.querySelector('h1').innerText = translations[lang].h1;
document.querySelector('label[for="zahlInput"]').innerText = translations[lang].labelZahl;
document.querySelector('label[for="maxPotenz"]').innerText = translations[lang].labelMax;
document.getElementById('zahlInput').placeholder = translations[lang].placeholderZahl;
document.getElementById('splitButton').innerText = translations[lang].button;

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
        document.getElementById('ergebnis').innerText = translations[lang].error;
        document.getElementById('ergebnis').style.display = 'block';
        document.getElementById('summe').style.display = 'none';
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
    document.getElementById('summe').style.display = 'block';
    document.getElementById('ergebnis').innerText = ergebnis;
    document.getElementById('ergebnis').style.display = 'block';
}