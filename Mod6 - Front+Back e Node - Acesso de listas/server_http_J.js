const http = require("http");
const fs = require("fs");



const readArrays = (fileName, callback) => {
    return fs.promises.readFile(fileName)
        .then((buffer) => {
            const charac = JSON.parse(buffer.toString());

            callback(charac);
        })
        .catch((error) => {
            console.error(error);

        });
}

const fileNameMaps = {
    '/filmes': "./Lista_filmes.json",
    '/series': "./Lista_series.json",
    '/musicas': "./Lista_musicas.json",
}

const server = http.createServer((req, res) => {
    const { url, method } = req;
    const fileName = fileNameMaps[url]
    console.log(url, method);

    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE",
        "Access-Control-Max-Age": 2592000, // 30 days
        /** add other headers as per requirement */
    };
    if (req.method === "OPTIONS") {
        res.writeHead(204, headers);
        res.end();
        return;
    }
    if (method == "GET") {
        return readArrays(fileName, (movies) => {

            res.end(JSON.stringify(movies));
        });
    } else if (method == "POST") {
        return readArrays(fileName, (info) => {
            const num_ultimo_objeto = info.length
            const id_ultimo_objeto = info[num_ultimo_objeto - 1].id
            req.on('data', data => {
                data = JSON.parse(data);
                data.id = id_ultimo_objeto + 1

                info.push(data);

                fs.promises.writeFile(fileName, JSON.stringify(info));

                res.end(`Adicionado ${JSON.stringify(data)}!`);
            })
        })
    } else if (method == "PUT") {
        return readArrays(fileName, (info) => {
            req.on('data', data => {
                const updates = JSON.parse(data.toString());

                const id = updates.id;

                const updates_idx = info.findIndex((update) => {
                    return update.id == id;
                })
                if (updates.titulo != "") {
                    info[updates_idx].titulo = updates.titulo
                } if (updates.genero != "") {
                    info[updates_idx].genero = updates.genero
                } if (updates.ano != "") {
                    info[updates_idx].ano = updates.ano
                } if (updates.diretor_autor != "") {
                    info[updates_idx].diretor_autor = updates.diretor_autor
                } if (updates.poster_capa != "") {
                    info[updates_idx].poster_capa = updates.poster_capa
                }

                fs.promises.writeFile(fileName, JSON.stringify(info));

                res.end(`Adicionado ${JSON.stringify(data)}!`);
            })
        })
    } else if (method == "DELETE") {
        return readArrays(fileName, (info) => {
            req.on('data', data => {
                const movieId = JSON.parse(data.toString());
                console.log({ movies: movieId })
                const movie_idx = info.findIndex((filme) => {
                    return filme.id == movieId;
                })

                if (movie_idx != -1) {
                    info.splice(movie_idx, 1);
                    fs.promises.writeFile(fileName, JSON.stringify(info));

                    return res.end(`Deleted ${JSON.stringify(movieId)}!`);
                }

            })
        })

    }

    res.writeHead(404);
    return res.end('PAGE NOT FOUND');
});

server.listen(3000, 'localhost', () => {
    const address = server.address();
    console.log(`Servidor rodando ${address.address}:${address.port}`);
});

