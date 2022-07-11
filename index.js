const express = require('express')
const path = require('path')

const app = express()

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    next()
})

app.use(express.static('dist', {
    setHeaders: function(res, path) {
        if(path.endsWith(".unityweb")){
            res.set("Content-Encoding", "gzip");
        }
    }
}))

app.get('/token', (req, res) => {
    res.json({token: `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTcyNzM0NDYsImV4cCI6MTY1Nzg3ODI0Niwicm9sZXMiOlsiUk9MRV9QQVJUIiwic2VydmljZV9jYXJyb3Vzc2VsIiwic2VydmljZV92aXNpdGV2aXJ0dWVsbGUiLCJzZXJ2aWNlX2JpZW5zc2ltdWxhaXJlcyIsInNlcnZpY2VfY2FydGVzIiwic2VydmljZV9mYWlyZXVub2ZmcmUiLCJzZXJ2aWNlX2pldmFpc29jY3VwZXIiLCJzZXJ2aWNlX3NlY29uZGVyZXNpZGVuY2UiXSwidXNlcm5hbWUiOiJ5dmVzQHlvcG1haWwuY29tIn0.uO7x2ToAR_YGEkOumz04DzzNFItuxeIT1IrWciIPEBabKa34GwhvCTH6umUL8wSXOq8p7JnQ9eRTEUDMfq-6eeKrDAS89e0h-3LkXz_St1hEVVtpUVITer-wqnvPPQm558FR5d27SGHX4Fci3UBBiDrb9N844mSF379_22iWEAB6FlCKY6xtrjTMaBUnBxZnTNXccFkHu-Px0vrdkGKjZtUHyef3s8-hXVIDlPL7nOaGDhQwlY9dJN_a0thaQue6cZ3YaFrKdZ_NXgANb7H3bjQO5TYdbJYMxZ80HYJLeq2rr7mzOSsGM8xqVrK9t9t1LtSSt5RDWRqmVhpzq_nUww`})
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(8080)