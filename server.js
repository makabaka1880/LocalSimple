const express = require("express");
const fs = require("fs");
const path = require("path")
const multer = require("multer")

const app = express();

const PORT = 3000;

const upload = multer({
    dest: 'files/uploads/' // Directory where files will be saved
});

function getRandomPoem() {
    const files = fs.readdirSync("files/poems/");
    const index = Math.floor(Math.random() * files.length);
    console.log(index)
    const chosen = files[index];
    console.log(chosen)
    const filePath = path.join('files/poems', chosen);
    const poemContent = fs.readFileSync(filePath, 'utf8');

    return poemContent
}

app.use(express.static(__dirname));
app.use(express.json());

app.get('/fetch-random-poem', (req, res) => {
    const poem = getRandomPoem();
    res.json({ poem });
})

app.get('/fetch-notice', (req, res) => {
    const notice = fs.readFileSync("files/notice.txt", 'utf8');
    res.json({ notice });
}) 
app.post('/upload-notice', (req, res) => {
    const { notice } = req.body;
    if (!notice) {
        return res.status(400).json({ success: false, message: 'Notice text is required.' });
    }

    fs.writeFile("files/notice.txt", notice, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error saving the notice.' });
        }
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Server runnning at localhost:${PORT}`);
})