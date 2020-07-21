liveWeekly = document.getElementById("liveWeekly"); 
liveMonthly = document.getElementById("liveMonthly"); 
liveYearly = document.getElementById("liveYearly"); 

//Weekly
let weeklyAPI = "https://jetzyapi.herokuapp.com/liveUserSession/7"; //Beware of Cors Error due to running on localhost.

fetch(weeklyAPI)
  .then(response =>{
    return response.json();
  })

  .then(data => {
   liveWeeklyCount = data["StatusSummary"]; 
   var number = parseInt(liveWeeklyCount); 
   liveWeekly.innerHTML = liveWeeklyCount; 

})

let monthlyAPI = "https://jetzyapi.herokuapp.com/liveUserSession/30"; //Beware of Cors Error due to running on localhost.

fetch(monthlyAPI)
  .then(response =>{
    return response.json();
  })

  .then(data => {
   liveMonthly.innerHTML = data["StatusSummary"]; 
})

let yearlyAPI = "https://jetzyapi.herokuapp.com/liveUserSession/365"; //Beware of Cors Error due to running on localhost.

fetch(yearlyAPI)
  .then(response =>{
    return response.json();
  })

  .then(data => {
   liveYearly.innerHTML = data["StatusSummary"]; 
})