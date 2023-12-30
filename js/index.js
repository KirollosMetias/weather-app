let firstCard = document.querySelector('#card1')
let secondCard = document.querySelector('#card2')
let thirdCard = document.querySelector('#card3')
let currentDate = new Date()
let day = currentDate.getDate()
let month = currentDate.getMonth()
let year = currentDate.getFullYear()
let dayWeek = currentDate.getDay()
let daysWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let dayName = daysWeek[dayWeek];
let secondDay = daysWeek[ (dayWeek + 1) % 7];
let thirdDay = daysWeek[ (dayWeek + 2 ) % 7];
let monthNumber = currentDate.getMonth();
let monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"];
let monthName = monthNames[monthNumber];

fetchProcess()
async function fetchProcess(i) {

    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1bcf6cdf5ac649c19ed110300233012&q=${i? i: "egypt" }&days=3&aqi=no&alerts=no`)
    let res = await data.json();
    console.log(res);
    await dayOne(res);
    await dayTwo(res);
    await dayThree(res);
};
let input = document.getElementById("search").addEventListener('input', () => {
    let country = document.getElementById("search").value;
    
    fetchProcess(country);
})
let searchBtn = document.getElementById("submit").addEventListener('click', () => {
    let country = document.getElementById("search").value;
    fetchProcess(country);
});
async function dayOne(res){
    let blackBox = ""
    blackBox += `<div class="d-flex justify-content-between card-header">
    <div class="day">${dayName}</div>
    <div class="date">${day}${monthName}</div>
</div>
<div class="clear-fix"></div>
<div class="list-group list-group-flush p-3">
    <div class="location">${res.location.name}</div>
    <div class="degree d-flex justify-content-between">
        <div class="degree-num">
        ${res.current.temp_c}<sup>o</sup>c
        </div>
        <div class="cardImg">
            <img src="${res.current.condition.icon}" alt="">
        </div>
    </div>
    <div class="clear-fix"></div>
    <div class="custom py-2">${res.current.condition.text}</div>
    <div class="d-flex">
    <span class="pe-3 pb-5"><img class="pe-1" src="./imgs/icon-umberella.png" alt="">${res.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
    <span class="pe-3 pb-5"><img class="pe-1" src="./imgs/icon-wind.png" alt="">${res.current.wind_kph}km/h</span>
    <span class="pb-5"><img class="pe-1" src="./imgs/icon-compass.png" alt="">${res.current.wind_dir}</span>
    </div>
    <div class="clear-fix"></div>
</div>`;
firstCard.innerHTML = blackBox
}
async function dayTwo(res){
    let blackBox =""
    blackBox += `<div class="card-header header2">
    <div class="text-center">${secondDay}</div>
</div>
<div class="card-content ">
    <div class="content-icon pt-5">
        <img src="${res.forecast.forecastday[1].day.condition.icon}" alt="" width="48">
    </div>
    <div class="degree card-degree pt-4">${res.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</div>
    <small >${res.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></small>
    <div class="weatherCondition custom pb-5 pt-4">${res.forecast.forecastday[1].day.condition.text}</div>
</div>`
secondCard.innerHTML = blackBox;
}
async function dayThree(res){
    let blackBox = ""
    blackBox += `<div class="card-header header2 header3">
    <div class="text-center">${thirdDay}</div>
</div>
<div class="card-content card-content3 ">
    <div class="content-icon pt-5">
        <img src="${res.forecast.forecastday[2].day.condition.icon}" alt="" width="48">
    </div>
    <div class="degree card-degree pt-4">${res.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</div>
    <small>${res.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></small>
    <div class="custom pb-5 pt-4">${res.forecast.forecastday[2].day.condition.text}</div>
</div>`
thirdCard.innerHTML = blackBox
}
