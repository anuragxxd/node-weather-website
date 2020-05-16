const request = require("request")

const forecast = (latitude , longtitude , callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=27e563feb43c1a334b8f016748b0a2f6&query="+latitude+","+longtitude+"&units=m"
    request({ url , json:true},(error,{body})=>{
        if(error){
            callback("Unable to connent! Make sure internet is on.",undefined)
        }else if(body.error){
            callback("Type the right location",undefined)
        }else{
            callback(undefined,"Temperature is "+body.current.temperature+" degrees and it feels like "+body.current.feelslike + " degrees with the humidity of " + body.current.humidity + ".")
        
        }
    })
}

module.exports = forecast