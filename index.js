const connectToMongoose = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongoose();

const app = express()
app.use(cors())
const port = 5000

app.use(express.json());

app.use('/', require('./routes/default'));
app.use('/api/auth/', require('./routes/auth'));
app.use('/api/notes/', require('./routes/notes'));

app.listen(port, '0.0.0.0', () => {
  console.log(`Keep+ listening on port ${port}`)
})
