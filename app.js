let weather = {
    apiKey: "bd7940ee7dc41b1498e9c940f8a1c57f",
    fetchWeather: function (city) {
        fetch(
                "http://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=imperial&appid=" +
                this.apiKey
            )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const {
            name
        } = data;
        const {
            icon,
            description
        } = data.weather[0];
        const {
            temp,
            humidity
        } = data.main;
        const {
            speed
        } = data.wind;
        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = Math.floor(temp) + "°F";
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML = "Wind Speed: " + Math.floor(speed) + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"



    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
};

let geocode = {
    reverseGeoCode: function (latitude, longitude) {

        var apikey = '2904b7098d724698a632834a10893b47';
        var latitude = data.coords.latitude;
        var longitude = data.coords.longitude;

        var api_url = 'https://api.opencagedata.com/geocode/v1/json'

        var request_url = api_url +
            '?' +
            'key=' + apikey +
            '&q=' + encodeURIComponent(latitude + ',' + longitude) +
            '&pretty=1' +
            '&no_annotations=1';

        // see full list of required and optional parameters:
        // https://opencagedata.com/api#forward

        var request = new XMLHttpRequest();
        request.open('GET', request_url, true);

        request.onload = function () {
            // see full list of possible response codes:
            // https://opencagedata.com/api#codes

            if (request.status === 200) {
                // Success!
                var data = JSON.parse(request.responseText);
                weather.fetchWeather(data.results[0].components.city);
            } else if (request.status <= 500) {
                // We reached our target server, but it returned an error

                console.log("unable to geocode! Response code: " + request.status);
                var data = JSON.parse(request.responseText);
                console.log('error msg: ' + data.status.message);
            } else {
                console.log("server error");
            }
        };

        request.onerror = function () {
            // There was a connection error of some sort
            console.log("unable to connect to server");
        };

        request.send();

    },
    getLocation: function () {
        function success(data) {
            geocode.reverseGeoCode(data.coords.latitude, data.coords.longitude)
        }
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success, console.error);
        }else {
            weather.fetchWeather("Kansas City");
        }
        
    }
}

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
})

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        weather.search();
    }
})

geocode.getLocation();