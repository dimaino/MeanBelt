let mongoose = require('mongoose');
let session = require("express-session");
let User = mongoose.model('User');
let Appointment = mongoose.model("Appointment");

module.exports = {
 login: (req, res) =>
 {
   User.findOne({ name: req.body.name })
       .catch(err =>
       {
         console.log("Error couldn't get user: ", err);
         res.status(500).json(err);
       })
       .then(user =>
       {
         if(user)
         {
           console.log("Controller: ", user);
           req.session.user = user;
           res.json(true);
         }
         else
         {
           let newUser = new User(req.body);
           newUser.save()
                  .catch(err =>
                  {
                    console.log("Error couldn't save user: ", err);
                    res.status(500).json(err);
                  })
                  .then(() =>
                  {
                    req.session.user = newUser;
                    res.json(true);
                  })
         }
       })
 },

 checkStatus: (req, res) =>
 {
   res.json({ user: req.session.user });
 },

 getAllUsers: (req, res) =>
 {
   User.find({}).sort({ createdAt: -1 })
       .then(users =>
       {
         res.json(users);
       })
       .catch(err =>
       {
         console.log("Error couldn't get users: ", err);
         res.status(500).json(err);
       })
 },

 logout: (req, res) =>
 {
   req.session.destroy();
   res.json(true);
 },

 addAppointment: (req, res) =>
 {
   if(req.body.complain == undefined)
   {
     res.status(500).json({ err: "Please add a complaint"});
   }
   if(req.body.date == undefined)
   {
     res.status(500).json({ err: "Please add a date"});
   }
   if(req.body.time == undefined)
   {
     res.status(500).json({ err: "Please add a time"});
   }
   Appointment.find({ name: req.session.user.name }).exec(function(err, appointments)
   {

     let time = req.body.time;
     console.log("Appointment add time!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!: ", time);
     if(time < "08:00" || time > "17:00")
     {
       res.status(500).json({ err: "Choose a time between 8:00AM and 5:00PM"});
     }
     else
     {
       let allAppointments = appointments;
       let str2 = JSON.stringify(req.body.date);
       let res2 = str2.slice(1, 11);

      //  let newDateagain = Date.parse(str2);
      //  newDateagain.setDate(newDateagain.getDate() + 1)
      //  var lateOne = newDateagain.toISOString();
      //  console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH", lastOne);

      // let stuff = JSON.stringify(req.body.date);
      // let stuff2 = stuff.slice(1, 11);
      // let stuff3 = new Date(stuff2);
      // console.log("STUFF" + stuff3);

      //  let tomorrow = new Date();
      //  tomorrow.setDate(tomorrow.getDate() + 1);
       //
      //  let strTomorrow = JSON.stringify(tomorrow)
      //  let resTomorrow = strTomorrow.slice(1, 11);


      //  let temp = appointment[0].date;
      //  let strTemp = JSON.stringify(temp)
      //  let resTemp = strTemp.slice(1, 11);




       let now = new Date();

       let strNow = JSON.stringify(now)
       let resNow = strNow.slice(1, 11);

       //console.log(`The Date Inputed is: ${res2} and the Date right now is: ${resNow}`);
       if(resNow > res2)
       {
         res.status(500).json({ err: "You can not make appointments in the past" });
       }
       if(resNow === res2)
       {
         res.status(500).json({ err: "You can not make an appointment for today" });
       }

       for(var i = 0; i < allAppointments.length; i++)
       {
         let str1 = JSON.stringify(allAppointments[i].date)
         let res1 = str1.slice(1,11)
         if(res1 === res2)
         res.status(500).json({ err: "You have already set up an appointment for this date! Please choose another date" });
       }

       Appointment.find({ date: req.body.date }).exec(function(err, allAppointments)
       {
         let all_appointments = allAppointments
         let count = 0
         let str2 = JSON.stringify(req.body.date);
         let res2 = str2.slice(1,11);

         let thingy = req.body.date;
         console.log(thingy);

         for(var i = 0; i < all_appointments.length; i++)
         {
           count++
         }
         if(count >= 3)
         {
           res.status(500).json({ err: "Doctor is busy for this date, Sorry! Choose a differnet date" });
         }
         else
         {

           let newAppointment = new Appointment({ name: req.session.user.name, date: req.body.date, time: req.body.time, complain: req.body.complain, createdAt: new Date(), updatedAt: new Date() })
           newAppointment.save()
                         .then(() =>
                         {
                           res.json(true);
                         })
                         .catch(err =>
                         {
                           console.log("Error when adding appointment to db",err);
                           res.status(500).json(err);
                         })
         }
       })
     }
   })
 },

 getAllAppointments: (req, res) =>
 {

   Appointment.find({}).sort({ createdAt: -1 })
              .then(appointments =>
              {
                var t = appointments
                console.log(t);
                var thing = new Array();
                for(var i = 0; i < t.length; i++)
                {
                  if(t[i].date > new Date())
                  {
                    thing.push(t[i])
                  }
                }

                res.json(thing);
              })
              .catch(err =>
              {
                console.log("Error couldn't get appointments: ", err);
                res.status(500).json(err);
              })
 },

 deleteAppointment: (req, res) =>
 {
   Appointment.find({ _id: req.params.id })
              .then(appointment => {
                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);

                let strTomorrow = JSON.stringify(tomorrow)
                let resTomorrow = strTomorrow.slice(1, 11);


                let temp = appointment[0].date;
                let strTemp = JSON.stringify(temp)
                let resTemp = strTemp.slice(1, 11);

                console.log("TOMORROW: ", resTomorrow);
                console.log("APPOITNMENT DATE: ", resTemp);

                if(!(temp <= tomorrow))
                {
                  Appointment.remove({ _id: req.params.id })
                             .then(appointment =>
                             {
                               res.json(true);
                             })
                             .catch(err =>
                             {
                               console.log("Error couldn't delete appointment: ", err);
                               res.status(500).json(err);
                             })
                }
                else
                {
                  console.log("Cant delete an appointment less than a day out!");
                  res.status(500).json({ err: "Cant delete an appointment less than a day out!" });
                }
              })
              .catch(err =>
              {
                res.status(500).json({ err: "Cant delete an appointment less than a day out!" });
              })

 },
}
