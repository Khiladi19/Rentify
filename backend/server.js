import app from './app.js'
import connectionToDB from './config/db.js';
// import {config} from 'dotenv';
// config();
const Port = process.env.Port || 3000



// crate connection
app.listen(Port,async()=>{
    await connectionToDB();
    console.log(`App is running at https://localhost ${Port}`)
})
