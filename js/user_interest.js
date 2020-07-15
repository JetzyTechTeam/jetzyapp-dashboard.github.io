let api = "http://jetzyapi.herokuapp.com/UserInterest"; //Beware of Cors Error due to running on localhost.

fetch(api)
  .then(response =>{
    return response.json();
  })

  .then(data => {
    let x_list = [];
    let y_list = [];
    for(i =0; i<data["UserInterest"].length; i++){
        x_list.push(data['UserInterest'][i][0])
        y_list.push(data['UserInterest'][i][1])
    }
    createTable(data); 
    createGraph(x_list, y_list)
})
function randomColorList(x_list){
    colorList=[];
    for(var i =0; i<x_list.length; i++){
        const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
        const randomByte = () => randomNumber(0, 255)
        const randomPercent = () => (randomNumber(50, 100) * 0.01).toFixed(2)
        const randomCssRgba = () => `rgba(${[randomByte(), randomByte(), randomByte(), 0.3].join(',')})`
        colorList.push(randomCssRgba()); 
    }
        return colorList;
    }
  

function createGraph(x_list, y_list){
    colors=["rgba(136,62,115)", "rgba(154,17,162)", "rgba(246,17,28)", "rgba(148,195,212)", "rgba(121,143,172)", "rgba(119,69,12)", "rgba(226,117,54)", "rgba(1,124,205)", "rgba(20,126,117)", "rgba(223,63,90)", "rgba(252,57,220)", "rgba(173,149,50)", "rgba(226,111,89)", "rgba(15,214,165)", "rgba(77,156,163)", "rgba(89,140,208)", "rgba(103,179,4)", "rgba(177,188,73)", "rgba(1,162,54)", "rgba(98,52,244)", "rgba(6,210,88)", "rgba(112,211,38)", "rgba(49,135,81)", "rgba(124,121,176)", "rgba(179,35,131)", "rgba(115,85,182)", "rgba(65,56,67)"]; 
    var ctx = document.getElementById("chart");
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: x_list,
      datasets: [
        { 
          data: y_list,
          label: 'Count',
          borderColor: "#3e95cd",
          fill: false,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth :1, 
           
        }
      ]
    }
  });
  document.getElementById("scroll").style.height = document.getElementById("chart").style.height; 

  }
  function createTable(data){
    console.log(data.length); 
    let table = document.getElementById("user_interest_table"); 
    for(var i =0; i<data["UserInterest"].length; i++){
     /*note the backtick*/ 
     var row = ` <tr>
        <td>${data["UserInterest"][i][0]}</td>
        <td>${data["UserInterest"][i][1]}</td>
     </tr>`
     table.innerHTML+= row; 
    }
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