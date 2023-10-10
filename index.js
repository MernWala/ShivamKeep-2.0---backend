const connectToMongoose = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongoose();

const app = express()
app.use(cors())
const port = process.env.PORT || 5000

app.use(express.json());

app.use('/', require('./routes/default'));
app.use('/api/auth/', require('./routes/auth'));
app.use('/api/notes/', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Keep+ listening on port ${port}`)
})
