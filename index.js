const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const port = 3000;
const note = require('./lib/note');
const pages = require('./lib/pages');
pages.setApp(app);
/*
 * IN: noteId
 * IN: authToken
 * OUT: status, encrypted payload
 *
 * IN: noteId
 * IN: wrong or missing authToken
 * OUT: Redirect to /n/noteId/auth
 *
 * IN: unexisting noteId in the system
 * IN: unexisting authToken
 * OUT: create new note, session and load the UI. Prompt first save
 *
 */
app.get('/n/:hash', (req, res) => {
    console.log(req.params);
    // console.log(req.query.kakaka);
    let myNote = note.getNote(req.params.hash);
    if (myNote === undefined) {
        res.render('index', {encryptedContent: false, integrity: note.getIntegrityWord()});
        return;
    }
    res.render('index', {encryptedContent: true, integrity: note.getIntegrityWord()});
});

/*
 * IN: noteId
 * IN: privateKey
 * OUT: redirect to /n/:noteId with Auth
 * NOTE: opens up page with prompt to enter key; when ok is sent, the page sends request to
 */
app.get('/n/:noteId/auth', (req, res) => { 
    console.log(req.params);
    res.send('Hello World!');
});

/* IN: noteId
 * IN: encryped msg 'OK'
 * OUT: authToken
 *
 * IN: noteId
 * IN: wrong or missing encrypted msg
 * OUT: error message to display in the UI
 *
 * IN: wrong noteId
 * IN: encryped msg 'OK'
 * OUT: error message to display in the UI
 */
app.post('/n/:noteId/auth', (req, res) => { 
    console.log(req.params);
    res.send('Hello World!');
});

/* IN: noteId
 * IN: authToken
 * OUT: ok msg for the client
 *
 * ANY of the arguments wrong -> error msg for the client
 */
app.post('/n/:noteId/save', (req, res) => { 
    console.log(req.params);
    res.send('Hello World!');
});

app.use('/public', express.static('public'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
