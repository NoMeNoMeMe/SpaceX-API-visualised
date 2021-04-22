/*jshint esversion: 8*/

async function loadData() {
  var fetchPromise = fetch('https://api.spacexdata.com/v4/rockets');
  fetchPromise.then(response => {
    return response.json();
  }).then(data => {
    let main = document.getElementById('main');
    for (let i in data) {
      let div = document.createElement('div');
      div.id = `rocket${i}`;
      div.className = `rocket`;
      let expand = document.createElement('button');
      expand.id = `expand${i}`;
      expand.className = 'expand';
      expand.innerHTML = '<i class="arrow down"></i>MORE INFO<i class="arrow down"></i>';
      let details = document.createElement('div');
      details.id = `rocket_details${i}`;
      details.className = 'details';
      let name = getName(data[i].name, i);
      div.appendChild(name);
      let info = getInfo(data[i].description, i);
      div.appendChild(info);
      div.appendChild(expand);
      let dimensions = getDimensions(data[i].height.meters, data[i].diameter.meters, data[i].mass.kg, i);
      details.appendChild(dimensions);
      let pics = getPics(data[i].flickr_images, i);
      details.appendChild(pics);
      let date = getDate(data[i].first_flight, i);
      details.appendChild(date);
      let price = getPrice(data[i].cost_per_launch, i);
      details.appendChild(price);
      let usage = getUsage(data[i].active, i);
      details.appendChild(usage);
      let engine = getEngine(data[i].engines.number, data[i].engines.thrust_sea_level.kN, data[i].engines.type, data[i].engines.thrust_to_weight, i);
      details.appendChild(engine);
      div.appendChild(details);
      main.appendChild(div);
    }
    document.querySelectorAll('.expand').forEach(but => {
      but.addEventListener('click', more);
    });
  });
}

function getName(data, i) {
  let span = document.createElement('span');
  span.id = `name${i}`;
  span.className = 'name_s';
  let header = document.createElement('h3');
  header.className = `name`;
  header.innerHTML = data;
  span.appendChild(header);
  return span;
}

function getInfo(data, i) {
  let span = document.createElement('span');
  span.id = `info${i}`;
  span.innerHTML = data;
  return span;
}

function getDimensions(height, diameter, mass, i) {
  let span = document.createElement('span');
  span.id = `dimensions${i}`;
  span.innerHTML = `
  Height: ${height} m<br>
  Diameter: ${diameter} m<br>
  Mass: ${mass} kg
  `;
  return span;
}

function getPics(data, i) {
  let span = document.createElement('span');
  span.id = `pics${i}`;
  span.className = 'pics';
  for (let j in data) {
    span.innerHTML += `<a class="image_link" href="${data[j]}" target="_blank"><img class="image" src="${data[j]}" alt="starlink picture"/></a>`;
  }
  return span;
}

function getDate(data, i) {
  let span = document.createElement('span');
  span.id = `date${i}`;
  span.innerHTML = `First flight: ${data}`;
  return span;
}

function getPrice(data, i) {
  let span = document.createElement('span');
  span.id = `price${i}`;
  span.innerHTML = `Costs pre launch: ${data}$`;
  return span;
}

function getUsage(data, i) {
  let span = document.createElement('span');
  span.id = `usage${i}`;
  if (data == true) {
    span.innerHTML = 'Still in use';
  } else if (data == false) {
    span.innerHTML = 'Not anymore in use';
  }
  return span;
}

function getEngine(number, thrust, type, ttw, i) {
  let span = document.createElement('span');
  span.id = `engine${i}`;
  span.innerHTML = `
  Number of engines: ${number}<br>
  Thrust: ${thrust}kN<br>
  Type of engine: ${type}<br>
  Thrust to weight ratio: ${ttw}
  `;
  return span;
}

function more() {
  let num = this.id.replace('expand', '');
  let div = document.getElementById(`rocket_details${num}`);
  let but = document.getElementById(`expand${num}`);
  if (but.innerHTML == '<i class="arrow down"></i>MORE INFO<i class="arrow down"></i>') {
    div.style.display = 'block';
    but.innerHTML = '<i class="arrow up"></i>HIDE<i class="arrow up"></i>';
  }
  else if (but.innerHTML == '<i class="arrow up"></i>HIDE<i class="arrow up"></i>') {
    div.style.display = 'none';
    but.innerHTML = '<i class="arrow down"></i>MORE INFO<i class="arrow down"></i>';
  }
}


window.addEventListener('load', loadData);


/* Informacje o rakietach
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
        stosunek ciągu do wagi, */
