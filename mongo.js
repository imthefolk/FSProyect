const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const _name = process.argv[3]
const _number = process.argv[4]

const url =
  `mongodb+srv://victorfolk16:Tokio23@cluster0.fjj2w31.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String
})

const Person = mongoose.model('Person', noteSchema)

if (process.argv.length === 3) {
  console.log("Printing data...")
  Person.find({}).then(result =>  {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

else {
  const person = new Person({
      id: Math.floor(Math.random() * (Math.floor(250) - Math.ceil(50)) + Math.ceil(50)),
      name: _name,
      number: _number
  })

  person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
  })
}
