const products = [
    {
        img: "https://images.unsplash.com/photo-1518444028785-8f8c6f9a6a0a",
        name: "Wireless Headphones",
        price: 7999,
        desc: "Noise-cancelling over-ear headphones"
    },
    {
        img: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
        name: "Smartwatch",
        price: 12999,
        desc: "Fitness tracking smartwatch"
    },
    {
        img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
        name: "Gaming Mouse",
        price: 2499,
        desc: "Ergonomic gaming mouse"
    },
    {
        img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7",
        name: "Laptop Stand",
        price: 1999,
        desc: "Adjustable aluminium stand"
    },

    // More products for pagination
    { img:"https://images.unsplash.com/photo-1518444028785-8f8c6f9a6a0a", name:"Headphones 2", price:5000, desc:"Good sound"},
    { img:"https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b", name:"Watch 2", price:8000, desc:"Smart features"},
    { img:"https://images.unsplash.com/photo-1587829741301-dc798b83add3", name:"Mouse 2", price:1500, desc:"Smooth"},
    { img:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7", name:"Stand 2", price:1200, desc:"Portable"},
    { img:"https://images.unsplash.com/photo-1518444028785-8f8c6f9a6a0a", name:"Headphones 3", price:9000, desc:"Premium"},
    { img:"https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b", name:"Watch 3", price:11000, desc:"Advanced"},
    { img:"https://images.unsplash.com/photo-1587829741301-dc798b83add3", name:"Mouse 3", price:1800, desc:"RGB Mouse"},
    { img:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7", name:"Stand 3", price:2200, desc:"Metal stand"}
];

const rowsPerPage = 10;
let currentPage = 1;

function displayTable(page) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    let start = (page - 1) * rowsPerPage;
    let end = start + rowsPerPage;

    let items = products.slice(start, end);

    items.forEach(p => {
        let row = `
            <tr>
                <td><img src="${p.img}" alt="product"></td>
                <td>${p.name}</td>
                <td>₹${p.price}</td>
                <td>${p.desc}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function setupPagination() {
    const pageCount = Math.ceil(products.length / rowsPerPage);
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = "";

    for (let i = 1; i <= pageCount; i++) {
        let btn = document.createElement("button");
        btn.innerText = i;

        btn.addEventListener("click", () => {
            currentPage = i;
            displayTable(currentPage);

            document.querySelectorAll("#pagination button")
                .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");
        });

        if (i === 1) btn.classList.add("active");

        paginationDiv.appendChild(btn);
    }
}

displayTable(currentPage);
setupPagination();