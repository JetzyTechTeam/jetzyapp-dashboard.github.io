var ctx = document.getElementById("chart");
var myChart; 
var chartMade = false; 
var start_date = document.getElementById("start"); 
var end_date = document.getElementById("end"); 

//Initialize both start and dates to be 1 week apart. 

var current_date = new Date().getTime(); 
var previous_date = current_date - 604800000; 

var startDate = new Date(current_date); 

start_date.value = new Date(previous_date).toISOString().slice(0,10);
end_date.value = new Date(current_date).toISOString().slice(0,10); 

//Read Dates, convert to milliseconds past 1970

go()


//Call API

function go(){
    if(chartMade){
      myChart.destroy(); 
    }
    var start_date_milliseconds = new Date(document.getElementById("start").value).getTime(); 
    var end_date_milliseconds = new Date(document.getElementById("end").value).getTime(); 
    let api = "https://jetzyapi.herokuapp.com/UserRange/"+start_date_milliseconds+"/"+end_date_milliseconds; //Beware of Cors Error due to running on localhost.
    console.log(api); 
    fetch(api)
    .then(response =>{
        return response.json();
    })

  .then(data => {
    let x_list = [];
    let y_list = [];
    for(i =0; i<data["DateCount"].length; i++){
      x_list.push(data["DateCount"][i][0]);
      y_list.push(data["DateCount"][i][1]);
    }
    //createTable(data); 
    createGraph(x_list, y_list); 
    var table = document.getElementById("user_count_table")
    while(table.rows.length > 0) {
      table.deleteRow(0);
    }
    createTable(data); 
    chartMade = true; 
})
function createGraph(x_list, y_list){
    ctx = document.getElementById("chart");
    myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: x_list,
      datasets: [
        { 
          data: y_list,
          label: 'Date Count',
          borderColor: "rgba(246,17,28,0.3)",
          fill: false
        }
      ]
    }
  });
    if(chartMade){
      document.getElementById("scroll").style.height = document.getElementById("chart").style.height; 

    }
  }
  function createTable(data){
    console.log(data.length); 
    let table = document.getElementById("user_count_table"); 
    var header =      ` <tr>
    <th style="text-align:center">Date</th>
    <th style="text-align:center">Total Users</th>
      </tr>`
    table.innerHTML+= header; 
  
    for(var i =0; i<data["DateCount"].length; i++){
     /*note the backtick*/ 
     var row = ` <tr>
        <td>${data["DateCount"][i][0]}</td>
        <td>${data["DateCount"][i][1]}</td>
     </tr>`
     table.innerHTML+= row; 
    }
  }
  document.getElementById("scroll").style.height = document.getElementById("chart").style.height; 
}
function downloadCSV(csv, filename){
  var csvFile; 
  var downloadLink; 
  csvFile = new Blob([csv], {type: "text/csv"}); 

  downloadLink = document.createElement("a"); 
  downloadLink.download = filename; 
  downloadLink.href = window.URL.createObjectURL(csvFile); 
  downloadLink.style.display = "none"; 

  document.body.appendChild(downloadLink); 
  downloadLink.click(); 
}
function exportTableToCSV(filename){
  var csv = []; 
  var rows = document.querySelectorAll("table tr"); 
  for(var i = 0; i<rows.length; i++){
    var row = [], cols = rows[i].querySelectorAll("td, th"); 
    for(var j=0; j<cols.length; j++){
      row.push(cols[j].innerText); 
    }
    csv.push(row.join(","));
  }
  downloadCSV(csv.join("\n"), filename); 
}
//Use JSON to graph data
