const { join } = require("path");
const express = require("express");
const hbs = require("hbs");
const weather = require("./utils/weather");

const app = express();

// Define paths for Express config
const publicDirectoryPath = join(__dirname, "../public");
const viewsPath = join(__dirname, "../templates/views");
const partialsPath = join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Clima",
        name: "Miguel Angel",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "Acerca de",
        name: "Miguel Angel",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Ayuda",
        helpText: "Este es un texto de ayuda ⛑️",
        name: "Miguel Angel",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Debe mandar una direccion",
        });
    }

    weather(req.query.address, (error, response) => {
        if (error || !response) {
            return res.send({
                error: "No se pudo establecer la conexion",
            });
        } else if (response.error) {
            return res.send({
                error: "No hay datos sobre esta ciudad",
            });
        }

        const { condition, temp_c, humidity } = response.current;
        const { name, region, country } = response.location;

        return res.send({
            forecast: `${condition.text}, con una temperatura de ${temp_c}°C y ${humidity}% de humedad`,
            location: `${name}, ${region}, ${country}`,
            address: req.query.address,
        });
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Miguel Angel",
        errorMessage: "Articulo de ayuda no encontrado",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Miguel Angel",
        errorMessage: "Pagina no encontrada",
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
