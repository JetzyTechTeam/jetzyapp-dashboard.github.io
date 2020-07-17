const speed = 400;
console.log("Hello")
var text_field = document.getElementById("user-counter-animation"); 

var loadingText = document.getElementById("loadingText"); 


let api = "https://jetzyapi.herokuapp.com/TotalUserCount"; //Beware of Cors Error due to running on localhost.

fetch(api)
  .then(response =>{
    return response.json();
  })

  .then(data => {
    console.log(data["Count"]); 
    var number = data["Count"]; 
    const updateCount = () => {
        const target = number;
        const count = parseInt(text_field.innerText);
    
        const increment = parseInt(target / speed);
    
        if (count < target) {
            text_field.innerText = count + increment;
            setTimeout(updateCount, 5);
        } else {
            text_field.innerText = target;
        }
    };
    loadingText.innerText = " Users and Counting"
    updateCount();
    // text_field.innerHTML = number+" Users and Counting!"
})
