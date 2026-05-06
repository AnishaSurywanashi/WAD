function getWeather() {
   let city = document.getElementById("city").value.toLowerCase();
   let result = document.getElementById("result");

    if(city === ""){
        result.innerHTML = "Please Enter the City Name";
        return;
    }

    //create obj of ajax
    let xhr = new XMLHttpRequest();

    xhr.open("GET","data.json",true);

    xhr.onload = function(){
        let data = JSON.parse(xhr.responseText);
        
        if(data[city]){
            let w = data[city];

            result.innerHTML= "<h3>" + city.toUpperCase() + "</h3>" +
            "<p>Temperature: " + w.temp + "</p>" +
            "<p>Humidity: " + w.humidity + "</p>" +
            "<p>Condition: " + w.condition + "</p>";
        }else{
            result.innerHTML = "City Not Found";
        }
    };
    xhr.send();
}