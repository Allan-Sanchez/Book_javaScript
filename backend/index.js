if(process.env.NODE_ENV !== "production"){
   require('dotenv').config();
}


const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

//initializacions

const app = express();
require('./dataBase');

// settings
app.set('port',process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(cors());//conected two server


const storage = multer.diskStorage({
   destination: path.join(__dirname,'public/uploads'),
   filename(re,file,cb){
      cb(null,new Date().getTime()+ path.extname(file.originalname));
   }
});

app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended:false}));//understand form
app.use(express.json());//understand json


//router
app.use('/api/books',require('./routes/books'));


//static files
app.use(express.static(path.join(__dirname,'public')));

//start server
app.listen(app.get('port'),() => {
   console.log('server on port',app.get('port')); 
});