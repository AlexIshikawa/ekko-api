import mongoose from 'mongoose'

class Database {
  constructor() {
    this.mongo()
  }

  mongoURI = process.env.MONGO_URL

  mongo() {
    mongoose
      .connect(this.mongoURI, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('MongoDB Connected 🚀🚀')
      })
      .catch(err => console.log(err))
  }
}

export default new Database()
