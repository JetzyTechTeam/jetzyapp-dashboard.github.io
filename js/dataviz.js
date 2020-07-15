var test = document.getElementById("timeperiod");
var value= test.options[test.selectedIndex].value;
console.log(value); 

let api = "https://jetzyapi.herokuapp.com/NewUsers/"+value; //Beware of Cors Error due to running on localhost.
console.log(api); 
// Moesif CORS Chrome extension can fix this error, however, will have to see what this is like when API is hosted elsewhere. 

fetch(api)
  .then(response =>{
    return response.json();
  })

  .then(data => {
    let x_list = [];
    let y_list = [];
    for(i =0; i<data["New Users"].length; i++){
      x_list.push(data["New Users"][i][0]);
      y_list.push(data["New Users"][i][1]);
    }
    createTable(data); 
    createGraph(x_list, y_list); 
})

function refreshAPI(){
  var test = document.getElementById("timeperiod");
  var value= test.options[test.selectedIndex].value;
  let api = "http://localhost:5000/NewUsers/"+value; //Beware of Cors Error due to running on localhost.
  fetch(api)
  .then(response =>{
    return response.json();
  })

  .then(data => {
    let x_list = [];
    let y_list = [];
    for(i =0; i<data["New Users"].length; i++){
      x_list.push(data["New Users"][i][0]);
      y_list.push(data["New Users"][i][1]);
    }
    createGraph(x_list, y_list); 
    //Delete Table Data first 
    var table = document.getElementById("user_count_table")
    while(table.rows.length > 0) {
      table.deleteRow(0);
    }
    createTable(data); 
})
}

function createTable(data){
  let table = document.getElementById("user_count_table"); 
  var header =      ` <tr>
  <th style="text-align:center">Date</th>
  <th style="text-align:center">Count</th>
    </tr>`
  table.innerHTML+= header; 

  for(var i =0; i<data["New Users"].length; i++){
   /*note the backtick*/ 
   var row = ` <tr>
      <td>${data["New Users"][i][0]}</td>
      <td>${data["New Users"][i][1]}</td>
   </tr>`
   table.innerHTML+= row; 
  }
  document.getElementById("scroll").style.height = document.getElementById("chart").style.height; 
}
function createGraph(x_list, y_list){
  var ctx = document.getElementById("chart");
  var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: x_list,
    datasets: [
      { 
        data: y_list,
        label: 'New Users',
        borderColor: "rgba(246,17,28,0.3)",
        fill: false
      }
    ]
  },
  options: {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}
});
 
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
