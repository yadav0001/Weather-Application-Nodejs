const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error:'Please provide an address'})
    }
    geocode(req.query.address, (error,data) =>{
        if(error){
            return res.send(error)
        }
        forecast(data.longitude, data.latitude, (error,forecastData) =>{
            if(error) {
                return res.send(error)
            }
            res.send({
                city:data.location[0],
                country: forecastData.country,
                temperature: forecastData.temperature,
                description: forecastData.description,
                icon        : forecastData.icon,
                wind        : forecastData.wind,
                cloud       : forecastData.cloud,
                humidity    : forecastData.humidity,
                feelslike   : forecastData.feelslike,
                uv          : forecastData.uv,
                visibility  : forecastData.visibility,
            })
        })
    })
    
})

app.get('*',(req,res) => {
    res.send('404')
})

app.listen(port)