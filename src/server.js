import app from './app'

const PORT = process.env.LOCAL_PORT

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT} 🏍🏍`)
})
