const weatherform = document.querySelector("form")
const search = document.querySelector("input")
const message1 = document.querySelector("#message-1")
const message2 = document.querySelector("#message-2")
const autolocate = document.querySelector("#autolocate")

weatherform.addEventListener("submit" , (e)=>{
    e.preventDefault()
    const location = search.value

    message1.textContent = "Loading.."
    message2.textContent= ""

    fetch("/weather?address="+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent = data.error
        }else{
            message2.textContent = data.forecast
            message1.textContent = data.location
        }
    })
    })
})

autolocate.addEventListener("click",(e)=>{
    e.preventDefault()
    message1.textContent = "Loading.."
    message2.textContent= ""
    navigator.geolocation.getCurrentPosition((position)=>{
        if (!navigator.geolocation) {
            return alert('Geolocation is not supported by your browser.') 
        }
            
        fetch("/autoWeather?latitude="+position.coords.latitude+"&longtitude="+position.coords.longitude).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    message1.textContent = data.error
                }else{
                    message2.textContent = data.forecast
                    message1.textContent = data.location
                }
            })
        })
    })
})


