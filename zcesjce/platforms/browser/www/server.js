var express = require('express');
var https = require('https');
var fs = require('fs');
var app = express();
var privateKey = fs.readFileSync('/home/studentuser/certs/client-key.pem').toString();
var certificate = fs.readFileSync('/home/studentuser/certs/client-cert.pem').toString();  
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(4443);

const bodyParser = require('body-parser')
const pg = require('pg')
const pool = new pg.Pool({
   user: 'user80',
   password: 'user80password',
   database: 'user80db',
   host: "192.168.128.29"
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "X-Requested-With");
 next();
});

app.use(express.static('.'))

app.get('/questions', function (req, res) {

  pool.connect(function(err, client, done) {
    if (err){
      console.log("Not able to get connection: " + err)
  		res.status(500).send(err)
			return
    }

    client.query(`select * from questions`,
  	  function(err,result) {
  			done()

  			if(err){
  				console.log(err)
  				res.status(500).send(err)
  			}

  			console.log('Data selected')
  			res.send(result.rows)
  	 })
  })
})

app.post('/questions', function (req, res) {
  console.log(`Body was: ${JSON.stringify(req.body)}`)

  let questionText = req.body.questionText
  let option1 = req.body.option1
  let option2 = req.body.option2
  let option3 = req.body.option3
  let option4 = req.body.option4
  let correctAnswer = req.body.correctAnswer
  let latitude = req.body.latitude
  let longitude = req.body.longitude

  /*
	

			create table questions (
					questionText character varying (255),
					option1 character varying (255),
					option2 character varying (255),
					option3 character varying (255),
					option4 character varying (255),
					correctAnswer character varying (255),
					latitude decimal(9,6),
					longitude decimal(9,6)
			);
   */
  pool.connect(function(err, client, done) {
    if (err){
      console.log("Not able to get connection: " + err)
  		res.status(500).send(err)
			return
    }

		const query = `INSERT INTO questions (questionText, option1, option2, option3, option4, correctAnswer, latitude, longitude)
			values ('${questionText}', '${option1}', '${option2}', '${option3}', '${option4}', '${correctAnswer}', ${parseFloat(latitude) || 0}, ${parseFloat(longitude) || 0})`
		console.log(query)
    client.query(query,
  	  function(err,result) {
  			done()

  			if(err){
  				console.log(err)
  				res.status(500).send(err)
  			}

  			console.log('Data inserted')
  			res.redirect('/')
  	 })
  })
})


