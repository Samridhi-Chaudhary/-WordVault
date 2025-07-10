
navigator.geolocation.getCurrentPosition(
    (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getWeather(latitude, longitude);
    }, (error) => {
        console.log("Error getting location", error);
    })

function getWeather(latitude, longitude) {
    const apiKey = "f9071d7b47fd8c35db7b6e98bd2e07be";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const location = data.name;
            const weatherDescription = data.weather[0].description;
            const temprature = (data.main.temp - 273.15).toFixed(2);
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

            document.getElementById("location").innerHTML = `${temprature}°C ${location}`;
            document.getElementById("weather").innerHTML = `${weatherDescription}`;
            document.getElementById("icon").innerHTML = `<img src="${iconUrl}" alt="Weather Icon" width="40">`;
        })
        .catch(error => {
            console.log("Error fetching weather data", error);
        })
}


async function searchMeaning() {
    const word = document.getElementById("searchWord").value.trim();

    if (!word) {
       alert("Please enter a word");
       document.getElementById("meaning").textContent="";
        document.getElementById("meaning").textContent="";
        return;
    }

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try{
        const response= await fetch(url);
        if(!response.ok){
            throw new Error("Word not found");
        }

        const data= await response.json();

        const definition= data[0].meanings[0].definitions[0].definition;
        const example=data[0].meanings[0].definitions[0].example;

        document.getElementById("meaning").textContent= definition;
        document.getElementById("example").textContent= example||"No Example available";
    }
    catch(error){
        
        alert(`Error: ${error.message}`);

    }
}


