

//script for current weather dashboard

var now = new Date();
var hours = now.getHours();
var minutes = now.getMinutes();
var seconds = now.getSeconds();
var ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12;
var formattedTime = hours + ':' + minutes + ':' + seconds+' '+ampm;
document.querySelector(".time").innerHTML=formattedTime;



document.querySelector(".search i").addEventListener("click",checkweather);

const apikey="dfdcf520498f60a1ffbb4edd4c15d42b";
const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
var url3="https://api.weatherapi.com/v1/current.json?key=364cd2dcdf4849b8abc63049242703&q=";


async function checkweather(){
    const searchbox= document.querySelector("input").value;
    if(searchbox==''){
        document.querySelector("input").placeholder="Enter Location";
        return;
    }
    const response = await fetch(apiurl +searchbox+ "&appid=dfdcf520498f60a1ffbb4edd4c15d42b");
    var data = await response.json();
    const response4 = await fetch(url3 +searchbox+"&aqi=no");
    var data4 = await response4.json();

    document.querySelector(".uv").innerHTML="uv: "+data4.current.uv;
    if(data.name.toLowerCase()!=searchbox.toLowerCase()){
        document.selectElementById("innav").innerHTML="Invalid Location";
        return;

    }
   
    document.querySelector(".loc").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°C";
    document.querySelector(".temp1").innerHTML=Math.round(data.main.temp)+"°C";
    document.querySelector(".fl").innerHTML=Math.round(data.main.feels_like)+"°C";
    document.querySelector(".v").innerHTML=data.visibility/1000+"mi";
    document.querySelector(".p").innerHTML=data.main.pressure/100+"in";
    document.querySelector(".des").innerHTML=data.weather[0].main;
    
    document.querySelector(".h").innerHTML=data.main.humidity+"%";
    document.querySelector(".w").innerHTML=data.wind.speed+"km/hr";

    document.querySelector(".t1").innerHTML=Math.round(data.main.temp_min)+"°C";
    document.querySelector(".t2").innerHTML=Math.round(data.main.temp_max)+"°C";



    if(data.weather[0].main === "Clouds"){
       document.querySelector(".row2 img").setAttribute("src","./images/clouds.png");
    }else if(data.weather[0].main === "Clear"){
        document.querySelector(".row2 img").setAttribute("src","./images/clear.png");
    }else if(data.weather[0].main === "Rain"){
        document.querySelector(".row2 img").setAttribute("src","./images/rain.png");
    }
    else if(data.weather[0].main === "Mist"){
        document.querySelector(".row2 img").setAttribute("src","./images/mist.png");
    }else if(data.weather[0].main === "Snow" ){
        document.querySelector(".row2 img").setAttribute("src","./images/snow.png");
    }else if(data.weather[0].main === "Haze"){
        document.querySelector(".row2 img").setAttribute("src","./images/haze.png");
    }
    else if(data.weather[0].main === "Smoke"){
        document.querySelector(".row2 img").setAttribute("src","./images/smoke.webp");
    }


    //Script for 5 day forecast dashboard

    const apiurl2="https://api.openweathermap.org/data/2.5/forecast?q=";


    const response2 = await fetch(apiurl2 +searchbox+ "&appid=dfdcf520498f60a1ffbb4edd4c15d42b");
    var data2 = await response2.json();

    //script for box1
    var boxes=document.querySelector('.box');
    
    for(var i=0;i<40;i++){
        var newdiv=document.createElement('div');
        newdiv.style.height='300px';
        newdiv.style.width='200px';
        newdiv.style.margin='15px';
        var newp1 =document.createElement('p');
        newp1.textContent=data2.list[i].dt_txt.slice(0,11);
        newp1.style.fontSize='12px';
        var newp2=document.createElement('p');
        newp2.textContent=data2.list[i].dt_txt.slice(11)+"h";
        var newp3=document.createElement('p');
        newp3.textContent=Math.round(data2.list[i].main.temp-273)+"°C";
        var newImage=document.createElement('img');
        newImage.src='./images/image.png';
        newImage.style.height='40px';
        newImage.style.width='40px';
        var newp4=document.createElement('p');
        newp4.textContent="💧"+data2.list[i].main.humidity+"%";
        var newp5=document.createElement('p');
        newp5.textContent=data2.list[i].weather[0].description;


        if(data2.list[i].weather[0].main === "Clouds"){
            newImage.setAttribute("src","./images/clouds.png");
         }else if(data2.list[i].weather[0].main === "Clear"){
            newImage.setAttribute("src","./images/clear.png");
         }else if(data2.list[i].weather[0].main === "Rain"){
             newImage.setAttribute("src","./images/rain.png");
         }
         else if(data2.list[i].weather[0].main === "Mist"){
            newImage.setAttribute("src","./images/mist.png");
         }else if(data2.list[i].weather[0].main === "Snow" ){
            newImage.setAttribute("src","./imagessnow.png");
         }else if(data2.list[i].weather[0].main === "Haze"){
            newImage.setAttribute("src","./images/haze.png");
         }
         else if(data2.list[i].weather[0].main === "Smoke"){
            newImage.setAttribute("src","./images/smoke.webp");
         }

         var special=data2.list[i].dt_txt.slice(11,13);
         if(special>=19 || special<=4){
            newImage.setAttribute("src","./images/nightmode.webp");
         }


        newdiv.appendChild(newp1);
        newdiv.appendChild(newp2);
        newdiv.appendChild(newp3);
        newdiv.appendChild(newImage);
        newdiv.appendChild(newp4);
        newdiv.appendChild(newp5);

        boxes.appendChild(newdiv);

    }



    //script for box2

    const apiurl3="https://api.weatherapi.com/v1/forecast.json?key=364cd2dcdf4849b8abc63049242703&q=";


    const response3 = await fetch(apiurl3 +searchbox+ "&days=1&aqi=yes&alerts=yes");
    var data3 = await response3.json();

    var boxess=document.querySelector('.box2');

    for(var i=0;i<24;i++){
        var newdiv=document.createElement('div');
        newdiv.style.height='250px';
        newdiv.style.width='200px';
        newdiv.style.margin='15px';
        var newp1 =document.createElement('p');
        var newp2=document.createElement('p');
        newp2.textContent=data3.forecast.forecastday[0].hour[i].time.slice(11)+"h";
        var newp3=document.createElement('p');
        
        newp3.textContent=data3.forecast.forecastday[0].hour[i].temp_c+"°C";
        var newImage=document.createElement('img');
        newImage.src='./images/image.png';
        newImage.style.height='40px';
        newImage.style.width='40px';
        var newp4=document.createElement('p');
        newp4.textContent="💧"+data3.forecast.forecastday[0].hour[i].humidity+"%";
        var newp5=document.createElement('p');
        newp4.style.fontSize='10px';
        newp5.textContent=data3.forecast.forecastday[0].hour[i].condition.text;

        if(data3.forecast.forecastday[0].hour[i].condition.text === "Clouds"|| data3.forecast.forecastday[0].hour[i].condition.text === "Partly cloudy"){
            newImage.setAttribute("src","./images/clouds.png");
         }else if(data3.forecast.forecastday[0].hour[i].condition.text === "Clear "){
            newImage.setAttribute("src","./images/clear.png");
         }else if(data3.forecast.forecastday[0].hour[i].condition.text === "Sunny"){
            newImage.setAttribute("src","./images/clear.png");
         }else if(data3.forecast.forecastday[0].hour[i].condition.text === "Rain"){
             newImage.setAttribute("src","./images/rain.png");
         }
         else if(data3.forecast.forecastday[0].hour[i].condition.text === "Mist"){
            newImage.setAttribute("src","./images/mist.png");
         }else if(data3.forecast.forecastday[0].hour[i].condition.text === "Snow" ){
            newImage.setAttribute("src","./images/snow.png");
         }else if(data3.forecast.forecastday[0].hour[i].condition.text === "Haze"){
            newImage.setAttribute("src","./images/haze.png");
         }
         else if(data3.forecast.forecastday[0].hour[i].condition.text === "Smoke"){
            newImage.setAttribute("src","./images/smoke.webp");
         }

         var spec=data3.forecast.forecastday[0].hour[i].time.slice(11,13);
         if(spec>=19 || spec<=5){
            newImage.setAttribute("src","./images/nightmode.webp");
         }

        newdiv.appendChild(newp2);
        newdiv.appendChild(newp3);
        newdiv.appendChild(newImage);
        newdiv.appendChild(newp4);
        newdiv.appendChild(newp5);

        boxess.appendChild(newdiv);


        var v=data4.current.uv;

        var parent=document.querySelector(".uvdes");
        document.querySelector(".uv").addEventListener("mouseover",()=>{
         var newdiv=document.createElement("div");
         newdiv.style.height="40px";
         newdiv.style.width="150px";
         newdiv.style.background="white";
         newdiv.style.position="absolute";
         var newele=document.createElement("p");
         newele.style.fontSize='14px';
         if(v>=1 && v<=2){
         newele.textContent="UV index:Normal";
         }else if(v>2 && v<=6){
            newele.textContent="UV index:Moderate";
         }else if(v>6  && v<=8){
            newele.textContent="UV index:High";
         }else{
            newele.textContent="UV index:Extreme";
         }
         newdiv.appendChild(newele);
         parent.appendChild(newdiv);
         parent.style.display="block";

        });
        document.querySelector(".uv").addEventListener("mouseout",()=>{

         document.querySelector(".uvdes").style.display='none';
         });



        var parent2=document.querySelector(".x5des");
        document.querySelector(".x5").addEventListener("mouseover",()=>{
         var newdiv=document.createElement("div");
         newdiv.style.height="100px";
         newdiv.style.width="320px";
         newdiv.style.background="white";
         newdiv.style.position="absolute";
         newdiv.style.padding="3px";
         var newele=document.createElement("p");
         newele.textContent='Pressure is the weight of the air in the atmosphere.It is normalized to the standard atmospheric pressure of 1,013.25mb (29.9212 inHg). Higher pressure is associated with sunny weather. Lower pressure with stormy weather.';
         newele.style.fontSize="14px";
         newdiv.appendChild(newele);
         parent2.appendChild(newdiv);
         parent2.style.display="block";

        });
        document.querySelector(".x5").addEventListener("mouseout",()=>{

        document.querySelector(".x5des").style.display='none';
       });


       var parent3=document.querySelector(".x3des");
       document.querySelector(".x3").addEventListener("mouseover",()=>{
        var newdiv=document.createElement("div");
        newdiv.style.height="100px";
        newdiv.style.width="320px";
        newdiv.style.background="white";
        newdiv.style.position="absolute";
        newdiv.style.padding="3px";
        var newele=document.createElement("p");
        newele.textContent='Amount of moisture present in the air relative to the maximum of moisture present in the air can contain at its current temperature.';
        newele.style.fontSize="14px";
        newdiv.appendChild(newele);
        parent3.appendChild(newdiv);
        parent3.style.display="block";

       });
       document.querySelector(".x3").addEventListener("mouseout",()=>{

       document.querySelector(".x3des").style.display='none';
      });


      var parent4=document.querySelector(".x1des");
       document.querySelector(".x1").addEventListener("mouseover",()=>{
        var newdiv=document.createElement("div");
        newdiv.style.height="60px";
        newdiv.style.width="100px";
        newdiv.style.background="white";
        newdiv.style.position="absolute";
        newdiv.style.padding="3px";
        var newele=document.createElement("p");
        newele.textContent='Good Visibility: (6-10)mi';
        newele.style.fontSize="14px";
        newdiv.appendChild(newele);
        parent4.appendChild(newdiv);
        parent4.style.display="block";

       });
       document.querySelector(".x1").addEventListener("mouseout",()=>{

       document.querySelector(".x1des").style.display='none';
      });
   }

      zz="Today's forecast for "+data.name+" is Temperature"+Math.round(data.main.temp)+" °C Humidity "+data.main.humidity+"% and "+data3.forecast.forecastday[0].hour[11].condition.text;
      voiceassistant(zz);

}

//Script for voice support


let speech = new SpeechSynthesisUtterance();

let voices=[];

window.speechSynthesis.onvoiceschanged = () =>{
   voices=window.speechSynthesis.getVoices();
   speech.voice=voices[4];
};

var searchboxx= document.querySelector("input").value;

function voiceassistant(){
   speech.text=zz;
   window.speechSynthesis.speak(speech);
}









