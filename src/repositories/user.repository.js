import db from '../config/database.js';

db.run(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    avatar TEXT
    )
`)

function createUserRepository(newUser) {
    return new Promise((res, rej) => {
        const { username, email, password, avatar } = newUser;
        db.run(
            `
            INSERT INTO users (username, email, password, avatar)
            VALUES (?, ?, ?, ?)
            `,
            [username, email, password, avatar], //Securing the parameters against injection
            (err) => {
                if(err) {
                    rej(err)
                } else {
                    res({ id: this.lastID, ...newUser })
                    // res({message: "User created"})
                }
            }
        );
    });
}

function findUserByEmailRepository(email){
    return new Promise((res, rej) => {
        db.get(`
                SELECT id, username, email, avatar
                FROM users
                WHERE email = ?
            `, [email], //Securing the parameter against injection
                (err, row) => {
                    if(err) {
                        rej(err)
                    } else {
                        res(row)
                    }
            })
    })
}

function findUserByIdRepository(id){
    return new Promise((res, rej) => {
        db.get(`
                SELECT id, username, email, avatar
                FROM users
                WHERE id = ?
            `, [id], //Securing the parameter against injection
                (err, row) => {
                    if(err) {
                        rej(err)
                    } else {
                        res(row)
                    }
            })
    })
}

function findAllUsersRepository(){
    return new Promise((res, rej) => {
        db.all(`
                SELECT id, username, email, avatar
                FROM users
            `, [], //Securing the parameter against injection
            (err, rows) => {
                if(err) {
                    rej(err)
                } else {
                    res(rows)
                }
            })
    })
}

function updateUserRepository(id, user){
    return new Promise((res, rej) => {
        const { username, email, password, avatar } = user;
        db.run(`
                UPDATE users SET username = ?, email = ?, password = ?, avatar = ?
                WHERE id = ?
            `, [username, email, password, avatar, id], //Securing the parameter against injection
                (err) => {
                    if(err) {
                        rej(err)
                    } else {
                        res({ id, ...user })
                    }
            })
    })
}

export default {
    createUserRepository,
    findUserByEmailRepository,
    findUserByIdRepository,
    findAllUsersRepository,
    updateUserRepository
}