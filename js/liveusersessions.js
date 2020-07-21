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
    animateValue("liveWeekly", 0, number, 1000); 

})

let monthlyAPI = "https://jetzyapi.herokuapp.com/liveUserSession/30"; //Beware of Cors Error due to running on localhost.

fetch(monthlyAPI)
  .then(response =>{
    return response.json();
  })

  .then(data => {
    liveMonthlyCount = data["StatusSummary"]; 
   var number = parseInt(liveMonthlyCount);
   animateValue("liveMonthly", 0, number, 2000);
})

let yearlyAPI = "https://jetzyapi.herokuapp.com/liveUserSession/365"; //Beware of Cors Error due to running on localhost.

fetch(yearlyAPI)
  .then(response =>{
    return response.json();
  })

  .then(data => {
    liveYearlyCount = data["StatusSummary"]; 
   var number = parseInt(liveYearlyCount);
   animateValue("liveYearly", 0, number, 3000);
})

function animateValue(id, start, end, duration) {
    // assumes integer values for start and end
    
    var obj = document.getElementById(id);
    var range = end - start;
    // no timer shorter than 50ms (not really visible any way)
    var minTimer = 50;
    // calc step time to show all interediate values
    var stepTime = Math.abs(Math.floor(duration / range));
    
    // never go below minTimer
    stepTime = Math.max(stepTime, minTimer);
    
    // get current time and calculate desired end time
    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer;
  
    function run() {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round(end - (remaining * range));
        obj.innerHTML = value;
        if (value == end) {
            clearInterval(timer);
        }
    }
    
    timer = setInterval(run, stepTime);
    run();
}