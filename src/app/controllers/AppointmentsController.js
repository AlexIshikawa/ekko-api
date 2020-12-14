import { parseISO, isBefore, startOfHour } from "date-fns";

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
            const { date, address, service } = req.body

            const hourStart = startOfHour(parseISO(date));

            if (isBefore(hourStart, new Date())) {
                return res.status(400).json({ error: 'Past dates are not permitted' });
              }

            const checkAvailability = await Appointment.findOne({
                date: hourStart,
            });

            if (checkAvailability) {
                return res
                  .status(400)
                  .json({ error: 'Appointment date is not available' });
              }

            console.log(date)

            const appointment = new Appointment({
                date,
                address,
                service
            })

            // const formatDate = format(hourStart, "'dia' dd 'de' MMMM', às' H:mm'h' ", {
            //     locale: pt,
            //   });

            return appointment.save().then(savedAppointment => res.json({success: true, data: savedAppointment})).catch(err => next(err))
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Server error' })
        }
    }
}

export default new AppointmentController()
