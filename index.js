import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

// Permitir solicitudes desde cualquier origen
app.use(cors());
app.use(express.json());

app.get('/scrape', (req, res) => {
    // Realizar la solicitud HTTP a la API
    axios.get('http://www.raydelto.org/agenda.php')
        .then(response => {
            // Obtener los datos de la respuesta
            const data = response.data;
            // Enviar los datos procesados como respuesta
            res.json(data);
        })
        .catch(error => {
            console.error(error);
            // Enviar una respuesta de error en caso de fallo
            res.status(500).json({ error: 'Scraping failed' });
        });
});

app.post('/contacts', (req, res) => {
    const { nombre, apellido, telefono } = req.body; // Suponiendo que los datos del contacto se envían en el cuerpo de la solicitud como JSON

    console.log(`Creating contact: ${nombre} ${apellido} ${telefono}`);

    // Realizar la solicitud POST a la API para crear el contacto
    axios.post('http://www.raydelto.org/agenda.php', {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono
    })
        .then(response => {
            // Obtener los datos de la respuesta
            const data = response.data;

            // Enviar los datos de la respuesta como respuesta de éxito
            res.json(data);
        })
        .catch(error => {
            console.error(error);
            // Enviar una respuesta de error en caso de fallo
            res.status(500).json({ error: 'Failed to create contact' });
        });
});

const port = 3000; // Puerto en el que se ejecutará el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
