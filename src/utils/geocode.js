const request = require('postman-request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibmF2ZWVuMTc5OCIsImEiOiJja3hvZDZvM24wdnZ0MnZwNzlrbzlsamJtIn0.HHwqqe0hNbZTgnVd2uH4FA&limit=1';
    request({url:url, json:true},(error,response) =>{
        if(error){
            callback({error:'Unable to connect to location services!'},undefined)
        }else if(response.body.features.length===0){
            callback({error:'Unable to find location. Try another search.'},undefined)
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name.split(",")
            })
        }
    })
}

module.exports = geocode