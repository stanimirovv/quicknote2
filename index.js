const express = require('express');
const bodyParser = require('body-parser');

const note = require('./lib/note');
const log = require('./lib/log');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json())

app.get('/n/:hash', (req, res) => {
    let hash = req.params.hash;
    let myNote = note.getNote(hash);

    // Error fetching note
    if (myNote === null) {
        log.error('Error getting noteId: ' + hash);
        res.render('index', {encryptedContent: false, noteExists: false, errorMessage: 'System error'});
        return;
    }

    // New note
    if (myNote === undefined) {
        log.info('Note is free noteId: ' + hash);
        res.render('index', {encryptedContent: false, noteExists: false, errorMessage: false});
        return;
    }

    // Existing note
    log.info('Note exists noteId: ' + hash);
    res.render('index', {encryptedContent: myNote.body, noteExists: true, errorMessage: false});
});

app.post('/n/:hash/save', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    let status = note.saveNote(req.params.hash, req.body);
    if (status === null) {
        res.send(JSON.serialize({"status" : "error"}));
    }

    res.send(JSON.serialize({"status":"ok"}));
});

app.use('/public', express.static('public'));

// TODO config
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
