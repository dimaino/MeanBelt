const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: { type: String, required: [true, "A name is needed to login!"], minlength: [3, "Your name needs to be at least 3 characters long"]},
}, {timestamps: true});

const AppointmentSchema = new mongoose.Schema(
{
	name: { type: String, required: [true, "A patient name is needed"] },
	date: { type: Date, required: [true, "Please add an appointment date"] },
	time: { type: String, required: [true, "Please add an appointment time"] },
	complain: { type: String, required: [true, "Please add a complaint"], minlength: [10, "Your complaint has to be at least 10 characters long"] },
}, { timestamps: true });

mongoose.model('User', UserSchema);
mongoose.model('Appointment', AppointmentSchema);
