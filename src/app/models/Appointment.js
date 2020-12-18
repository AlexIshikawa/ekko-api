import mongoose from 'mongoose'

import geocoder from '../../utils/geocoder'

const AppointmentSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        hour: {
            type: String,
            required: true,
        },
        fullDate: {
            type: String,
        },
        address: {
            type: String,
            required: true,
        },
        location: {
            type: {
                type: String,
                enum: ['Point']
            },
            coordinates: {
                type: [Number],
                index: '2dsphere'
            },
        },
        service: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

// GEOCODE & Create Location
AppointmentSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(`${this.address} São Paulo Brazil`)
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
    }

    this.address = loc[0].formattedAddress;
    next()
})

const Appointment = mongoose.model('Appointment', AppointmentSchema)

export default Appointment
