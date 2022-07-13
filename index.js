const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()
const axios = require('axios').default

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'https://back-immochv2.my-preprod.space')
    next()
})

app.use(cookieParser())

app.use(express.static('dist', {
    setHeaders: function(res, path) {
        if(path.endsWith('.unityweb')) res.set('Content-Encoding', 'gzip');
    }
}))

app.get('/login', async (req, res) => {
    try{
        const token = req.headers['authorization'].split('Bearer ')[1]
        await axios.get('https://back-immochv2.my-preprod.space/api/immo/v2/public/user_info', {headers: {authorization: 'Bearer ' + token}})
        if(!token) throw null
        res.cookie('session', token)
        res.status(201).json({message: 'Logged!'})
    }catch(e){
        if(!e) res.status(500).json({message: 'An error occured!'}) 
        else res.status(403).json({message: 'Token Rejected!'})
    }
})

app.get('/logout', async (req, res) => {
    try{
        res.clearCookie('session')
        res.status(201).json({message: 'Done!'})
    }catch(e){ res.status(500).json({message: 'An error occured'}) }
})

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

app.listen(process.env.PORT || 8080)