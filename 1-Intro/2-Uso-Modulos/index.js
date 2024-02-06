const fs = require('fs') // file system 

fs.readFile('texto.txt', 'utf8', (err, data) => {
	if (err) {console.log(err)}

	console.log(data)
})

fs.readFile('texto-nao-existe.txt', 'utf8', (err, data) => {
        if (err) {console.log(err)}

        console.log(data)
})
