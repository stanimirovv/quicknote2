const db = require('better-sqlite3')('test.db', {});

// High level storage and business logic
module.exports = {
    getNote(hash) {
        return storage.getNoteByHash(hash);
    },

    saveNote(hash, noteBody) {
        const body = JSON.stringify(noteBody);
        const note = storage.getNoteByHash(hash);
        if ( note === undefined) {
            console.log('CREATING NOTE!');
            return storage.createNote(hash, body);
        }  else {
            console.log('UPDATING NOTE!');
            return storage.updateNote(hash, body);
        }
    },

};

// Low level storage implementation details
const storage = {
    createNote(hash, body) {
        try{
            db.prepare('INSERT INTO notes(hash, body) VALUES(?,?)').run(hash, body);
        } catch(error) {
            console.log('Error:', error.toString());
            return null;
        }
    },

    updateNote(hash, body) {
        try {
            db.prepare('UPDATE notes SET body=? WHERE hash=?').run(body, hash);
        } catch(error) {
            console.log('Error:', error.toString());
            return null;
        }
    },

    getNoteByHash(hash) {
        try{
            return db.prepare('SELECT hash, body FROM notes WHERE hash=?;').get(hash);
        } catch(error) {
            console.log('Error:', error.toString());
            return null;
        }
    },

    getNoteById(noteId) {
        try{
            return db.prepare('SELECT hash, body FROM notes WHERE id=?;').get(noteId);
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
};
