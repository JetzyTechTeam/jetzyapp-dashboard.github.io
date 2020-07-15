let api = "https://jetzyapi.herokuapp.com/UserSession"; //Beware of Cors Error due to running on localhost.
fetch(api)
  .then(response =>{
    return response.json();
  })

  .then(data => {
    let x_list = [];
    let y_list = [];
    for(i =0; i<data["StatusSummary"].length; i++){
        x_list.push(data['StatusSummary'][i][0])
        y_list.push(data['StatusSummary'][i][1])
    }
    createGraph(x_list, y_list)
    createTable(data); 
})

function createGraph(x_list, y_list){
    var ctx = document.getElementById("chart");
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: x_list,
            datasets: [{
              label: "User Session Data",
              backgroundColor: ["#37d461", "rgb(255, 99, 132)"],
              data: y_list
            }]
          },        
    });
  }
  function createTable(data){
    let table = document.getElementById("user_session_table"); 
    for(var i =0; i<data["StatusSummary"].length; i++){
     /*note the backtick*/ 
     var row = ` <tr>
        <td>${data["StatusSummary"][i][0]}</td>
        <td>${data["StatusSummary"][i][1]}</td>
     </tr>`
     table.innerHTML+= row; 
    }
  }function downloadCSV(csv, filename){
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
