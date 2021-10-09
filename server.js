// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable prettier/prettier */
const express = require('express')
const path = require('path')

const app = express()

app.use(express.static('build'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }


    })
})

app.listen(5000, () => {
    console.log(`Server is running on port ${5000}.`);
});
