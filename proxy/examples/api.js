// Credits: https://gist.github.com/DavidWells/53518b3c12344952641dc81cc7599939

const https = require("https");

const createApi = (url) => {
    return new Proxy(
        {},
        {
            get(target, key) {
                return async function (id = "") {
                    const response = await fetch(`${url}/${key}/${id}`);
                    console.log(response);
                    if (response.ok) {
                        return Promise.resolve("");
                        response.json();
                    }
                    return Promise.resolve({ error: "Malformed Request" });
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

// Ftech polyfill
function fetch(url, options) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);

        const req = https.request(urlObj, options, (res) => {
            const response = new Response({
                statusCode: res.statusCode,
                headers: res.headers,
                url: res.url,
            });

            const buffers = [];

            res.on("data", (data) => {
                buffers.push(data);
            });

            res.on("end", () => {
                response.setBody(buffers);

                console.log(response);
                resolve(response);
            });
        });

        req.on("error", (e) => {
            reject(e);
        });

        req.end();
    });
}
