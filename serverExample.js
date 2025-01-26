const {addNote} = require('./notes.controller.js')
const chalk = require('chalk')
const http = require('http')
const PORT = 3006
const fs = require('fs/promises')
const path = require('path')

const basePath = path.join(__dirname, 'pages')

const server = http.createServer(async (req, res) => {
    if (req.method === "GET") {
      const content = await fs.readFile(path.join(basePath, 'index.ejs'))
        res.setHeader('Content-type', 'text/html')
        res.writeHead(200, {
            'Content-type': 'text/html',
        })
        res.end(content)
    } else if (req.method === 'POST') {
        const body = []
        res.writeHead(200, {
            'Content-type': 'text/plain; charset=utf-8',
        })

        req.on('data', data => {
            body.push(Buffer.from(data))
        })
        req.on('end', () => {
            const title = body.toString().split('=')[1].replaceAll('+', ' ')
            addNote(title)
            res.end(`Title = ${title}`)
        })

    }
})

server.listen(PORT, () => {
    console.log(chalk.green(`Server has been started on port ${PORT}...`))
})



