const express = require('express');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const {User, UserSchema} = require('./models/User');
const InitialForm = require('./models/InitialForm');
const AVAILABLE_MATCHES = require('./availableMatches');

const app = express();

mongoose.connect("mongodb+srv://david:dava1998@lpcluster.mo4b7nt.mongodb.net/LigaPrvaka", {
    useNewUrlParser: true, 
    useUnifiedTopology:true
}).catch(error => console.log(error));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

const secretKey = 'liga_prvaka2023';

app.post("/register", async (req,res) => {
  
   const myUser = new User(req.body);
   try {
        const allUsers = await User.find({}); //get all users from mongoDB
        const foundUser = allUsers.find((user) => user.userName === myUser.userName);

        if (foundUser) {
            res.status(401).send("User with that username already exists!");
        } 
        else {
            await myUser.save();
            res.status(201).send(myUser);
        }
       
   }catch(error) {
    res.status(500).send(error);
   }
  
});
app.post("/login", async (req,res)=> {

    const user = req.body;

    const foundUser = await User.findOne({userName: user.userName, password: user.password}).exec();
    if (foundUser) {
        const token = jwt.sign({userId: foundUser._id}, secretKey, {expiresIn: '1h'});
        res.json({token, foundUser});
    }
    else {
        res.status(404).send("User not found!");
    }

});
app.post("/initialForm", async (req,res) => {
    try {
        const { userId, formData } = req.body;

        const user = await User.findById(userId);
      
        if (!user) {
            return res.status(404).json({error: 'User not found!'})
        }

        const initialForm = new InitialForm({
            user: user._id,
            leagueWinner: formData.leagueWinner,
            bestScorer: formData.bestScorer,
            groupAOrder: formData.groupAOrder,
            groupBOrder: formData.groupBOrder,
            groupCOrder: formData.groupCOrder,
            groupDOrder: formData.groupDOrder
        });
        console.log(initialForm);
        
        await initialForm.save();
        return res.status(201).json({message: 'Form data submitted successfully!'});

    }catch(error) {
        res.status(500).json({error: 'Internal server error'});
    }
})

app.put("/initialForm", async (req,res) => { // ZA SADA: tu sam mijenjao samo initialFormSubmitted, pa cu samo to promijenit u bazi
    
    try {

        const updatedUser = req.body;
        const updatedUserID = await User.findOne({userName: updatedUser.userName}, '_id').exec();

        const update = {
            $set: {
                initialFormSubmitted: updatedUser.initialFormSubmitted
            }
        }

        const result = await User.updateOne({_id: updatedUserID}, update).exec();

        if (result.nModified === 1) {
            console.log("User updated successfully!");
        }
    }catch(error) {
        console.log("Cannot update user with provided username");
    }

});

app.get('/availableMatches', async (req,res) => {
    res.json(AVAILABLE_MATCHES);
})

app.listen(5000, (req,res) => {
    console.log("Server started on port 5000!");
});

