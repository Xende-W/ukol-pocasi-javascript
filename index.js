'use strict';

/*
Popis úkolu a podrobný návod najdeš v souboru README.md

Zde následuje tvůj úžasný program! ❤
*/

//const API_KEY = '967de275f47de36e65e9f1e14f1e7b74';   967de275f47de36e65e9f1e14f1e7b74
//const API_BASE = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&lang=cz`;

//https://api.openweathermap.org/data/2.5/weather?appid=967de275f47de36e65e9f1e14f1e7b74&units=metric&lang=cz&q=Brno



const API_KEY = '967de275f47de36e65e9f1e14f1e7b74';
const API_BASE = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&lang=cz`;


const aktualne = document.querySelector("#aktualne")

const pocasiBrno = document.querySelector("#brno");
const pocasiBratislava = document.querySelector("#bratislava");
const pocasiBerlin = document.querySelector("#berlin");

pocasiBrno.addEventListener("click", function() {
	priKliku("brno");
});
pocasiBratislava.addEventListener("click", function() {
	priKliku("bratislava");
});
pocasiBerlin.addEventListener("click", function() {
	priKliku("berlin");
});



function priKliku(mesto) {
	fetch (`${API_BASE}&q=${mesto}`)
	.then(response => response.json())
	.then (zobrazPocasi);
}



function zobrazPocasi (data) {
    let zobraz ="";
    const API_IMG =  `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let vetrik = data.wind.speed;
    let casVychodu = data.sys.sunrise;
    let casZapadu = data.sys.sunset;
    let datumV = new Date(casVychodu * 1000);
    let hodinyV = datumV.getHours(casVychodu);
    let minutyV = datumV.getMinutes(casVychodu);
    let datumZ = new Date(casZapadu * 1000);
    let hodinyZ = datumZ.getHours(casZapadu);
    let minutyZ = datumZ.getMinutes(casZapadu);


    zobraz += `
            <div id="pocasi">

                <h2>${data.name}</h2>

                <div class="prvniUdaje">
                <div class="teplotniUdaje">
                    <span id="teplota">${Math.round(data.main.temp)}</span>
                    <span id="jednotky">°C</span>
                    <div id="popis">${data.weather[0].description}</div>
                </div>
                    <div id="ikona"><img src="${API_IMG}"></div>
                </div>
            
            <div class="druheUdaje">
                    <div class="vitr">
                    <h3>Vítr</h3>
                    <span>${vetrik.toFixed(1)} m/s</span>
                    </div>
                    <div class="vlhkost">
                    <h3>Vlhkost</h3>
                    <span>${data.main.humidity} %</span>
                    </div>
            </div>

                <div class="tretiUdaje">
                <div class="vychodSlunce">
                    <h3>Východ slunce</h3>
                    <span id="vychod">${("0" + hodinyV).slice(-2)} : ${("0" + minutyV).slice(-2)}</span>
                </div>
                <div class="zapadSlunce">
                    <h3>Západ slunce</h3>
                    <span id="zapad">${("0" + hodinyZ).slice(-2)} : ${("0" + minutyZ).slice(-2)}</span>
                </div>
                </div>


            </div>


        `;
        
	aktualne.innerHTML = zobraz;

}


