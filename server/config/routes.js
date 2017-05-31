let mongoose = require('mongoose');
let User = require('../controllers/users');
let path = require('path');

module.exports = function(app)
{
  app.post("/login", User.login);
  app.get("/logout", User.logout);
  app.get("/checkStatus", User.checkStatus);
  app.get("/allUsers", User.getAllUsers);

  app.post("/addAppointment", User.addAppointment);
  app.get("/getAllAppointment", User.getAllAppointments);
  app.post("/delete/:id", User.deleteAppointment);

  app.get("*", function(req, res)
  {
  	 res.sendFile(path.resolve("client/dist/index.html"));
  })
}
