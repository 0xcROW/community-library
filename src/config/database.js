import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('library_db.sqlite', (err) => {
    if (err) {
        console.log(err.message)
    } else {
        console.log('Connected')
    }
});

export default db;