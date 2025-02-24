const express = require('express');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { client } = require('./db/connection.js'); 
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: { folder: "learnPern", format: "png", public_id: (req, file) => `${Date.now()}-${file.originalname}` },
});
const upload = multer({ storage });

app.get('/blog', async (req, res) => {
    const result = await client.query('SELECT * FROM blogs');
    res.json({ data: result.rows });
});

app.post('/blog-image', upload.single('file'), (req, res) => res.json({ imageUrl: req.file.path }));

app.post('/create-blog', async (req, res) => {
    const { title, category, image, post } = req.body;
    const result = await client.query('INSERT INTO blogs (title, img, post, category) VALUES ($1, $2, $3, $4) RETURNING *', [title, image, post, category]);
    res.json({ message: 'Blog created', desc: result.rowCount });
});

app.listen(3000, () => console.log(`Server running on port 3000`));