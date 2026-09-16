//an array for the bakery products and their prices
//const makes sure its the same array but the values can be changed as needed
const products = [

    {
        name: "Breads",
        price: "$5-10"
    },
    {
        name: "Coffee",
        price: "$2-5"
    },
    {
        name: "Cookies",
        price: "$1-3"
    }
]

//this is an array in a favorites variable. Here I will store the users favorite products
let favorites = [];

function displayFavorites() {
    //these two lines select the html stuff to actually make the list
    //it uses the id attributes to find the right element
    const favoritesList = document.getElementById('favorites-list');
    const favoritesMessage = document.getElementById('favorites');
    
    //this line empties the list so current favs can be added
    favoritesList.innerHTML = '';
    
    //this checks the favorites array to see if any favorites were added, if not it displays a message to user
    if (favorites.length === 0) {
        favoritesMessage.textContent = 'You have no favorite products yet!';
        return;
    }
    //if the previous condition was false, this will display a list of the users fav products
    favoritesMessage.textContent = 'Your favorite products:';
    //this loops through each item in the array so it can add to the list
    favorites.forEach(function(product) {
        const listItem = document.createElement('li'); //creates the list for whichever item its on
        listItem.textContent = product;
        favoritesList.appendChild(listItem); //adds the item to the list
    });
}

    //selects ALL favorites buttons on the page so they can be added to the favorites array if clicked
    const favoritesButtons = document.querySelectorAll('.favorite-button');
   //goes through each button and the event listener checks if it was clicked, if it was it adds to the list
    favoritesButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const productName = button.dataset.product;

            if (!favorites.includes(productName)) {
                favorites.push(productName);
                saveFav();
                displayFavorites();
            }
        });
    });

    //Saves the favorites array to local storage so it can be retrieved later
    function saveFav() {
        localStorage.setItem('BakeryFavorites', JSON.stringify(favorites));
    }

    //Loads saved favorites when the page opens
    function loadFav() {
        const savedFavorites = localStorage.getItem('BakeryFavorites');
        if (savedFavorites) {
            favorites = JSON.parse(savedFavorites);
            displayFavorites();
        }
    }

    loadFav();

   const form = document.getElementById('contact-form');
   const nameInput = document.getElementById('name');
   const emailInput = document.getElementById('email');
   const detailsInput = document.getElementById('item-details');


   //form validation function
   function validateForms() {
    let isValid = true; //this sets it up to assume the form is valid unless conditions below are met
    
    //checks if name input is empty
    if (nameInput.value.trim() === '') {
        document.getElementById('name-error').textContent = 'Name is required.'; //displays error message for user
        isValid = false; 
    } else {
        document.getElementById('name-error').textContent = ''; //if the input is valid error message disappears
    }
    //essentially does the same as above just for email
    if (emailInput.value.includes('@') === false) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        isValid = false;
    } else {
        document.getElementById('email-error').textContent = '';
    }
    //same as above but for item details, essentially makes sure its not just blank spaces
    if (detailsInput.value.trim() === '') {
        document.getElementById('item-details-error').textContent = 'Item details are required.';
        isValid = false;
    } else {
        document.getElementById('item-details-error').textContent = '';
    }
//exclamation mark means IS NOT VALID so like no
    if (!isValid) {
        event.preventDefault(); //will NOT submit form if any conditions above are met
    }
}

//basically says if form hits submit button, call the validate forms function to check if its valid
form.addEventListener('submit', validateForms); 
