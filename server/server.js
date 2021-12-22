require ("dotenv").config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const app = express();
///const { authenticate } = require('./config/jwt.config');

global.__basedir = __dirname;
console.log(__dirname);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//Connect to the database
require("./config/mongoose.config");

//multer configuration
const storageEngine = multer.diskStorage ({      
    destination:'./uploads/',
    filename: function (req, file, cb) {  
        console.log(file);
        console.log(req);      
        cb(null, file.fieldname);      
    }
});

// initialize multer
const upload = multer ({
    storage: storageEngine,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error('Only png, jpg, or jpeg files are allowed.'))
        }
    }  
});

//This must be called before adding your routes
app.use(cors({   
    credentials: true,
    origin: process.env.ORIGIN   
}));


//Route for uploading files.
app.post('/api/upload', upload.any(), function (req, res, next) {   
    res.json({ message: "Successfully uploaded files" });
});

require('./routes/file.routes')(app);
require('./routes/user.route')(app);
require('./routes/workout.route')(app);


const portNumber = process.env.MY_PORT;
app.listen(portNumber, ()=>console.log(`Server connected on port ${portNumber}`));
