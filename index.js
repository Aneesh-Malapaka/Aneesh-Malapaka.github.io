function onLoad(){
    getWeather()
    .then(value=>{
        setWeather(value)
    })

    getWeatherTomo().then(value=>{
        setWeatherTomo(value)
    })
    
    getWeatherPrediction().then(value=>{
        setWeatherPrediction(value)
    })

    
}

function submitName(){
    
    var location = document.querySelector('.ip').value
    console.log(location)
    getWeather(location)
    .then(value=>{
        setWeather(value)
    })

    getWeatherTomo(location).then(value=>{
        setWeatherTomo(value)
    })
    
    getWeatherPrediction(location).then(value=>{
        setWeatherPrediction(value)
    })

}
class Weather{
    constructor(){

        // card1 values
        this.max_temp 
        this.min_temp 
        this.pressure 
        this.visibility 
        this.humidity
        this.description

         //card4
         this.loc
         this.tomoTemp
         this.tomoWea

         //Prediction Card
         this.DayOne_max
         this.DayOne_min
         this.DayTwo_max
         this.DayTwo_min

         //date and month of the prediction cards
         this.DayOne_date
         this.DayTwo_date
         this.PredMonth

         //weather of the prediction cards
         this.DayOne_wea
         this.DayTwo_wea

    }

}
function setWeather(weather){

    document.querySelector('.max').innerHTML = weather.max_temp+"<sup>&deg;</sup>C"
    document.querySelector('.min').innerHTML = weather.min_temp+"<sup>&deg;</sup>C"
    document.querySelector('.Pvalue').innerHTML = weather.pressure+" mb"
    document.querySelector('.Vvalue').innerHTML = weather.visibility+" km"
    document.querySelector('.Hvalue').innerHTML = weather.humidity+"%"
    document.querySelector('.infowea').innerHTML = weather.description
    document.querySelector('.tempSide').innerHTML = weather.max_temp+ "&deg;C"
    
}   

function setWeatherTomo(weather){
    document.querySelector('.loc').innerHTML = weather.loc
    document.querySelector('.tempT').innerHTML = weather.tomoTemp+"&deg;C"
    document.querySelector('.wea-tom').innerHTML = weather.tomoWea

}

function setWeatherPrediction(weather){

    document.querySelector('.day1').innerHTML = weather.PredMonth +" "+weather.DayOne_date
    document.querySelector('.day2').innerHTML = weather.PredMonth +" "+weather.DayTwo_date

    document.querySelector('.tempofday1').innerHTML = weather.DayOne_max+"&deg;&nbsp;/ " +weather.DayOne_min +"&deg;&nbsp;"
    document.querySelector('.tempofday2').innerHTML = weather.DayTwo_max+"&deg;&nbsp;/ " +weather.DayTwo_min +"&deg;&nbsp;"
   
}


function getWeather(location){
    return new Promise(resolve => {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=22d9acfe588102a2d120c9fa6338f176&units=metric"
        )
        .then((response) => response.json())
        .then((data) =>{
                const weather = new Weather()
                weather.max_temp = Math.round(data.main.temp_max * 10)/10
                weather.min_temp = Math.round(data.main.temp_min * 10)/10
                weather.pressure = data.main.pressure
                weather.humidity = data.main.humidity
                weather.visibility = data.visibility/1000
                weather.description = data.weather[0].description

                resolve(weather)
        })
            
        })

        .catch((err) => alert("Wrong City name"));
}

function getWeatherTomo(location){
    return new Promise(resolve => {
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q="+location+"&appid=22d9acfe588102a2d120c9fa6338f176&units=metric"

        )
        .then((response) => response.json())
        .then((forecast) =>{
                const weather = new Weather()
                // console.log(forecast)

                //getting the city name, temperature, weather for next day in the card 4 
                weather.loc = forecast.city.name
                weather.tomoTemp = Math.round(forecast.list[5].main.temp *10)/10
                weather.tomoWea= forecast.list[5].weather[0].description
                resolve(weather)
        })
            
        })

        .catch((err) => alert("Wrong City name"));
}

function getWeatherPrediction(location){
    return new Promise(resolve =>{
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q="+location+"&appid=22d9acfe588102a2d120c9fa6338f176&units=metric"

        )

        .then((response)=>response.json())
        .then((predict) =>{
            const weather = new Weather()
            console.log(predict)

            var cal = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October","November","December"]

            var month =  predict.list[7].dt_txt.substring(5,7)
            month = parseInt(month)
            
            var date1 = predict.list[7].dt_txt.substring(8,10)
            var date2 = predict.list[15].dt_txt.substring(8,10)

            weather.DayOne_date = date1
            weather.DayTwo_date = date2

            weather.PredMonth= cal[month-1]
            // console.log(weather.DayOne_date +" "+weather.PredMonth)

            weather.DayOne_max = Math.round(predict.list[7].main.temp_max *10)/10
            weather.DayOne_min = Math.round(predict.list[7].main.temp_min *10)/10
            weather.DayTwo_max = Math.round(predict.list[15].main.temp_max *10)/10
            weather.DayTwo_min = Math.round(predict.list[15].main.temp_min *10)/10
            console.log(weather.DayOne_max +" "+weather.DayOne_min)
            resolve(weather)
        })
    })

    .catch((err) => alert("Wrong City name"));
}

