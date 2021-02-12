const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const memberRoutes = express.Router();
let Membership = require('./membership.model');

app.use(cors());
app.use(bodyParser.json());
app.use('/members', memberRoutes);

memberRoutes.route('/:id').get(function(req, res) {
    console.log('id', req.params.id);
    Membership.findById(req.params.id, function(err, member){
        if(err) {
            console.log(err)
        }
        res.send(member);
    });
});

//Retreiving data
memberRoutes.route('/').get(function (req, res) {
    Membership.find(function(err, members) {
        if(err) {
            console.log(err)
        } else {
        res.json(members);
        }
    });
});

//Posting data from users input to DB
memberRoutes.route('/add').post(function (req, res) {
    let newMembership = new Membership(req.body);
    newMembership.save()
                 .then(member => {
                     res.json({'member': 'added successfully.'});
                 })
                 .catch(err => {
                     res.send(err);
                 });    
});

//Updating entry by id
memberRoutes.route(`/update/:id`).post(function(req, res) {
        console.log("here")
        Membership.findById(req.params.id, function(err, member) {
            if(!member) res.send(err)
            member.Full_Name = req.body.Full_Name;
            member.Email = req.body.Email;
            member.Address = req.body.Address;
            member.Phone_Number = req.body.Phone_Number;
            member.save()
                    .then(members => {
                    res.json('member updated')
                });
        })
    });

//Deleting member by id 
memberRoutes.route('/delete').post(function(req, res) {

    Membership.findByIdAndRemove(req.body.memberId, function(err, response) {
            if(err) {
                res.send({message: 'error'})
            } else {
                res.send({message: 'success'})
            }
    });
});

mongoose.connect('mongodb+srv://db@cluster0.n2g4u.mongodb.net/fitnesmembership?retryWrites=true&w=majority', { useNewUrlParser: true })

const connection = mongoose.connection;
connection.once('open', function() {
    console.log('Mongoose connected successfully');
});

app.listen(3001, function(){
    console.log("Server is running on 3001.")
});
