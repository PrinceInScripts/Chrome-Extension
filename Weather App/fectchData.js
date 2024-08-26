const API_Key='089e2d595d39a9a5ce6954873dc98c52'
let lat;
let lon;
window.onload=function(){

 

 let geoSuccess=function(position){

    let startPos=position;

    lat=startPos.coords.latitude;
    lon=startPos.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=mertic&appid=${API_Key}`)
    .then((data)=>data.json())
    .then((jsonData)=>{

        console.log(jsonData);
        
        fetch(`https://openweathermap.org/img/wn/${jsonData.weather[0].icon}@2x.png`)
       .then((res)=>res.blob())
       .then((result)=>{
        document.getElementById("text_location").innerHTML=jsonData.name;    
        document.getElementById("text_location_country").innerHTML=jsonData.sys.country;    
     
        document.getElementById("text_temp").innerHTML=Math.round(jsonData.main.temp- 273.15);    
        document.getElementById("temp_feelsLike").innerHTML = Math.round(jsonData.main.feels_like- 273.15);  
     
        document.getElementById("text_desc").innerHTML=jsonData.weather[0].description
    
        const imageObjectURL=URL.createObjectURL(result)
    
        document.getElementById("icon").src=imageObjectURL;
       })
       .catch((error)=>{
        console.error("Error fetching weather data:", error);
       })
      
    })
 }


 navigator.geolocation.getCurrentPosition(geoSuccess)
   
}  