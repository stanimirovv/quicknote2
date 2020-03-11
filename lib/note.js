const db = require('better-sqlite3')('test.db', {});
const log = require('./log');

// High level storage and business logic
module.exports = {
    getNote(hash) {
        return storage.getNoteByHash(hash);
    },

    saveNote(hash, checksum, noteBody) {
        const note = storage.getNoteByHash(hash);
        if ( note === undefined) {
            return storage.createNote(hash, checksum, noteBody);
        }  else {
            if (note.checksum != checksum ) {
                log.error(`Checksums are different actual: ${note.checksum} submited: ${checksum}`);
                return null;
            }
            return storage.updateNote(hash, noteBody);
        }
    },

};

// Low level storage implementation details
const storage = {
    createNote(hash, checksum, body) {
        try{
            db.prepare('INSERT INTO notes(hash, checksum, body) VALUES(?, ?, ?)').run(hash, checksum, body);
        } catch(error) {
            log.error('Error:', error.toString());
            return null;
        }
    },

    updateNote(hash, body) {
        try {
            db.prepare('UPDATE notes SET body=? WHERE hash=?').run(body, hash);
        } catch(error) {
            log.error('Error:', error.toString());
            return null;
        }
    },

    getNoteByHash(hash) {
        try{
            return db.prepare('SELECT hash, checksum, body FROM notes WHERE hash=?;').get(hash);
        } catch(error) {
            log.error('Error:', error.toString());
            return null;
        }
    },

    getNoteById(noteId) {
        try{
            return db.prepare('SELECT hash, body FROM notes WHERE id=?;').get(noteId);
        } catch(error) {
            log.error('Error:', error.toString());
        }
    },

    deleteNoteByNoteId(noteId) {
        try {
        db.preapre('DELETE FROM notes WHERE id = ?').run(noteId);
        } catch(error) {
            log.error('Error:', error.toString());
        }
    },

    deleteNoteByHash(hash) {
        try {
          db.preapre('DELETE FROM notes WHERE hash = ?').run(hash);
        } catch(error) {
            log.error('Error:', error.toString());
        }
    },
};
