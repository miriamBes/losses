// טעינת המודול express
const express = require('express');
// יצירת אפליקציה
const app = express();
const db = require('./models/db');

// כאן יש לטעון את כל הקונטרוללרים שיש באפליקציה
// לשים לב שחלק זה הוא מתשנה ותצרכנה להעתיק למה שיש אצלכן =============================================
const userController = require('./controllers/user.controller');
const findController = require('./controllers/find.controller');
const lossController = require('./controllers/loss.controller');
const imageController = require('./controllers/image.controller');
// const matchController = require('./controllers/match.controller');
const userMiddlware = require('./middlwares/user.middlware');
const cors = require('cors');
// הגדרת משתנה שמכיל את הפורט שעליו ירוץ הפרויקט
const port = 8000

db.connect();
// הוספה של מידלוור שיודע להמיר אוביקט של json
// שנשלח לקריאה ולהוסיף אותו בצורה מסודרת ל req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// האפשרות לקבל קריאה מכל קליינט שהוא
app.use(cors());

// מידלוור שעוש לוג לכל קריאה
app.use((req, res, next) => {
  // console.log('im in middelware now :)');
  next();
});

// כאן יש לקשר את הקונטרולרים למשתנה האפליקציה הראשי
// לשים לב שחלק זה הוא מתשנה ותצרכנה להעתיק למה שיש אצלכן =============================================
// הפוונקציה האמצעית היא middlware
// כל הקריאות לקונטרולר יעברו דרכה
app.use('/user', userController);
app.use('/find',  findController);
app.use('/loss',    lossController);
app.use('/image',    imageController);
// app.use('/match', userMiddlware,  matchController);

// הגדרה של קבצים סטטיים - כל מה שנמצא בתוך התיקייה public
// יהיה ניתן לגשת אליו דרך הכתובת של הדומיין
// לדוגמא: localhost:3000/index.html
// יחזיר את הקובץ index.html
// שנמצא בתוך התיקייה public
app.use(express.static('public'));

const multer = require('multer')
let name;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './images')
  },
  filename: (req, file, cb) => {
    name=file.originalname;
      cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })
const { labelDetection } = require('./services/imageProsses.service');


app.use('/bulk', upload.single('file') , async (req, res) =>{
  try { 
    const fullPath = __dirname +'/'+ req.file.path;
    console.log("fullPath : ",fullPath);
    // const result = await labelDetection(fullPath);
    // console.log("result in bulk : ",result);
      res.send(fullPath);
  } catch(error) {
    console.log("err!!!!");
         res.send(400);
  }
});


// הרצה של האפליקציה, מקבלת את הפורט שעליו האפליקציה אמורה לרוץ
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});



























MONGO_URL='mongodb://localhost:27017/project';
PORT=3000

// // Step 1 - set up express & mongoose


// // var express = require('express')
// // var app = express()
// var bodyParser = require('body-parser');
// var mongoose = require('mongoose')

// var fs = require('fs');
// var path = require('path');
// require('dotenv/config');


// // Step 2 - connect to the database

// // mongoose.connect(process.env+'mongodb://localhost:27017/project',
// // 	{ useNewUrlParser: true, useUnifiedTopology: true }, err => {
// // 		console.log('connected')
// //   });
  
// // Step 3 - code was added to ./models.js

// // Step 4 - set up EJS

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// // Set EJS as templating engine
// app.set("view engine", "ejs");

// // Step 5 - set up multer for storing uploaded files

// var multer = require('multer');

// var storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, 'uploads')
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, file.fieldname + '-' + Date.now())
// 	}
// });

// var upload = multer({ storage: storage });
// // Step 6 - load the mongoose model for Image

// var imgModel = require('./models/model');

// // Step 7 - the GET request handler that provides the HTML UI

// app.get('/', (req, res) => {
// 	imgModel.find({}, (err, items) => {
// 		if (err) {
// 			console.log(err);
// 			res.status(500).send('An error occurred', err);
// 		}
// 		else {
// 			res.render('imagesPage', { items: items });
// 		}
// 	});
// });

// // Step 8 - the POST handler for processing the uploaded file

// app.post('/', upload.single('image'), (req, res, next) => {

// 	var obj = {
// 		name: req.body.name,
// 		desc: req.body.desc,
// 		img: {
// 			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
// 			contentType: 'image/png'
// 		}
// 	}
// 	imgModel.create(obj, (err, item) => {
// 		if (err) {
// 			console.log(err);
// 		}
// 		else {
// 			// item.save();
// 			res.redirect('/');
// 		}
// 	});
// });

// // Step 9 - configure the server's port

// var port = process.env.PORT || '8000'
// app.listen(port, err => {
// 	if (err)
// 		throw err
// 	console.log('Server listening on port', port)
// })

