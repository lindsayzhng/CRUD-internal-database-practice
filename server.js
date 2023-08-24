const express = require("express");
const app = express();
const PORT = 8000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(

  bodyParser.urlencoded({
    extended: true,
  })

);

// fake DB

let userDatabase = {

    1: {
      id: 1,
      firstName: "Jerry",
      lastName: "Smith",
      favColour: "Red",
    },

};

app.get("/", (req, res) => {
    res.send("hello world");
});

//get a list of all users in database
app.get("/users", (req, res) => {
    res.status(200);
    res.send(userDatabase);
});

//get a specific user
app.get("/users/:userID", (req, res)=>{
    const id = req.params.userID;
    const userData = userDatabase[id];
    //console.log(userData);
    res.send(userData);
});

//adding new user to database
app.post("/users", (req, res) => {
    const {id, firstName, lastName, favColour} = req.body;

    //only adding new user if userID doesn't exist
    if(!userDatabase[id]){

        userDatabase[id] = {id, firstName, lastName, favColour};
        const newUser = userDatabase[id];
        console.log(newUser);
        res.send("added new user");
        res.status(200);

    }

    //Error when userID exists already
    res.status(400);
    res.send("User already exists with this id")
});

app.put("/users/:userID", (req, res) => {
    const id = req.params.userID;
    const {userid, firstName, lastName, favColour} = req.body;
    const editUser = {userid, firstName, lastName, favColour};

    if(userDatabase[id]){

        for(let prop in userDatabase[id]){
            if(editUser[prop] === "" || editUser[prop] === undefined){
            }else{
                userDatabase[id][prop] = editUser[prop];
            }
        }

        // userDatabase[id] = userDatabase[id].map(item => {
        //     if(editUser.item != "" && editUser.item != undefined){
        //         return item;
        //     }else{
        //         return editUser.item;
        //     }
        // });
        res.status(200);
        res.send("Edited user contents successfully");
    }else{
        res.status(400);
        res.send("User does not exist");
    }
});

app.delete("/users/:userID", (req, res) => {
    const id = req.params.userID;
    if(userDatabase[id]){
        delete userDatabase[id];
        //console.log(userDatabase);
        res.status(200);
        res.send("User deleted successfully");
    }else{
        res.status(400);
        res.send("Non-existing user cannot be deleted");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});