document.getElementById("regForm").addEventListener("submit", function(e){
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let college = document.getElementById("college").value.trim();
    let degree = document.getElementById("degree").value.trim();
    let year = document.getElementById("year").value;
    let address = document.getElementById("address").value.trim();
    let city = document.getElementById("city").value;

    let namePattern = /^[A-Za-z ]+$/;
    let mobilePattern = /^[0-9]{10}$/;
    let passwordPattern = /^(?=(.*\d){2,})[A-Za-z\d]{8}$/;

    document.getElementById("nameErr").innerHTML = "";
    document.getElementById("mobileErr").innerHTML = "";
    document.getElementById("passErr").innerHTML = "";

    if(!namePattern.test(name)){
        document.getElementById("nameErr").innerHTML = "Only alphabets and spaces allowed";
        return;
    }

    if(!mobilePattern.test(mobile)){
        document.getElementById("mobileErr").innerHTML = "Enter exactly 10 digits";
        return;
    }

    if(!passwordPattern.test(password)){
        document.getElementById("passErr").innerHTML = "Password rule not satisfied";
        return;
    }

    let gender = document.querySelector("input[name=gender]:checked");
    if(!gender){
        alert("Please select gender");
        return;
    }

    let hobbies = [];
    document.querySelectorAll(".inline-group input[type=checkbox]:checked")
        .forEach(h => hobbies.push(h.value));

    if(!confirm("Are you sure you want to submit the form?")){
        return;
    }

    let user = {
        name, mobile, email, password,
        college, degree, year,
        address, city,
        gender: gender.value,
        hobbies: hobbies.join(", ")
    };

    // AJAX POST (simulation)
    fetch("register", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify(user)
    });

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful");
    window.location.href = "display.html";
});
