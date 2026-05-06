// REGISTER FUNCTION
function register() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mobile").value;
    let dob = document.getElementById("dob").value;
    let city = document.getElementById("city").value;
    let address = document.getElementById("address").value;
    let password = document.getElementById("password").value;
    let msg = document.getElementById("msg");

    // VALIDATION
    if (!name || !email || !mobile || !dob || !city || !address || !password) {
        msg.innerHTML = "All fields required!";
        return;
    }

    if (!email.includes("@")) {
        msg.innerHTML = "Invalid email!";
        return;
    }

    if (mobile.length != 10) {
        msg.innerHTML = "Mobile must be 10 digits!";
        return;
    }

    let user = { name, email, mobile, dob, city, address, password };

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ DUPLICATE CHECK
    let exists = users.some(u => u.email === email);

    if (exists) {
        msg.innerHTML = "User already exists!";
        return;
    }

    // AJAX simulation
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "save", true);

    xhr.onload = function () {
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        msg.style.color = "green";
        msg.innerHTML = "Registered Successfully!";

        // redirect to login
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
    };

    xhr.send(JSON.stringify(user));
}


// LOGIN FUNCTION
function login() {
    let email = document.getElementById("loginUser").value;
    let password = document.getElementById("loginPass").value;
    let msg = document.getElementById("msg");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let found = users.find(u => u.email === email && u.password === password);

    if (found) {
        window.location.href = "dashboard.html";
    } else {
        msg.innerHTML = "Invalid credentials!";
    }
}


// LOAD USERS (FIXED DUPLICATION)
function loadUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let list = document.getElementById("userList");

    list.innerHTML = ""; // ✅ CLEAR FIRST

    users.forEach(u => {
        list.innerHTML += `<li>${u.name} - ${u.email}</li>`;
    });
}