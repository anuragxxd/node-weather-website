const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000
const pathName = path.join(__dirname , "../public")
const viewpath = path.join(__dirname,"../templates/views")
const partialpath = path.join(__dirname,"../templates/partials")


app.use(express.static(pathName))

app.set("view engine" , "hbs")
app.set("views" ,viewpath)
hbs.registerPartials(partialpath)

app.get("" , (req, res)=>{
    res.render("index" , {
        title : "Weather",
        name:"Anurag Gupta"
    })
})

app.get("/about" , (req,res)=>{
    res.render("about" , {
        title : "About me",
        name:"Anurag Gupta"
    })
})

app.get("/help" , (req,res)=>{
    res.render("help" , {
        title : "Help page",
        name:"Anurag Gupta"
    })
})

app.get("/products" , (req,res)=>{
    if(!req.query.search){
        return res.send({
            error : "Please provide search"
        })
    }
    res.send({
        products:[]
    })
})

app.get("/weather" , (req,res)=>{
    if(!req.query.address){
        return res.send({error : "Please provide address!"})
    }
    geocode(req.query.address, (error , {latitude , longtitude , location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

app.get("./help/*" , (req,res)=>{
    res.render("404",{
        title: "error 404: help page not found"
    })
})

app.get("*" , (req,res)=>{
    res.render("404",{
        title: "error 404: page not found"
    })
})

app.listen(port , ()=>{
    console.log("server is up on " + port)
})