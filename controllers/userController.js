// import user Model
const User = require('../models/userModel');

// View Users
exports.view = (req, res) => {
  User.viewActiveUsers((err, rows) => {
    if (!err) {
      let removedUser = req.query.removed;
      res.render('home', { rows, removedUser: removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  User.findUser(searchTerm, (err, rows) => {
    if (!err) {
      res.render('home', { rows, removedUser: null });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-user', { alert: '' });
}

// Add new user
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;

  User.addUser({
      first_name: first_name, 
      last_name: last_name, 
      email: email, 
      phone: phone, 
      comments: comments
  }, (err, rows) => {
    if (!err) {
      res.render('add-user', { alert: 'User added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}


// Edit user
exports.edit = (req, res) => {
  User.editUser(req.params.id, (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows, alert: '' });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}


// Update User
exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  User.updateUser(req.params.id, {
      first_name: first_name, 
      last_name: last_name, 
      email: email, 
      phone: phone, 
      comments: comments
  }, (err, rows) => {
    if (!err) {
      User.viewUsers(req.params.id, (err, rows) => {
        
        if (!err) {
          res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from user table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

// Delete User
exports.delete = (req, res) => {

  // Delete a record

  // connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {

  //   if(!err) {
  //     res.redirect('/');
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from user table: \n', rows);

  // });

  // Hide a record

  User.deleteUser(req.params.id, (err, rows) => {
    if (!err) {
      let removedUser = encodeURIComponent('User successeflly removed.');
      res.redirect('/?removed=' + removedUser);
    } else {
      console.log(err);
    }
    console.log('The data from beer table are: \n', rows);
  });

}

// View Users
exports.viewall = (req, res) => {

  User.viewUsers(req.params.id, (err, rows) => {
    if (!err) {
      res.render('view-user', { rows, alert: '' });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

// Activate User
exports.activateUser = (req, res) => {
  User.activateUser(req.params.id, (err, rows) => {
    if (!err) {
      User.viewActiveUsers((err, rows) => {
        if (!err) {
          res.render('home', { rows, removedUser: null });
        } else {
          console.log(err);
        }
        
        console.log('The data from user table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

// Deactivate User
exports.deactivateUser = (req, res) => {
  User.deactivateUser(req.params.id, (err, rows) => {
    if (!err) {
      User.viewActiveUsers((err, rows) => {
        if (!err) {
          res.render('home', { rows, removedUser: null });
        } else {
          console.log(err);
        }
        
        console.log('The data from user table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}