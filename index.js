const express = require('express');
const bodyParser = require('body-parser');
const nano = require('nano')('http://localhost:5984');

const app = express();
let dbName = 'recipes';
let dbrecipes;

const log = console.log;

const init = () => {
    nano.db.list().then(
        antwort => {
            // Prüfen, ob DB existiert und ggf anlegen
            if (antwort.includes(dbName)) return true;
            else return nano.db.create(dbName)
        }
    ).then(
        antwort => {
            // Datenbank existiert, Verbindung herstellen
            dbrecipes = nano.db.use('recipes');
        }
    ).catch(
        log
    )
}

// Alle Einträge aus DB auslesen
const listeAusgeben = (db, include_docs = true) => {
    return new Promise((resolve, reject) => {
        db.list({
            include_docs
        }).then(
            resolve
        ).catch(
            reject
        )
    })
}

// Server-Settings
app.use(express.static('public', {
    extensions: ['html']
}));
app.use(bodyParser.json());

// Routing
app.get('/loadAllRecipes', (req, res) => {
    listeAusgeben(dbrecipes).then(
        antwort => res.send(JSON.stringify(antwort)),
        err => res.send(JSON.stringify({ status: 'Fehler' }))
    )
})

// INIT
init();

app.listen(80, err => log(err || 'Läuft'));