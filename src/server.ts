import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth';
import { createNewUser, signin } from "./handlers/user";
const app = express();

// remember to put all your middleware above your routes in order for them to be able to access the middleware functionality
//---------Start of MiddleWare----------------------------
// this allows clients to access the api
app.use(cors())
// morgan allows us to receive data on the requests we send. The response can be found in the logs
app.use(morgan('dev'))
// express.json allows us to receive json back to our server
app.use(express.json())
//express.urlencoded allows a client to add things like a query string or a parameter and have it encoded properly.
app.use(express.urlencoded({ extended: true }))
//---------End of MiddleWare----------------------------


app.get('/', (req, res) => {
  console.log('hello from express');
  res.status(200)
  res.json({ message: "hello" })
})

app.use('/api', protect, router)
app.post('/user', createNewUser)
app.post('/signin', signin)
export default app