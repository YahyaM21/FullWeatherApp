let weather = {
    apiKey: "bd7940ee7dc41b1498e9c940f8a1c57f",
    fetchWeather: function(city) {
        fetch(
        "http://api.openweathermap.org/data/2.5/weather?q="
        + city 
        + "&units=imperial&appid=" 
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const {name} = data;
        const {icon,description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";        
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = Math.floor(temp) + "°F";
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML = "Wind Speed: " + Math.floor(speed) + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"



    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
};

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
})

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key === "Enter"){
        weather.search();
    }
})

