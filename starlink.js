/*jshint esversion: 8*/

async function loadData(page_num) {
  let body = `{
    "options": {
        "page": ${page_num}
    }
}`;
  var fetchPromise = fetch('https://api.spacexdata.com/v4/starlink/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  });
  fetchPromise.then(response => {
    return response.json();
  }).then(data => {
    let main = document.getElementById('main');
    main.innerHTML = '';
    let header = document.createElement('h2');
    header.innerHTML = `Page ${data.page}`;
    main.appendChild(header);

    if (data.hasPrevPage) {
      document.getElementById('previous').disabled = false;
      document.getElementById('previous').setAttribute("onclick", `loadData(${data.prevPage})`);
    } else {
      document.getElementById('previous').disabled = true;
    }

    if (data.hasNextPage) {
      document.getElementById('next').disabled = false;
      document.getElementById('next').setAttribute("onclick", `loadData(${data.nextPage})`);
    } else {
      document.getElementById('next').disabled = true;
    }

    for (let i in data.docs) {
      let div = document.createElement('div');
      div.id = `starlink${i}`;
      div.className = `starlink`;
      let s_id = getId(data.docs[i].spaceTrack.OBJECT_ID, i);
      div.appendChild(s_id);
      let name = getName(data.docs[i].spaceTrack.OBJECT_NAME, i);
      div.appendChild(name);
      let date = getDate(data.docs[i].spaceTrack.LAUNCH_DATE, i);
      div.appendChild(date);
      main.appendChild(div);
    }
  });
}

function firstPage() {
  return loadData(1);
}

function newPage(page) {
  return loadData(page);
}




function getId(data, i) {
  let span = document.createElement('span');
  span.innerHTML = `Id: ${data}`;
  return span;
}

function getName(data, i) {
  let span = document.createElement('span');
  span.innerHTML = `Object name: ${data}`;
  return span;
}

function getDate(data, i) {
  let span = document.createElement('span');
  span.innerHTML = `Launch date: ${data}`;
  return span;
}

window.addEventListener('load', firstPage);

// window.addEventListener("load", function() {
//   document.querySelectorAll('.but').forEach(button => {
//     button.addEventListener('click', newPage);
//   });
// });

/*   Informacje o Starlinkach
      identyfikatory,
      nazwę,
      datę wystrzelenia,

      Zadbaj o paginację czyli możliwość dzielenia listy na kolejne strony. Pojedyncza strona powinna mieścić 10 elementów. W przypadku 121 elementów powinno być 13 stron z 1 elementem na ostatniej.*/
