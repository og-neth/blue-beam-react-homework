import qs from 'qs';

'use strict';

export const PLAYER_SERVICE_ENDPOINT = 'http://localhost:3000';

/*
  The following is an example of how to interact with the json-server library.
  More info about json-server can be found at https://github.com/typicode/json-server.
*/

/*
  Prefixes keys in options objects with "_" to be compatible with json-server queries.
  i.e sort -> _sort
*/
function optionsToQueryString(options = {}) {
  const prefixedOptions = Object.entries(options).reduce((acc, [param, val]) => {
    acc[`_${param}`] = val;
    return acc;
  }, {});

  return qs.stringify(prefixedOptions);
}

/*
  GET Players
*/
export async function getPlayers(options = {}) {
  const query = optionsToQueryString(options);

  const response = await fetch(`${PLAYER_SERVICE_ENDPOINT}/players?${query}`);

  const players = await response.json();

  return players;
}

/*
POST Scores
*/

export async function postScores(url, data) {
  fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
  })
  .then(response => response.json())
  .catch(err => console.error('Error:', err))
  .then(response => console.log('Success:', response))
}
