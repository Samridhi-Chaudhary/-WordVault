navigator.geolocation.getCurrentPosition(
    (position)=>{
    const latitude= position.coords.latitude;
    const longitude= position.coords.longitude;
    // console.log(`Latitude: ${latitude}, Longitude: ${longitude}` );
    getWeather(latitude,longitude);
},(error)=>{
    console.log("Error getting location", error);
})

function getWeather(latitude, longitude){
    const apiKey="48fa6c66222c23ed8e31e547fb247f2a";
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        const location=data.name;
        const weatherDescription=data.weather[0].description;
        const temprature= (data.main.temp-273.15).toFixed(2);
        const iconCode=data.weather[0].icon;
        const iconUrl=`http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
        document.getElementById("location").innerHTML=`${temprature}°C ${location}`;
        document.getElementById("weather").innerHTML=`${weatherDescription}`;
        document.getElementById("icon").innerHTML=`<img src="${iconUrl}" alt="Weather Icon" width="40">`;
    })
    .catch(error=>{
        console.log("Error fetching weather data", error);
    })
}


// function searchMeaning(){
//     const word=document.getElementById(searchWord).value.trim();

//     if(!word){
//         document.getElementById("meaning").textContent="Please enter a word";
//         return;
//     }

//     const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

//     fetch(url)
//         .then(response=>response.json())
//         .then(data=>{
//             const mean=data.meanings[1].definition;
//             const example=data.meanings[1].example;
//             console.log(mean);
//             console.log(example);
//         })
//         .catch(error=>{
//             console.log(`Error fetching meaning of ${word}`);
//         })
//     }
