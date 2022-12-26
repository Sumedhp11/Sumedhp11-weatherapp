const input = document.getElementById('input');
const button  = document.getElementById('search-btn')
const city = document.getElementById('city-name')
const localtime = document.getElementById('city-time')
const temp = document.getElementById('city-temp');
const btn = document.getElementById('loca-btn');

async function getdata(cityname){
    const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=a5b94e4542f646588fe165019222212&q=${cityname}&aqi=yes`);
    return await promise.json()
}

async function gotdata(lat,long){
    const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=a5b94e4542f646588fe165019222212&q=${lat},${long}&aqi=yes`);
    return await promise.json()
}

button.addEventListener('click',  async () => {
    const value = input.value;
   const result = await getdata(value);
   city.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
   localtime.innerText = result.location.localtime;
   temp.innerText = result.current.temp_c +" "+ 'celcius';
   console.log(result)
});

function visible(){
    const output = document.getElementById('output-container')
    output.style.visibility = "visible"
}

async function gotlocation(position){
   const result =  await gotdata(position.coords.latitude,position.coords.longitude)
   city.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
   localtime.innerText = result.location.localtime;
   temp.innerText = result.current.temp_c +" "+ 'celcius';
   visible()
}

function failedToget(){
    console.log('There Some issue')
}

btn.addEventListener('click', async()=>{
    navigator.geolocation.getCurrentPosition(gotlocation,failedToget);
})


