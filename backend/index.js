const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors')
const userController = require('./controller/user')
const user = require('./models/users')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb://risaldarrutam:passwordps@ac-jtpu1zn-shard-00-00.oxwm0os.mongodb.net:27017,ac-jtpu1zn-shard-00-01.oxwm0os.mongodb.net:27017,ac-jtpu1zn-shard-00-02.oxwm0os.mongodb.net:27017/?ssl=true&replicaSet=atlas-t2twmu-shard-0&authSource=admin&retryWrites=true&w=majority', (err) => {
    if (err) {
        console.log('Database not connected.')
    } else {
        console.log('Database Connected.')
    }
}); 

app.post('/signup', userController.signup)
app.post('/signin', userController.signin)
app.get('/getAlluser',async(req,res)=>{
    try{
        const allUser= await user.find({});
        res.send({status:"ok", data:allUser});
    }
    catch(error){
        console.log(error);
    }
})

// app.post('/deleteUser',userController.deleteUser)

app.listen(5000, () => {
    console.log(`Backend Running At Port 5000`)
})