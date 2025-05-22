let temp=document.querySelector('.temp');
let input=document.querySelector('input')
document.querySelector('button').addEventListener('click',function(e){
    e.preventDefault();
    let city=input.value;
    current_weather(city)
    weather(city);
    cleanup();
    display_date();
})
async function current_weather(city) {
    let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cff663517d12170bdc5266910d609cd8`)
    let data=await response.json();
    console.log(data)
    document.querySelector('.city').innerHTML=data.name;
    document.querySelector('.city').style.marginTop="0.5em"
    console.log(data.sys.name);
    temp.innerHTML=`${Math.round(data.main.temp-273.15)}<span>&deg;</span>`
    temp.style.marginTop="0.5em"
    display_icon(data.weather[0].icon)
}
async function weather(city) {
    let response=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=cff663517d12170bdc5266910d609cd8`)
    let data=await response.json();
    display_futureforecast(data.list)
    display_futureicon(data.list)
    display_futuretemp(data.list)
    document.querySelectorAll('.container').forEach((contain)=>{
        contain.style.display="inline-block"
    })
}
function display_icon(icon){
    document.querySelector('.icon').innerHTML=`<img src=https://openweathermap.org/img/wn/${icon}@2x.png>`
}   
function display_futureforecast(list){
    for(let i=0;i<5;i++){
        let d=new Date(list[i].dt * 1000);
        let time=d.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })
        document.querySelector(`.item${i+1}`).innerHTML=time
    }
}
function display_futureicon(list){
    for(let i=0;i<5;i++){
        document.querySelector(`.icon${i+1}`).innerHTML=`<img src=https://openweathermap.org/img/wn/${list[i].weather[0].icon}@2x.png>`
    }
}
function display_futuretemp(list){
    for(let i=0;i<5;i++){
        document.querySelector(`.temp${i+1}`).innerHTML=`${Math.round(list[i].main.temp-273.15)}<span>&deg;</span>`
    }
}
function cleanup(){
    input.value=""
}
function display_date(){
    let d=new Date();
    document.querySelector('.date').innerHTML=d.toDateString();
    document.querySelector('.date').style.marginTop="0.5em"
}