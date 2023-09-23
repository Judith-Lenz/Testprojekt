// sowas hier nennt sich JSON Array
let bundeslaender = [
    {
        "name": "Baden-Württemberg",
        "population": 11.1,
        "url": "https://www.baden-wuerttemberg.de/de/startseite/",
        "comments": []
    },
    {
        "name": "Bayern",
        "population": 13.1,
        "url": "https://www.bayern.de/",
        "comments": ['Tolles Wetter und gute Wander-Routen', 'München ist eine schöne Stadt']
    },
    {
        "name": "Berlin",
        "population": 3.7,
        "url": "https://www.berlin.de/",
        "comments": []
    },
    {
        "name": "Brandenburg",
        "population": 2.5,
        "url": "https://www.brandenburg.de/",
        "comments": []
    },
    {
        "name": "Bremen",
        "population": 0.7,
        "url": "https://www.bremen.de/",
        "comments": ['Die Stadtmusikanten haben mir schon immer gefallen!']
    },
    {
        "name": "Hamburg",
        "population": 1.8,
        "url": "https://www.hamburg.de/",
        "comments": ['Ein wirklich tolles Bundesland']
    },
    {
        "name": "Hessen",
        "population": 6.3,
        "url": "https://www.hessen.de/",
        "comments": []
    },
    {
        "name": "Mecklenburg-Vorpommern",
        "population": 1.6,
        "url": "https://www.mecklenburg-vorpommern.de/startseite/",
        "comments": []
    },
    {
        "name": "Niedersachsen",
        "population": 8,
        "url": "https://www.niedersachsen.de/startseite/",
        "comments": []
    },
    {
        "name": "Nordrhein-Westfalen",
        "population": 17.9,
        "url": "https://www.land.nrw/",
        "comments": []
    },
    {
        "name": "Rheinland-Pfalz",
        "population": 4.1,
        "url": "https://www.rlp.de/de/startseite/",
        "comments": []
    },
    {
        "name": "Saarland",
        "population": 1,
        "url": "https://www.saarland.de/DE/home/home_node.html",
        "comments": []
    },
    {
        "name": "Sachsen",
        "population": 4.1,
        "url": "https://www.sachsen.de/",
        "comments": []
    },
    {
        "name": "Sachsen-Anhalt",
        "population": 2.2,
        "url": "https://www.sachsen-anhalt.de/startseite/",
        "comments": []
    },
    {
        "name": "Schleswig-Holstein",
        "population": 2.9,
        "url": "https://www.schleswig-holstein.de/DE/Home/home_node.html",
        "comments": []
    },
    {
        "name": "Thüringen",
        "population": 2.1,
        "url": "https://thueringen.de/",
        "comments": []
    }
];

// diese folgende Funktion leert zunächst das div mit der id content. Dann wird in der for Schleife das JASON Array bundeslaender
// durch iteriert und in die geleerte div eingefügt und man will zwar auf das array bundeslaender zugreifen, aber auch auf einzelne Felder darin. 
// das macht man indem man den sogenannten Schlüssel so angibt, hier am Beispiel "name": ['name']. siehe Zeile 116
// hier wurde dafür dem array die constante land gegeben, man kann es daher so schreiben wie unten oder
// sowas würde auch gehen: <h2>${bundeslaender[i]['name']}</h2>  
// sowas hier: bundeslaender[i['name]] geht nämlich NICHT.
// wenn man jetzt zusätzlich auch noch die population sehen möchte, geht sowas hier nicht: <h2>${land['name']['population']}</h2>, dann kommt undefined raus.
// das muss man dann mit einer extra Zeile lösen, z.B.: <h3>${land['population']}</h3>
function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let i = 0; i < bundeslaender.length; i++) {
        const land = bundeslaender[i];
        content.innerHTML += /*html*/`
            <div class="card">
                <h2>${land['name']}</h2> 
                <h3>${land['population']} Mio. Einwohner</h3>
<!-- das hier <div id="landcontent${i}">${land['comments']}</div> war eine schöne Idee, aber so sind beim neu laden der Seite immer alle comments in einer div und nur durch Komma getrennt und das wollen wir ja nicht
daher die extra for Schleife darunter. So bekommt jeder Kommentar eine extra div und alle Kommentare werden untereinander angezeigt. -->
                <div id="landcontent${i}"></div>  
                <input id="input${i}" type="text"><button onclick="addComment(${i})">OK</button>
            </div>
            
        `;
// hier defnieren wir jetzt eine neue Variable, nämlich landcontent mit i (achte auf die rückwärts gerichteten Anführungszeichen).
// d.h. wir haben die id oben mit einer Variablen versehen (siehe Zeile 120). und da rein
        let landcontent = document.getElementById(`landcontent${i}`);
        // hier darf die Variable jetzt nicht mehr i heißen, weil wir die oben ja schon haben.
        for (let j = 0; j < land['comments'].length; j++) {
            const comment = land['comments'][j];
            landcontent.innerHTML += `<div>${comment}</div>`;
        }
    }



}

// aber wie greift man auf das array im array zu (hier die "comments":[])? also noch ein container(z.B. mit der id="landcontent") in jedem container, in den die Kommentare rein kommen sollen
// dieser container wird zwar mit generiert in der for Schleife, aber jeder container hat dann dieselbe id, nämlich landcontent.
// die id muss aber ja bei jedem container dann eine andere sein, sonst weiß der browser nicht zu welcher id er was einfügen soll.
// das kann man lösen, indem man der id einfach die Variable i hinzufügt.
// Dann bekommt jeder container eine andere id, nämlich landcontent0, landcontent1, usw.
// Dasselbe gilt fürs inputFeld.

// jetzt wollen wir die Kommentare in die div mit der id landcontent rendern.
// ich habe das in Zeile 118 folgendermaßen gelöst: ${land['comments']}   in die div rein. Junus macht hier was anderes, nämlich eine weitere for Schleife (siehe Musterlösung)

// Jetzt wollen wir noch neue Kommentare hinzufügen können mit Klick auf den Ok Button:
// man kann übrigens das .value bei der Variablen (hier:input) auch weglassen und im push einfach einfügen, also so: .push(input.value)
function addComment(index) {
    let input = document.getElementById(`input${index}`).value;
    bundeslaender[index]['comments'].push(input);


    // so wir das ganze aber noch nicht hinzugefügt! es ist nur über die console sichtbar, dass ein weiterer Kommentar hinzugefügt wurde (gib in die console einfach bundeslaender ein und 2x enter, dann auf den kleinen Pfeil)
    // aber es wird immer noch nicht angezeigt, weil wir noch keinen html code erzeugt haben, dafür brauchen wir wieder die render function
    // also die render function noch einfügen und fertig.
    render();

}