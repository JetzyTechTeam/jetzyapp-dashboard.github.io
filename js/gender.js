let api = "https://jetzyapi.herokuapp.com/UserGender" //Beware of Cors Error due to running on localhost.
fetch(api)
  .then(response =>{
      console.log("hello"); 
    return response.json();
  })

  .then(data => {
    let x_list = [];
    let y_list = [];
    for(i =0; i<data["Gender"].length; i++){
      x_list.push(data["Gender"][i][0]);
      y_list.push(data["Gender"][i][1]);
    }
    createTable(data); 
    createGraph(x_list, y_list); 
})


function createTable(data){
  let table = document.getElementById("user_count_table"); 
  var header =      ` <tr>
  <th style="text-align:center">Date</th>
  <th style="text-align:center">Count</th>
    </tr>`
  table.innerHTML+= header; 

  for(var i =0; i<data["Gender"].length; i++){
   /*note the backtick*/ 
   var row = ` <tr>
      <td>${data["Gender"][i][0]}</td>
      <td>${data["Gender"][i][1]}</td>
   </tr>`
   table.innerHTML+= row; 
  }
  document.getElementById("scroll").style.height = document.getElementById("chart").style.height; 
}
function createGraph(x_list, y_list){
  var ctx = document.getElementById("chart");
  var myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: x_list,
    datasets: [
      { 
        data: y_list,
        label: 'Gender',
        backgroundColor: ["rgb(0, 0, 255, 0.5)","rgba(255, 0, 0, 0.5)"],
        fill: false
      }
    ]
  },
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
