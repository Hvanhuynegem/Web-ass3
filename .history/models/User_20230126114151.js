const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

class User {
    constructor(id, first_name, last_name, email, phone, comments, status) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
        this.comments = comments;
        this.status = status;
    }

    // View Users
    static view() {
        
        // User the connection
        const db = connection.query('SELECT * FROM user WHERE status = "active"');
        return db
        .then(rows => {
            let removedUser = req.query.removed;
            return rows, removedUser;
            })
            .catch(err => {
                console.log(err);
            });
        }
}