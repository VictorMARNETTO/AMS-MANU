const express = require('express')
,     bodyParser = require('body-parser')
,     exphbs  = require('express-handlebars')
,     mongoose = require('mongoose')
,     nodemail = require('node-mailer')
,     bcrypt = require('bcrypt')
,     connectFlash = require('connect-flash')
,     MongoStore = require('connect-mongo')
,     fileUpload = require('express-fileupload')
,     expresspSession = require('express-session');

// CONTROLLER
// VEHICULES
const vehiculeSingleController = require('./controllers/vehiculeSingle')
,     vehiculeAddController = require('./controllers/vehiculeAdd')
,     vehiculePostController = require('./controllers/vehiculePost')
,     garagePage = require('./controllers/garagePage')
,     vehiculeEdit = require('./controllers/vehiculeEdit')
,     vehiculeEditPost = require('./controllers/vehiculeEditPost')
,     vehiculeDelete = require('./controllers/vehiculeDelete');

// USERS
const userCreate = require('./controllers/userCreate')
,     userRegister = require('./controllers/userRegister')
,     userLogin = require('./controllers/userLogin')
,     userLoginAuth = require('./controllers/userLoginAuth')
,     userLogout = require('./controllers/userLogout');

// express
const app = express()

// MONGODB
const db = require('./config/keys.js').MongoURI

mongoose.set('useCreateIndex', true)
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('connect MongoDB Cloud'))
    .catch(err => console.log(err));

const MongoStore = MongoStore(expresspSession)

app.use(connectFlash())


app.use(express.static('public'));

// EXPRESS-HANDLEBARS
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// mongoose connect
mongoose.connect('mongodb://localhost/ams-manu', {useNewUrlParser: true});
// USE

// GET
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/prestations', (req, res) => {
    res.render('prestations')
})
app.get('/devis', (req, res) => {
    res.render('devis')
})
app.get('/devis-ventes', (req, res) => {
    res.render('devis/ventes')
})
app.get('/devis-reparations', (req, res) => {
    res.render('devis/entretiens-reparations')
})
app.get('/garage', (req, res) => {
    res.render('achats')
})
app.get('/garage/:id', (req, res) => {
    res.render('vehicules/vehicule')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})
app.get('/mot-de-passe-oublie', (req, res) => {
    res.render('mdp-oublie')
})
app.get('/mot-de-passe-envoye', (req, res) => {
    res.render('mdp-envoye')
})
app.get('/admin', (req, res) => {
    res.render('admin/admin-login')
})
app.get('/admin-pannel', (req, res) => {
    res.render('admin/admin-pannel')
})
app.get('/add-vehicule', (req, res) => {
    res.render('vehicules/add-vehicules')
})
app.get('/edit-vehicule', (req, res) => {
    res.render('vehicules/edit-vehicule')
})
app.get('/oublie', (req, res) => {
    res.render('forget-password')
})

// POST


app.listen(3300, () =>{
    console.log('server started on port 3300');
    
})