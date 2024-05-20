import  express from 'express';

// .env file conig 
import {config} from 'dotenv';
config();
import errorMiddleware from './middlewares/error.middlewares.js';

// acess express all properties in app
const app = express();

// import the routes 
import userRoutes from './routes/user.route.js'
import propertyRoutes from './routes/property.route.js'

// to set cookies 
import cookieParser from 'cookie-parser';

// morgan is use for access node.js middlewares
import morgan from 'morgan';
app.use(morgan('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes defined 
app.use('/api/rentify/user',userRoutes);
app.use('/api/rentify/proerty',propertyRoutes);

// that handle the code error
app.use(errorMiddleware)

// checking sever start or not 
app.use('/ping',(req,res)=>{
    res.send('/Pong')
})
//  if user give wrong url 
app.all('*',(req,res)=>{
    res.status(404).send('OOPS!! 404 Page Not Found')
})

export default app;