const filter = document.getElementById("categoryFilter");
const products = document.querySelectorAll(".product");
filter.addEventListener("change", function () {
    const value = this.value;
    products.forEach((product)=>{
        if(value === "all" || product.dataset.category === value){
            product.style.display = "block";
        }else{
            product.style.display = "none";
        }
    });
});
