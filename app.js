// MAIL SEND


const express = require('express'),
    bodyParser = require('body-parser'),
    exphbs = require('express-handlebars'),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    connectFlash = require('connect-flash'),
    MongoStore = require('connect-mongo'),
    fileUpload = require('express-fileupload'),
    expressSession = require('express-session'),
    multer = require('multer'),
    MomentHandler = require("handlebars.moment"),
    nodemailer = require('nodemailer');

// CONTROLLER
const contactMailerController = require('./controllers/contactController/contactMailer')
,   devisReparController = require ('./controllers/contactController/contactRepar')
,   devisVenteController = require ('./controllers/contactController/contactVente')

// VEHICULES
const vehiculeSingleController = require('./controllers/vehiculesController/vehiculeSingle'),
    vehiculeAddController = require('./controllers/vehiculesController/vehiculeAdd'),
    vehiculePostController = require('./controllers/vehiculesController/vehiculePost'),
    garagePage = require('./controllers/garagePage'),
    vehiculeEdit = require('./controllers/vehiculesController/vehiculeEdit'),
    vehiculeEditPost = require('./controllers/vehiculesController/vehiculeEditPost'),
    vehicule = require('./database/models/Vehicule'),
    vehiculeDelete = require('./controllers/vehiculesController/vehiculeDelete');

// USERS
const adminCreate = require('./controllers/adminController/adminCreate'),
    adminRegister = require('./controllers/adminController/adminRegister'),
    adminLogin = require('./controllers/adminController/adminLogin'),
    adminLoginAuth = require('./controllers/adminController/adminLoginAuth'),
    adminLogout = require('./controllers/adminController/adminLogout'),
    adminPannelController = require('./controllers/adminController/adminPannel');

// MULTER INIT UPLOAD
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fileldname + '-' + Date.now())
    }
});
const upload = multer({
    storage: storage
}).array('image', 10);

// express
const app = express()

// MONGODB
// const db = require('./config/keys.js').MongoURI

mongoose.set('useCreateIndex', true)
mongoose
    .connect('mongodb://localhost:27017/ams-manu', {
        useNewUrlParser: true
    })
    .then(() => console.log('connect MongoDB Cloud'))
    .catch(err => console.log(err));

const mongoStore = MongoStore(expressSession)

app.use(connectFlash())

app.use(expressSession({ // utilise express-session
    secret: 'securite', // code secret 
    name: 'biscuit', // cookie
    saveUninitialized: true,
    resave: false,

    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

app.use(bodyParser.json()) // utilisation du body parser 
app.use(bodyParser.urlencoded({ // utilisation de l'encodage pour camoufler le code secret 
    extended: true
}))
app.use(fileUpload())

const auth = require('./middleware/auth') // authentification
    ,
    redirectAuthSuccess = require("./middleware/redirectAuthSuccess") // rediriger sur la reussite dez l'authentification et ses debouches

var Handlebars = require("handlebars"); // utilisation d'handlebars
var momentHandler = require("handlebars.moment"); // moment permet de mettre des dates 
MomentHandler.registerHelpers(Handlebars);
// limit an array to a maximum of elements (from the start)
Handlebars.registerHelper('limit', function (arr, limit) { // permet de limiter les publications
    if (!Array.isArray(arr)) {
        return [];
    }
    return arr.slice(0, limit);
});


app.use(express.static('public'));

// EXPRESS-HANDLEBARS
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use('*', (req, res, next) => {
    res.locals.admin = req.session.adminId;
    next()
})

// MIDDLEWARE
const vehiculeValidPost = require('./middleware/vehiculeValidPost')
app.use('/vehicule/post', vehiculePostController)
app.use('/vehicule/add', auth)
// mongoose connect
// mongoose.connect('mongodb://localhost:27017/ams-manu', {useNewUrlParser: true, useFindAndModify: true});

// ==============================SITE==============================
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
    vehicule.find((err, vehicule) => {
        if (!err) {
            res.render('garage', {
                posts: vehicule
            })
        } else {
            res.send(err)
        }
    })
})
app.get('/message-sent', (req, res) => {
    res.render('message-sent')
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
app.get('/admin-pannel', auth, adminPannelController)
app.get('/add-vehicule', auth, vehiculeAddController)
app.get('/vehicule/:id', vehiculeSingleController)
app.get('/oublie', (req, res) => {
    res.render('forget-password')
})
app.get('/vehicule-edit/:id', auth, vehiculeEdit)
app.get('/vehicule/delete/:id', vehiculeDelete)
// app.get('/garage')

// POST
app.post('/vehicule/post', auth, vehiculeValidPost, vehiculePostController)
app.post('/vehiculeEditPost/:id', function (req, res) {
    const Vehicule = require('./database/models/Vehicule');
    const path = require('path')
    let query = {
        id: req.body.vehiculeId
    }
    const {
        image
    } = req.files
    const uploadFile = path.resolve(__dirname, '..', 'public/vehicule', image.name);
    image.mv(uploadFile, (error) => {
        Vehicule.findOneAndUpdate(query, {
            ...req.body,
            image: `/vehicule/${image.name}`
        }, function (error, post) {
            if (error) {
                console.log(error);
                console.log('PAS OK');
                return;
            } else {
                console.log("C'est OK");
                res.redirect('/admin-pannel')
            }
        })
    })
})
app.post('/vehicule/post', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('admin-pannel', {
                msg: err
            });
        } else {
            console.log(req.file);
            res.send('test');
            if (req.file == undefined) {
                res.render('index', {
                    msg: 'Error: No File Selected!'
                });
            } else {
                res.render('index', {
                    msg: 'File Uploaded!',
                    file: `uploads/${req.file.filename}`
                });
            }


        }
    });
});

// ============ CONTACT ===============

// ===== MAILER ===== 

app.post('/send-contact', contactMailerController)


app.post('/send-repar', devisReparController)
app.post('/send-vente', devisVenteController)

// ===========================ADMIN================================

// GET
app.get('/admin/create', redirectAuthSuccess, auth, adminCreate)
app.get('/admin/login', redirectAuthSuccess, adminLogin)
app.get('/admin/logout', adminLogout)
// POST
app.post('/admin/register', redirectAuthSuccess, auth, adminRegister)
app.post('/admin/loginAuth', adminLoginAuth)

// ERREUR 404
app.use((req, res) => {
    res.render('error404')
})

app.listen(3300, () => {
    console.log('http://localhost:3300');

})