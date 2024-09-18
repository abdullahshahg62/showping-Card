// **Home Page (index.html)**
// Play Button Functionality
document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.querySelector('.btn-play');
    playButton.addEventListener('click', () => {
        alert('Playing the latest album!');
    });

    // Tour Tickets Button Functionality
    const tourButtons = document.querySelectorAll('.tour-btn');
    tourButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Redirecting to the ticket purchase page!');
        });
    });
});

// **Store Page (store.html)**

// Add to Cart Functionality
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.shop-item-button');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total-price');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCartClicked);
    });

    function addToCartClicked(event) {
        const button = event.target;
        const shopItem = button.parentElement.parentElement;
        const title = shopItem.querySelector('.shop-item-title').innerText;
        const price = shopItem.querySelector('.shop-item-price').innerText;
        const imageSrc = shopItem.querySelector('.shop-item-image').src;

        addItemToCart(title, price, imageSrc);
        updateCartTotal();
    }

    function addItemToCart(title, price, imageSrc) {
        const cartRow = document.createElement('div');
        cartRow.classList.add('cart-row');

        const cartItemNames = cartItemsContainer.querySelectorAll('.cart-item-title');
        for (let i = 0; i < cartItemNames.length; i++) {
            if (cartItemNames[i].innerText === title) {
                alert('This item is already added to the cart.');
                return;
            }
        }

        const cartRowContents = `
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`;

        cartRow.innerHTML = cartRowContents;
        cartItemsContainer.appendChild(cartRow);

        cartRow.querySelector('.btn-danger').addEventListener('click', removeCartItem);
        cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChanged);
    }

    function updateCartTotal() {
        const cartRows = cartItemsContainer.querySelectorAll('.cart-row');
        let total = 0;

        cartRows.forEach(row => {
            const priceElement = row.querySelector('.cart-price');
            const quantityElement = row.querySelector('.cart-quantity-input');
            const price = parseFloat(priceElement.innerText.replace('$', ''));
            const quantity = quantityElement.value;
            total += price * quantity;
        });

        cartTotalElement.innerText = `$${total.toFixed(2)}`;
    }

    function removeCartItem(event) {
        const buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
    }

    function quantityChanged(event) {
        const input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateCartTotal();
    }

    // Purchase Button Functionality
    const purchaseButton = document.querySelector('.btn-purchase');
    purchaseButton.addEventListener('click', () => {
        if (cartItemsContainer.children.length > 0) {
            alert('Thank you for your purchase!');
            cartItemsContainer.innerHTML = ''; // Clear the cart
            updateCartTotal();
        } else {
            alert('Your cart is empty!');
        }
    });
});

// **About Page (about.html)**
document.addEventListener('DOMContentLoaded', () => {
    console.log("About page loaded");
    // You can add any additional functionality you want here for the about page.
});