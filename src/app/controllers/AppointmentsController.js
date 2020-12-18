import { isBefore, startOfHour, format } from "date-fns";
import pt from "date-fns/locale/pt";

import Appointment from '../models/Appointment'

class AppointmentController {
    async index(req, res, next) {
        try {
            const appointment = await Appointment.find()

            return res.status(200).json({
                success: true,
                count: appointment.length,
                data: appointment
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Server error' })
        }
    }

    async create(req, res, next) {
        try {
            const { date, hour, address, service } = req.body

            const newDate = new Date(`${date} ${hour}`)
            const fullDate = startOfHour(newDate);

            if (isBefore(fullDate, new Date())) {
                return res.status(400).json({ error: 'Past dates are not permitted' });
            }

            const beforeHourAppointment = fullDate.getHours() < 8;
            const afterHourAppointment = fullDate.getHours() >= 18;

            if(beforeHourAppointment) {
                return res.status(401).json({ error: 'Appointment is before our working hour.' })
            }

            if(afterHourAppointment) {
                return res.status(401).json({ error: 'Appointment is out of hour working hours.' })
            }

            const checkAvailability = await Appointment.findOne({
                date: fullDate,
            });

            if (checkAvailability) {
                return res
                  .status(400)
                  .json({ error: 'Appointment date is not available' });
              }

            const formatDate = format(newDate, "'dia' dd 'de' MMMM 'às' HH:mm", {
                locale: pt,
            });

            // const formatHour = format(hour, "'hh:mm'")

            const appointment = new Appointment({
                date: newDate,
                hour,
                fullDate: formatDate,
                address,
                service
            })



            return appointment.save().then(savedAppointment => res.json({success: true, data: savedAppointment})).catch(err => next(err))
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Server error' })
        }
    }
}

export default new AppointmentController()
