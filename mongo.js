const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide password as an argument: Eg: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]
const url = `mongodb+srv://sandesh:${password}@cluster0.xu9kp.mongodb.net/fullstackopen-phonebook?retryWrites=true&w=majority`

mongoose.connect(url).catch((error) => {
  console.error(error.message)
  process.exit(1)
})

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

if (process.argv.length === 3) {
  Phonebook.find({}).then((phones) => {
    console.log('phonebook:')
    phones.map((phone) => console.log(phone.name, ' ', phone.number))
    mongoose.connection.close()
  })
}

if (process.argv.length > 3) {
  const newPhone = new Phonebook({
    name: newName,
    number: newNumber,
  })

  newPhone.save().then(() => {
    console.log(`Added ${newName} number ${newNumber} to phonebook`)
    mongoose.connection.close()
  })
}
