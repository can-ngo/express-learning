let dotenv = require('dotenv').config();
const express = require('express')
const app = express();
const port = 3000

// Example 1: Serve "Hello Express" when server received http GET 
// app.get('/', (req,res)=> {
//     res.send("Hello Express")
// })

// Example 2: console.log directory and using __dirname (absolute address)
console.log(__dirname); // C:\Users\Can Ngo\express-learning

// Example 3: send/serve file to client when server receives GET method
// a file location must be a absolute address on server
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '\\views\\index.html') 
    //My file location is C:\Users\Can Ngo\express-learning\views\index.html
})

// Example 3: Using middleware-function to log requests at root-level
// app.use(function middlewareLogger (req, res, next){
//     res.send(`
//         <h1>Hello from c4nng0 Server</h1>
//         <h3>Following are information about your connection:</h3>
//         <p>${req.method} ${req.path} - ${req.ip}</p>
//         `);
//     next();
// })

// Example 4: Environment variable, use module dotenv
app.get('/json', (req, res)=>{
    let response = { "message": 'Hello abcd'};
    if (process.env.MESSAGE_STYLE === 'uppercase'){
        response.message = response.message.toUpperCase();
        res.json(response)
    } else {
        res.json(response)
    }
})


// Example 5: Time Server
app.get('/now', function middleware(req, res, next){
    req.time = new Date().toString();
    next();
}
    ,(req, res)=>{
        res.json({time: req.time})
    }
)

// Example 6: Echo Server
app.get('/:word/echo', (req, res)=>{
    let word = req.params.word;
    res.json( {
        echo: word
    } )
})

// Example 7: Get query input from client
// URL look likes: .../name?firstname=[value]&lastname=[value]
app.get('/name', (req, res)=>{
    let firstname = req.query.firstname;
    let lastname = req.query.lastname;
    res.json({
        name: `${firstname} ${lastname}`
    })
})





app.listen(port, ()=> {
    console.log(`\nServer is listening on port ${port}\n*\n*`)
})

