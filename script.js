
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let cartCount = 0;

function addWishlist(name, image, price, btn) {

    let index = wishlist.findIndex(item => item.name === name);

    if (index === -1) {

        wishlist.push({
            name: name,
            image: image,
            price: price
        });

    } else {

        wishlist.splice(index, 1);

    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    updateWishlist();
    updateHeartButtons();
}

function updateWishlist() {

    document.getElementById("wishlist-count").innerHTML = wishlist.length;

    let container = document.getElementById("wishlist-products");

    container.innerHTML = "";

    if (wishlist.length === 0) {

        container.innerHTML = "<p>Your wishlist is empty!</p>";

        return;
    }

    wishlist.forEach((item, index) => {

        container.innerHTML += `
            <div class="wishlist-card">

                <img src="${item.image}" alt="${item.name}">

                <h3>${item.name}</h3>

                <p>${item.price}</p>

                <button class="remove-btn"
                onclick="removeWishlist(${index})">
                    Remove
                </button>

            </div>
        `;

    });
}



function removeWishlist(index) {

    wishlist.splice(index, 1);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    updateWishlist();
    updateHeartButtons();
}


function showWishlist() {

    document.getElementById("wishlist").scrollIntoView({
        behavior: "smooth"
    });

}



function updateHeartButtons() {

    let buttons = document.querySelectorAll(".wishlist-btn");

    buttons.forEach(btn => {

        let onclickText = btn.getAttribute("onclick");

        let match = onclickText.match(/addWishlist\('([^']+)'/);

        if (!match) return;

        let name = match[1];

        let exists = wishlist.some(item => item.name === name);

        btn.innerHTML = exists ? "♥" : "♡";

        btn.classList.toggle("active", exists);

    });

}


function addCart() {

    cartCount++;

    document.querySelector(".cart-number").innerHTML = cartCount;

}





// Cart panel
let cartpanel = document.getElementById("cartpanel");

let closecart = document.getElementById("closecart");

let cartbutton = document.querySelector(".cart-icon");

cartbutton.addEventListener("click", function() {

    cartpanel.classList.add("open");

});


closecart.addEventListener("click", function() {

    cartpanel.classList.remove("open");

});


updateWishlist();

updateHeartButtons();
