const db = require('better-sqlite3')('test.db', {});

module.exports = {
};

const storage = {
  createNote : (noteId) => {
    console.log('Hello From module!');
  },

  updateNote : (noteId, payload) => {},

  setNoteIntegrity : (noteId, integrity) => {},

  getNote : (noteId) => {},

  deleteNote : (noteId) => {},
};
