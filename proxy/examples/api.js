// Credits: https://gist.github.com/DavidWells/53518b3c12344952641dc81cc7599939

import fetch from "node-fetch";

const createApi = (url) => {
  return new Proxy(
    {},
    {
      get(target, key) {
        return async function (id = "") {
          try {
            const response = await fetch(`${url}/${key}/${id}`);
            if (response.statusText === "OK") {
              return response.json();
            }
            return Promise.resolve({ error: "Malformed Request" });
          } catch (e) {
            return Promise.reject(e);
          }
        };
      },
    }
  );
};

let api = createApi("https://swapi.dev/api");

const start = async () => {
  // 'get' request to https://swapi.dev/api/people
  let people = await api.people();

  console.log(people);

  // 'get' request to https://swapi.dev/api/people/1
  let person = await api.people(1);

  console.log(person);
};

start();
