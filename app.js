const API_token = "2d2ede5ae63556e8e9192c692eac52ca";

 const temperature = document.getElementById('temp');
 const city =  document.getElementById("city");
 const humid =  document.getElementById("humid");
 const wind =  document.getElementById("wind");
 const iconEl = document.querySelector(".icon");
 const error = document.getElementById("error");
 const desc = document.getElementById("desc");

async function getWeather(city) {
     
  try {   
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_token}`);
    const data = await response.json();
    
    const { name } = data;
    const { speed } = data.wind;
    const { humidity , temp } = data.main;
    const { icon , description } = data.weather[0];

    displayWeather(name, speed, humidity, temp, icon, description);

  } catch(err) {   
  	error.textContent = "City not found!";
  	error.style.display = "block";

  	document.getElementById('city').style.display = "none";
  	document.getElementById("humid").style.display = "none";
  	document.getElementById("wind").style.display = "none";
  	document.querySelector(".icon").style.display = "none";
  	document.getElementById('temp').style.display = "none";
  	document.getElementById('desc').style.display = "none"
  }
}
const displayWeather = (name, speed, humidity, temp, icon, description) => {
   error.style.display = "none";

    document.getElementById('city').style.display = "block";
  	document.getElementById("humid").style.display = "block";
  	document.getElementById("wind").style.display = "block";
  	document.querySelector(".icon").style.display = "block";
    document.getElementById('temp').style.display = "block";
     document.getElementById('desc').style.display = "block";
   
   let convert = temp - 273.15;

   temperature.textContent = convert.toFixed(2) + " °C";
   city.textContent = "Weather in " + name;
   humid.textContent = "Humidity: " + humidity + "%";
   wind.textContent = "Wind speed: " + speed + "km/h";
   iconEl.src = `http://openweathermap.org/img/w/${icon}.png`;
   desc.textContent = description;
   iconEl.style.display = "block";

}
getWeather("sorsogon");
document.getElementById("btn").addEventListener('click', function(e) {

	const input = document.getElementById("city-input").value;
	getWeather(input);
})