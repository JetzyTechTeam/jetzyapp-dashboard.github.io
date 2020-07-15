let api = "http://jetzyapi.herokuapp.com/UserAgeGroupings"; //Beware of Cors Error due to running on localhost.
fetch(api)
  .then(response =>{
    return response.json();
  })

  .then(data => {
    let x_list = [];
    let y_list = [];
    for(i =0; i<data["Group"].length; i++){
        x_list.push(data['Group'][i][0])
        y_list.push(data['Group'][i][1])
    }
    createGraph(x_list, y_list)
    createTable(data); 
})

function createGraph(x_list, y_list){
    var ctx = document.getElementById("chart");
    var myDoughnutChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: x_list,
            datasets: [{
              label: "User Session Data",
              backgroundColor: ["rgba(148,195,212)", "rgba(54,211,120)", "rgba(119,69,12)", "rgba(223,63,90)"],
              data: y_list
            }]
          },        
    });
  }
  function createTable(data){
    let table = document.getElementById("user_session_table"); 
    var ageGroupList = ["Seniors\n(>55)", "Adults\n(25-54)", "Teens\n(<18)", "Youth\n(18-24)"]
    for(var i =0; i<data["Group"].length; i++){
     /*note the backtick*/ 
     var row = ` <tr>
        <td>${ageGroupList[i]}</td>
        <td>${data["Group"][i][1]}</td>
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