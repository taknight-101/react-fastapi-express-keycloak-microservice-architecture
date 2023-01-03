const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const dbfile = "./data/db.db";
const port = 3333;
const webAppOrigin = "http://localhost:3000";
const pageSize = 3;

const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database(dbfile);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const jsonParser = bodyParser.json();

app.use(
    cors({
        origin: webAppOrigin,
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        exposedHeaders: ["X-SESSION-TOKEN"]
    })
);

app.get("/home", (req, res) => {
    // console.log(req.header("USER-ROLES")) //todo: checking on specific user roles :) 

    let user_roles = JSON.parse(req.header("USER-ROLES"))
    
    if (req.header("X-SESSION-TOKEN") && user_roles.includes("uma_authorization")) {
    let sql = "SELECT * FROM users ";
    return db.all(sql, (err, rows) => {

              res.send(rows);
              
    });
   


} 
res.send("<h1> un-authorized :( </h1> ")
});


app.get("/role_protected_route", (req, res) => {

    if (req.header("X-SESSION-TOKEN")) {
    let sql = "SELECT * FROM users ";
    db.all(sql, (err, rows) => {

                res.send(rows);
       
    });
} 
res.send("<h1> un-authorized :( </h1> ")
});




app.use((req, res) => {
    res.status(404);
});

app.listen(port, () => {
    console.log(`API running on port ${port}.`);
});