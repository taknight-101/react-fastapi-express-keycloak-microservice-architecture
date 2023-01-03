const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const dbfile = "./data/db2.db";
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


app.post("/signup", (req, res) => {
    // console.log(req.header("USER-ROLES")) //todo: checking on specific user roles :) 
    const { id , username , email , password , access_token} = req.body ;

    // console.log(req.body)
    let user_roles = JSON.parse(req.header("USER-ROLES"))
    
    if (req.header("X-SESSION-TOKEN") && user_roles.includes("uma_authorization")) {
    let sql = "INSERT INTO users( id , username , email,password ,access_token) values( ? , ? , ? , ? , ?)";
    return db.run(
            sql,
            [id , username , email , password , access_token],
            (result , err) => {
                res.send(result);
            });
                
  
} 


res.send("<h1> un-authorized :( </h1> ")
});


// app.post("/cart", jsonParser, (req, res) => {
//     if (req.header("X-SESSION-TOKEN") && req.body.id) {
//         let sql = "SELECT COUNT(*) as count FROM cartitem WHERE uuid = ? AND event_id = ?";
//         db.get(
//             sql, 
//             [req.header("X-SESSION-TOKEN"), parseInt(req.body.id)], 
//             (err, row) => {
//                 let cnt = row.count;
//                 if (cnt === 0) {
//                     sql = "INSERT INTO cartitem (uuid, event_id, quantity) VALUES (?, ?, 1)";
//                 } else {
//                     sql = "UPDATE cartitem SET quantity = quantity + 1 WHERE uuid = ? AND event_id = ?";
//                 }
//                 db.run(
//                     sql,
//                     [req.header("X-SESSION-TOKEN"), req.body.id],
//                     (err) => {
//                         res.sendStatus(200).end();
//                     });
//             });
//     } else {
//         res.sendStatus(400).end();
//     }
// });

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