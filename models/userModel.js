const mysql = require('mysql');

// make a class user that will manage all the functions on top, with callbacks
// DONT USE PROMISES
class User {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });
    }

    // view active users
    viewActiveUsers(callback) {
        this.connection.query('SELECT * FROM user WHERE status = "active" OR status = "none"', (err, rows) => {

            if (err) callback(err, null);
            else callback(null, rows);
        });
    };

    // find user by search
    findUser(searchTerm, callback) {
        this.connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {

            if (err) callback(err, null);
            else callback(null, rows);
        });
    };

    // add user to database
    addUser(props, callback) {
        this.connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [props.first_name, props.last_name, props.email, props.phone, props.comments], (err, rows) => {

            if (err) callback(err, null);
            else callback(null, rows);
        });
    };

    // edit user
    editUser(id, callback) {
        this.connection.query('SELECT * FROM user WHERE id = ?', [id], (err, rows) => {

            if (err) callback(err, null);
            else callback(null, rows);
        });
    };

    // update user
    updateUser(id, props, callback) {
        this.connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [props.first_name, props.last_name, props.email, props.phone, props.comments, id], (err, rows) => {

            if (err) callback(err, null);
            else callback(null, rows);
        });
    }

    // delete user
    deleteUser(id, callback) {
        this.connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', id], (err, rows) => {

            if (err) callback(err, null);
            else callback(null, rows);
        });
    };

    // view users
    viewUsers(id, callback) {
        this.connection.query('SELECT * FROM user WHERE id = ?', [id], (err, rows) => {

            if (err) callback(err, null);
            else callback(null, rows);
        });
    };

    // activate user
    activateUser(id, callback) {
        this.connection.query('UPDATE user SET status = ? WHERE id = ?', ['active', id], (err, rows) => {

            if (err) callback(err, null);
            else callback(null, rows);
        });
    }

    // deactivate user
    deactivateUser(id, callback) {
        this.connection.query('UPDATE user SET status = ? WHERE id = ?', ['none', id], (err, rows) => {

            if (err) callback(err, null);
            else callback(null, rows);
        });
    }
}

module.exports = new User();
