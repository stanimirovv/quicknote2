const db = require('better-sqlite3')('test.db', {});
db.prepare('CREATE TABLE notes(id INTEGER PRIMARY KEY AUTOINCREMENT, ' + 
            'hash varchar(256) NOT NULL, ' +
            'checksum varchar(256) NOT NULL, ' +
            'body TEXT NOT NULL);'
          ).run();
