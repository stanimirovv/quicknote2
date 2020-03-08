const db = require('better-sqlite3')('test.db', {});

module.exports = {
    getNote(hash) {
        const note = storage.getNoteByHash(hash); 
        if (note === undefined) {

        }
        return note;
    },

    saveNote(hash, integrity, noteBody) {
        const body = JSON.stringify(noteBody);
        const note = storage.getNoteByHash(hash);
        if ( note === undefined) {
            console.log('CREATING NOTE!');
            return storage.createNote(hash, integrity, body);
        }  else {
            console.log('UPDATING NOTE!');
            return storage.updateNote(hash, body);
        }
    },

    getIntegrityWord() {
        return "somethingSomething";
    }
};

const storage = {
    createNote(hash, integrity, body) {
        try{
            db.prepare('INSERT INTO notes(hash, integrity, body) VALUES(?,?,?)').run(hash, integrity, body);
        } catch(error) {
            console.log('Error:', error.toString());
        }
    },

    updateNote(hash, body) {
        try {
            db.pepare('UPDATE notes SET body=? WHERE hash=?').run(body, hash);
        } catch(error) {
            console.log('Error:', error.toString());
        }
    },

    getNoteByHash(hash) {
        try{
            return db.prepare('SELECT hash, integrity, body FROM notes WHERE hash=?;').get(hash);
        } catch(error) {
            console.log('Error:', error.toString());
        }
    },

    getNoteById(noteId) {
        try{
            return db.prepare('SELECT hash, integrity, body FROM notes WHERE id=?;').get(noteId);
        } catch(error) {
            console.log('Error:', error.toString());
        }
    },

    deleteNoteByNoteId(noteId) {
        db.preapre('DELETE FROM notes WHERE id = ?').run(noteId);
    },

    deleteNoteByHash(hash) {
        db.preapre('DELETE FROM notes WHERE hash = ?').run(hash);
    },
    // getNoteById(noteId) {},
    // getNoteByHash(hash) {},
};
