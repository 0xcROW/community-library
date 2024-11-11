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
            function (err) {
                if(err) {
                    rej(err)
                } else {
                    res({ id: this.lastID, ...newUser })
                }
            }
        );
    });
}

function findUserByEmailRepository(email){
    return new Promise((res, rej) => {
        db.get(`
                SELECT id, username, email, avatar, password
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
        const data = ['username', 'email', 'password', 'avatar'];
        let query = 'UPDATE users SET';
        const values = [];

        data.forEach((item) => {
            if(user[item] !== undefined) {
                query += ` ${item} = ?,`;
                values.push(user[item]);
            }
        });

        query = query.slice(0, -1); //Remove the last comma
        query += ` WHERE id = ?`;
        values.push(id);

        db.run(query, values, (err) => {
            if(err) {
                rej(err)
            } else {
                res({ id, ...user })
                console.log(query, values)
            }
        });
    })
}

async function deleteUserRepository(id){
    return new Promise((res, rej) => {
        db.run(`
                DELETE FROM users
                WHERE id = ?
            `, [id], //Securing the parameter against injection
                (err) => {
                    if(err) {
                        rej(err)
                    } else {
                        res({message: "User deleted"})
                    }
            })
    })
}

export default {
    createUserRepository,
    findUserByEmailRepository,
    findUserByIdRepository,
    findAllUsersRepository,
    updateUserRepository,
    deleteUserRepository
}