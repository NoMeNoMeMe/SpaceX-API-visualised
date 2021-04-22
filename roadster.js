/*jshint esversion: 8*/
async function loadData() {
  var fetchPromise = fetch('https://api.spacexdata.com/v4/roadster');
  fetchPromise.then(response => {
    return response.json();
  }).then(data => {
    pics(data.flickr_images);
    info(data.details);
    distanceEarth(data.earth_distance_km);
    distanceMars(data.mars_distance_km);
    launchDate(data.launch_date_unix);
  });
}

function pics(data) {
  let pics = document.getElementById('pics');
  for (let i in data) {
    pics.innerHTML += `<a class="image_link" href="${data[i]}" target="_blank"><img class="image" src="${data[i]}" alt="space tesla"/></a>`;
  }
}

function info(data) {
  let info = document.getElementById('info');
  info.innerHTML = data;
}

function distanceEarth(data) {
  let distance = document.getElementById('distanceEarth');
  distance.innerHTML = `Current distance to Earth: ${data} km`;
}

function distanceMars(data) {
  let distance = document.getElementById('distanceMars');
  distance.innerHTML = `Current distance to Mars: ${data} km`;
}

function launchDate(data) {
  let date = new Date(data * 1000);
  let date_html = document.getElementById('date');
  date_html.innerHTML = `Launch date: ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}


window.addEventListener('load', loadData);


/* Pracujesz nad aplikacją, która będzie wyświetlała dane o ostatnich poczynaniach wizjonerskiej firmy SpaceX. Twoja aplikacja powinna łączyć się z otwartym, darmowym i fanowskim API SpaceX API:

https://github.com/r-spacex/SpaceX-API/

Dokumentacja:

https://github.com/r-spacex/SpaceX-API/blob/master/docs/v4/README.md

Przygotuj podstrony, na których wyświetlisz:

    Informacje o Starlinkach
        identyfikatory,
        nazwę,
        datę wystrzelenia,
    Informacje o rakietach
        nazwę,
        wymiary i wagę,
        obraz je prezentujący,
        opis,
        datę pierwszego lotu,
        koszt wystrzału,
        informację czy jest nadal w użyciu,
        informacje o silniku/ach
            siła ciągu,
            typ,
            stosunek ciągu do wagi,
    Informację o wystrzelonym samochodzie Tesli
        odległość od ziemi,
        odległość od marsa,
        datę wystrzału,
        opis,
        obrazy,

Zadbaj o wygląd przy pomocy arkuszy styli i aby aplikacja była responsywna. Tam gdzie to możliwe wyświetlaj na liście podstawowe dane i szczegóły dopiero po kliknięciu na interesujący czytelnika element. Zadbaj o paginację czyli możliwość dzielenia listy na kolejne strony. Pojedyncza strona powinna mieścić 10 elementów. W przypadku 121 elementów powinno być 13 stron z 1 elementem na ostatniej.
*/
