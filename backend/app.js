const express = require('express');
const { client } = require('./db/connection.js'); 
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json()); 
app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      
      cb(null, `${Date.now()}.${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })





app.get('/blog', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM blogs');
        res.json({ data: result.rows }); // Return all rows
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/create-blog', async (req, res) => {
    try {

        const {title, category, image, post} = req.body
        const result = await client.query(
            'INSERT INTO blogs (title, img, post, category) VALUES ($1, $2, $3, $4) RETURNING *', 
            [title, image, post,category]
        );
        res.json({ message: 'Blog created successfully', desc: result.rowCount });
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/blog-image', upload.single('file'), function(req, res, next){
     res.json(req.file);
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});