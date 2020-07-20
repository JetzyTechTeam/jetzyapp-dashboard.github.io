var api = "https://jetzyapi.herokuapp.com"
function getData(){
    var api = "https://jetzyapi.herokuapp.com"
    params = false; 
    api+="/Search?"
    var male = document.getElementById("male").checked;
    var female = document.getElementById("female").checked; 
    if(male &!female){
        api+="gender=1"; 
        params = true; 
    }
    if(female&!male){
        api+="gender=2"; 
        params = true; 
    }

    countries_list = []; 
    var countries_list = $('#countries').val();
    if(countries_list.length!=0){
        if(params){
            api+="&"
        }
        api+="countries="
        params = true; 
    }
    for(var i =0; i<countries_list.length; i++){
        api+=countries_list[i]+"+"
    }
    if(countries_list.length!=0) api = api.substring(0, api.length - 1);

    
    var checkedBoxes = document.querySelectorAll('input[name=interest]:checked');
    if(checkedBoxes.length!=0){
        if(params){
            api+="&"; 
        }
        params = true; 
        api+="interests="
    }
    for(var i =0; i<checkedBoxes.length; i++){
        api+=(document.getElementById(checkedBoxes[i].id).value)+"+"; 
    }
    if(checkedBoxes.length!=0) api = api.substring(0, api.length - 1);

    var lower_bound = document.getElementById("lower_bound").value; 
    var upper_bound = document.getElementById("upper_bound").value; 
    if(lower_bound==0){
        lower_bound=0; 
    }
    if(upper_bound==0){
        upper_bound = 150; 
    }
    if(params){
        api+="&"; 
    }
    api+="age-lower="+lower_bound+"&age-upper="+upper_bound; 
    start_date = document.getElementById("start").value; 
    end_date = document.getElementById("end").value; 
    if(start_date==0){
        start_date = "2015-07-13"
    } 
    if(end_date==0){
        end_date = new Date().toISOString().split('T')[0]; 
    }
    api+="&start-date="+start_date+"&end-date="+end_date; 
    console.log(api); 

    localStorage.setItem("api_key", api); 
}
function downloadCSV(){
    var csvContent = localStorage["csv_content"]; 
    var link = document.createElement("a");
    link.download = "query_results";
    link.href = csvContent;
    link.click();
}
