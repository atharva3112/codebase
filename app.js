const express = require('express')
const app = express()
const port = 3001
var cors = require('cors')
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
key= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

// var request = require("request")

app.use(function (req, response, next) {
	// Website you wish to allow to connect
	const allowedOrigins = ['https://editor.swagger.io', 'https://hoppscotch.io'];
	const origin = req.headers.origin;
		
	if (allowedOrigins.includes(origin)) {
	  response.setHeader('Access-Control-Allow-Origin', origin);
	}

	// Request methods you wish to allow eg: GET, POST, OPTIONS, PUT, PATCH, DELETE
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	
	// Request headers you wish to allow
	response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader != "undefined") {
	  const bearer = bearerHeader.split(" ");
	  const bearerToken = bearer[1];
	  req.token = bearerToken;
	  next();
	}

	// Pass to next layer of middleware
	next();
  });


// endpoint for `GET/data/2.5/weather` 
app.get('/data/2.5/weather', get_weather)
app.get('/v1/weather' ,get_weather)
app.get('/v1/hello',get_hello)
app.post('/v1/auth', post_auth)

// To Do : define two other endpoints. 

function get_weather(req,response)
{
  if(req.query.token == key){
    response.json({"coord":{"lon":-123.262,"lat":44.5646},"weather":[{"id":741,"main":"Fog","description":"fog","icon":"50n"}],"base":"stations","main":{"temp":278.16,"feels_like":278.16,"temp_min":275.73,"temp_max":281,"pressure":1025,"humidity":78},"visibility":402,"wind":{"speed":0,"deg":0},"clouds":{"all":100},"dt":1642227125,"sys":{"type":2,"id":2012991,"country":"US","sunrise":1642175199,"sunset":1642208235},"timezone":-28800,"id":5720727,"name":"Corvallis","cod":200})
  }
	
}

function get_hello(req,response)
{
  if (req.query.token == key){
    response.json({
      "hello": "Hello Atharva"
    });

  }
  else {
    response.sendStatus(401);
  }
  
}



function post_auth(req,res){
  let usernames = ['atharva','Aj','abc']
  let passwords = ['joshiat','joshi','admin']
  // const obj = JSON.parse(req.body)
  let username = req.body.username
  let pwd = req.body.password

  if(usernames.includes(username)){
    if(passwords.includes(pwd)){
        res.json({ "access-token":key,
      "expires": "2022-02-19T22:18:26.625Z"
    })
    }
}
}


app.listen(port, () => {
  console.log("Server listening at port " + port)
})