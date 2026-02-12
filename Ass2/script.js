// Set max DOB as today (12 Feb 2026 or current date)
document.getElementById("dob").max =
    new Date().toISOString().split("T")[0];

function togglePassword(){
    let pass = document.getElementById("password");
    pass.type = pass.type === "password" ? "text" : "password";
}

document.getElementById("regForm").addEventListener("submit", function(e){
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let college = document.getElementById("college").value.trim();
    let degree = document.getElementById("degree").value.trim();
    let year = document.getElementById("year").value;
    let address = document.getElementById("address").value.trim();
    let city = document.getElementById("city").value;

    let namePattern = /^[A-Za-z ]+$/;
    let mobilePattern = /^[6-9][0-9]{9}$/;
    let passwordPattern = /^(?=(.*\d){2,})[A-Za-z\d]{8}$/;

    document.getElementById("nameErr").innerHTML = "";
    document.getElementById("mobileErr").innerHTML = "";
    document.getElementById("passErr").innerHTML = "";
    document.getElementById("dateErr").innerHTML = "";

    if(!namePattern.test(name)){
        document.getElementById("nameErr").innerHTML =
            "Only alphabets allowed";
        return;
    }

    if(!mobilePattern.test(mobile)){
        document.getElementById("mobileErr").innerHTML =
            "Mobile must start with 6-9 and be 10 digits";
        return;
    }

    if(!passwordPattern.test(password)){
        document.getElementById("passErr").innerHTML =
            "Password rule not satisfied";
        return;
    }

    let today = new Date().toISOString().split("T")[0];
    if(dob === "" || dob > today){
        document.getElementById("dateErr").innerHTML =
            "Date of birth cannot be a future date";
        return;
    }

    let gender = document.querySelector("input[name=gender]:checked");
    if(!gender){
        alert("Please select gender");
        return;
    }

    let hobbies = [];
    document.querySelectorAll(".option-group input[type=checkbox]:checked")
        .forEach(h => hobbies.push(h.value));

    let user = {
        name, mobile, email, password, dob,
        college, degree, year,
        address, city,
        gender: gender.value,
        hobbies: hobbies.join(", ")
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful");
    window.location.href = "display.html";
});
