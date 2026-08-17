const przyciskTryb = document.getElementById("tryb");
const formularz = document.getElementById("formularz");
const przyciskFormularza =
    document.getElementById("pokaz-formularz");
const komunikat = document.getElementById("komunikat");


przyciskTryb.addEventListener("click", function () {

    document.body.classList.toggle("jasny");

    if (document.body.classList.contains("jasny")) {
        przyciskTryb.textContent = "🌙";
    } else {
        przyciskTryb.textContent = "☀️";
    }

});


przyciskFormularza.addEventListener("click", function () {

    if (formularz.style.display === "block") {
        formularz.style.display = "none";
    } else {
        formularz.style.display = "block";
    }

});


formularz.addEventListener("submit", function (event) {

    event.preventDefault();

    komunikat.textContent =
        "Dziękuję za wiadomość! 🚀";

    komunikat.style.color = "#4ade80";

    formularz.reset();

});

const inputZadanie = document.getElementById("zadanie");
const przyciskDodaj = document.getElementById("dodaj-zadanie");
const listaZadan = document.getElementById("lista-zadan");

let zadania = JSON.parse(localStorage.getItem("zadania")) || [];

pokazZadania();

przyciskDodaj.addEventListener("click", dodajZadanie);

inputZadanie.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        dodajZadanie();
    }
});

function dodajZadanie() {

    const tekst = inputZadanie.value.trim();

    if (tekst === "") {
        return;
    }

    zadania.push(tekst);

    zapiszZadania();
    pokazZadania();

    inputZadanie.value = "";
}

function pokazZadania() {

    listaZadan.innerHTML = "";

    zadania.forEach(function (tekst, index) {

        const zadanie = document.createElement("li");

        zadanie.innerHTML = `
            <span>${tekst}</span>
            <button class="usun">Usuń</button>
        `;

        zadanie
            .querySelector(".usun")
            .addEventListener("click", function () {

                zadania.splice(index, 1);

                zapiszZadania();
                pokazZadania();
            });

        listaZadan.appendChild(zadanie);
    });
}

function zapiszZadania() {
    localStorage.setItem(
        "zadania",
        JSON.stringify(zadania)
    );
}