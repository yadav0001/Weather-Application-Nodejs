const request = require('postman-request')

const forecast = (longitude,latitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=988042f7576800d75e27526c6d64c125&query='+ latitude+','+ longitude
    request({url: url, json: true}, (error,response) =>{
        if(error){
            callback({error:'Unable to connect to weather services!'},undefined)
        }else if(response.body.error){
            callback({error:'Unable to find location'},undefined)
        }else{
            callback(undefined,{
                temperature : response.body.current.temperature,
                description : response.body.current.weather_descriptions[0],
                icon        : response.body.current.weather_icons[0],
                wind        : response.body.current.wind_speed,
                cloud       : response.body.current.cloudcover,
                humidity    : response.body.current.humidity,
                feelslike   : response.body.current.feelslike,
                uv          : response.body.current.uv_index,
                visibility  : response.body.current.visibility,
                city        : response.body.location.name,
                country     : response.body.location.country
            })
        }
    })
}

module.exports = forecast