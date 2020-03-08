const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const note = require('./lib/note');
const pages = require('./lib/pages');

app.set('view engine', 'ejs');
app.use(bodyParser.json())
pages.setApp(app);

app.get('/n/:hash', (req, res) => {
    let myNote = note.getNote(req.params.hash);
    if (myNote === null) {
        res.render('index', {encryptedContent: false, noteExists: false, errorMessage: 'System error'});
        return;
    }
    // New note
    if (myNote === undefined) {
        res.render('index', {encryptedContent: false, noteExists: false, errorMessage: false});
        return;
    }
    // Existing note
    res.render('index', {encryptedContent: myNote.body, noteExists: true, errorMessage: false});
});

app.post('/n/:hash/save', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    let status = note.saveNote(req.params.hash, req.body);
    if (status === null) {
        res.send('{"status" : "error"}');
    }

    res.send('{"status":"ok"}');
});

app.use('/public', express.static('public'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
