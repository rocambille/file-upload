const express = require('express');
const serverPort = 5000;

// init the express app
const app = express();

const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use('/uploads', express.static('uploads'));

const multer  = require('multer');
const upload = multer({ dest: 'tmp/' });

const fs = require('fs');

// define the index route
app.post('/upload', upload.single('File'), (req, res) => {
 console.log(req.file);
 if (req.file.size <= 22000) {
    fs.renameSync(req.file.path, `uploads/${req.file.originalname}`);
 }
 else {
     fs.rmdirSync(req.file.path);
 }
 res.send('Hello dear API client :)');
});

// listen to incoming requests
app.listen(serverPort, () => console.log('Express server is running'));
