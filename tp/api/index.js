var compression = require('compression');
const express = require('express'),
  path = require('path')
const bodyParser = require('body-parser');
var cors = require('cors');
var multer = require('multer');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const env = require('./config/connection');
// const userLogin = require('./api/login');
// const skills = require('./api/skills');
// const tailgate = require('./api/tailgate');
// const license = require('./api/license');
// const unit = require('./api/unit');
// const role = require('./api/roles');
app.use(compression());
var options = {
  explorer: true
};
app.use(bodyParser.json());
app.use(cors());

app.set('port', (process.env.PORT || env.port));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use('/',express.static(path.join(__dirname, '../../frogmen')));
app.use(express.static(path.join(__dirname, '../dist/frogmen')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/frogmen/index.html'));
});
const server = app.listen(app.get('port'), function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
});
app.use(expressJwt({secret: 'todo-app-super-shared-secret'}).unless({path: ['/login', '/forgotPassword', '/changePassword', '/checkToken']}));

var storage = multer.diskStorage({ // storage code for storing setting
  destination: function(req, file, cb) {
      cb(null, base_urls + 'uploads/')
  },
  filename: function(req, file, cb) {
      cb(null, Date.now() + '.' + file.originalname.split('.').pop())
  }
});

var upload = multer({ storage: storage });




const userLogin =  require('./controllers/login')
app.post('/login', userLogin.login);


const masters = require('./controllers/masters');
app.post('/addConsumable', masters.addConsumable);
app.post('/getConsumable', masters.getConsumable);
app.post('/getConsumableById', masters.getConsumableById);
app.post('/editConsumable', masters.editConsumable);
app.post('/deleteConsumable', masters.deleteConsumable);

const units = require('./controllers/unit');

app.post('/getUnit', units.getUnit);
