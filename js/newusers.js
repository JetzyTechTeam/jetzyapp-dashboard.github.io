input_field = document.getElementById("new-users"); 
console.log("bye")

api = "http://jetzyapi.herokuapp.com/NewUsers/1"; //Beware of Cors Error due to running on localhost.
// Moesif CORS Chrome extension can fix this error, however, will have to see what this is like when API is hosted elsewhere. 

fetch(api)
  .then(response =>{
    return response.json();
  })

  .then(data => {
    var length = data["New Users"].length; 
    var newaccounts = data["New Users"][length-1][1]; 
    input_field.innerText = newaccounts;
    displayData();
})

function displayData(){
    input_field.innerHTML += " new users in the past 24 hours";
}
