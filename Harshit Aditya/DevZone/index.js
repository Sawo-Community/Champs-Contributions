const path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
const port = process.env.PORT || 3000;
const app = express()
app.use(bodyParser.json())
const publicDirectoryPath = path.join(__dirname, 'public')
app.use(express.static(publicDirectoryPath))
app.use(bodyParser.urlencoded({
    extended: true
}))
mongoose.connect(process.env.Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on('error', () => console.log("Error in connecting to Database"))
db.once('open', () => console.log("Connected to Database"))
app.post("/fetch", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    var data = {
        "name": name,
        "email": email,
        "Message": message
    }
    db.collection('test').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Message submitted successfully !")
    })
    return res.sendFile(__dirname + '/done.html')
})
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.sendFile(__dirname + "/index.html")
})

app.get("/fetch", (req, res) => {
    res.sendFile(__dirname + 'public/done.html')
})

    .listen(port, () => {
        console.log(`Server is running at ${port}`)
    })