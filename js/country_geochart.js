
console.log("Country");
//https://developers.google.com/chart/interactive/docs/gallery/geochart?authuser=1

let api = "https://jetzyapi.herokuapp.com/Countries"; //Beware of Cors Error due to running on localhost.
// Moesif CORS Chrome extension can fix this error, however, will have to see what this is like when API is hosted elsewhere. 

fetch(api)
  .then(response =>{
    return response.json();
  })

  .then(data => {
    let country_list = [];
    let count_list = [];
    let countryCountList =[]; 
    countryCountList.push(["Country", "Popularity"]); 
    for(i =0; i<data["Country"].length; i++){
      country_list.push(data["Country"][i][0]);
      count_list.push(data["Country"][i][1]);
      if(country_list[i]=="United States of America"){ //Google GeoCharts throws error when country name is "United States of America". Change name. 
        country_list[i]="United States"
      }
      else if(country_list[i]=="The Netherlands"){ 
        country_list[i]="Netherlands"
      }
      else if(country_list[i]=="Jamaika"){ 
        country_list[i]="Jamaica"
      }
      else if(country_list[i]=="Brunei Darussalam"){ 
        country_list[i]="Brunei"
      }
      
        
      var arrayItem = [country_list[i], count_list[i]]
      countryCountList.push(arrayItem);
      }    
    createTable(data); 
    createGeoChart(countryCountList); 
})

function createGeoChart(countryCountList){
google.charts.load('current', {
    'packages':['geochart'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyAUUybhAyIJTJBn1bKK635Q4Y_iZevUOkI'
  });
  
  google.charts.setOnLoadCallback(drawRegionsMap);

  function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable(countryCountList);
    var options = {
        colorAxis: {colors: ['pink', 'yellow', 'orange', 'red']},
        backgroundColor: '#81d4fa',
        defaultColor: '#000000',
        datalessRegionColor: '#f5f5f5',
 
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
  }
}

function createTable(data){
  console.log(data.length); 
  let table = document.getElementById("country_count_table"); 
  for(var i =0; i<data["Country"].length; i++){
   /*note the backtick*/ 
   var row = ` <tr>
      <td>${data["Country"][i][0]}</td>
      <td>${data["Country"][i][1]}</td>
   </tr>`
   table.innerHTML+= row; 
  }
  document.getElementById("scroll").style.height = document.getElementById("regions_div").style.height; 

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
