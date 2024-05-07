const flashCardsContainer = document.querySelector('.homepage__main-flash-cards');
const categoryCardsContainer = document.querySelector('.homepage__main-categories-cards');
const bestProductCardsContainer = document.querySelector('.homepage__main-bestproduct-cards');
const exProductCardsContainer = document.querySelector('.homepage__main-exproduct-cards');
const exProductCardsDown = document.querySelector('.homepage__main-exproduct-cards-down');
const viewAllContainer = document.querySelector('.viewall__container-cards');
const phoneContainer = document.querySelector('.information-right-bg-image');
const accountIcon = document.querySelector('.search-section-account>svg');
const accountDropdown = document.querySelector('.account__dropdown');
const searchInput = document.querySelector('.homepage__head-down-search-section-design>svg');
const proDetailsInfo = document.querySelector('.prodetails__container-information');
const proDetailsHead = document.querySelector('.prodetails__container-head');
const wishlistCards = document.querySelector('.favorite__wishlist-cards');
const cartContainer = document.querySelector('.cart__container-info-details');
const checkoutDetailsCont = document.querySelector('.checkout-details-container');
const aboutStaff = document.querySelector('.about__container-staff');
const wishlistTitle = document.querySelector('.favorite__wishlist-title>p>span');
const categoriesCardsCard = document.querySelector('.categories__cards-card-name');
let checkoutCartSubtotal = document.querySelector(".footer-right-checkout-subtotal");
let checkoutCartSubtotalTwo = document.querySelector(".checkout-cart-subtotal");
let cartPrice = document.querySelector('.cartPrice');
let subtotal = document.querySelector('.subtotal');
let searchArea = document.querySelector('#search-input');
let searchAreaAllPro = document.querySelector('.search--input');
let searchAreaButton = document.querySelector('.search--input-btn');
let signupForm = document.querySelector(".signup__cont-create-form");
let loginForm = document.querySelector(".login__cont-create-form");
const basket = document.querySelector('.basket');
const basketCount = document.querySelector('.icons-basket-count');

const iconsHeart = document.querySelector('.icons-heart');
const heart = document.querySelector('.heart');
const heartCount = document.querySelector('.heart>span');
let headIconsRemove = document.querySelector('.remove-btn');
let allData = [];
let allCarts = [];
let productCount = 1;
let sumTotal = 0;
let sumPrice = 0;
let formData = [];
let dataHeart = [];
let addToCart = [];
let idRandom = Math.floor(Math.random() * 100);

function getCurrentUrl() {
    let url = new URLSearchParams(window.location.search);
    let id = url.get("cardId");
    let searchName = url.get("searchName");
    let categoryId = url.get("categoryId");
    let pageName = window.location.pathname.split('/').pop();
    return {
        id: id,
        pageName: pageName,
        searchName: searchName,
        categoryId: categoryId
    }
}
const page = getCurrentUrl();

window.onload = () => {
    if (page.pageName === "index.html") {
        getAllCategoryData();
        getAllData();
        getAllSlidersData();
        searchFilterIndex();
        account();
    }
    else if (page.pageName === "allproduct.html") {
        getViewAllData();
        searchFilter();
        viewAllSearch();
        // filterClickFetch(); 
        account();
    }
    else if (page.pageName === "prodetails.html") {
        productDetails(page.id);
        account();
        searchFilterIndex();
    }
    else if (page.pageName === "wishlist.html") {
        innerProductWishlist();
        searchFilterIndex();
        account();
    }
    else if (page.pageName === "cart.html") {
        innerCartDetails();
        account();
        searchFilterIndex();
    }
    else if (page.pageName === "checkout.html") {
        checkoutPageCarts();
        account();
        searchFilterIndex();
    }
    else if (page.pageName === "about.html") {
        aboutStaffData();
        account();
        searchFilterIndex();
    }
    else if (page.pageName === "sign_up.html") {
        signupRegex();
        searchFilterIndex();
    }
    else if (page.pageName === "log_in.html") {
        loginRegex();
        searchFilterIndex();
    }
    else if (page.pageName === "account.html") {
        account();
        searchFilterIndex();
    }
    else if (page.pageName === "contact.html") {
        account();
        searchFilterIndex();
    }
    else if (page.pageName === "not_found.html") {
        account();
        searchFilterIndex();
    }
}

function getAllData() {
    fetch('http://localhost:3000/products')
        .then(res => res.json())
        .then(data => {
            allData = data;
            allCarts = data
            getMainData(data);

            $(".homepage__main-flash-cards").slick({
                dots: false,
                infinite: true,
                nextArrow: $('.flash-title-icons-back'),
                prevArrow: $('.flash-title-icons-next'),
                speed: 300,
                slidesToShow: 4,
                centerMode: true,
                variableWidth: true
            });

            $(".homepage__main-bestproduct-cards").slick({
                dots: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 1500,
                speed: 300,
                slidesToShow: 4,
                centerMode: true,
                variableWidth: true
            });

            $(".homepage__main-exproduct-cards").slick({
                dots: false,
                infinite: true,
                nextArrow: $('.exproduct-back'),
                prevArrow: $('.exproduct-next'),
                speed: 300,
                slidesToShow: 4,
                centerMode: true,
                variableWidth: true
            });

            $(".homepage__main-exproduct-cards-down").slick({
                dots: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 1700,
                speed: 300,
                slidesToShow: 4,
                centerMode: true,
                variableWidth: true
            });
        });
}

function getMainData(x) {
    flashCardsContainer.innerHTML = '';
    bestProductCardsContainer.innerHTML = '';
    exProductCardsContainer.innerHTML = '';
    x.map(item => {
        flashCardsContainer.innerHTML += `
        <div class="flash__cards-card">
                        <div class="flash__cards-card-img">
                            <div class="flash__cards-card-img-head">
                                <div class="flash__cards-card-head-discount">
                                    <p>${item.discount}%</p>
                                </div>
                                <div class="flash__cards-card-head-icons">
                                    <div>
                                       <button onclick="clickHeart(this,${item.id})" class="head-icons-heart ${dataHeart.map(n => n.id == item.id ? 'heartactive' : '').join('')}" class='card-head-icons-btn' ${dataHeart.map(n => n.id == item.id ? 'disabled' : '').join('')}>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M8 5C5.7912 5 4 6.73964 4 8.88594C4 10.6185 4.7 14.7305 11.5904 18.8873C11.7138 18.961 11.8555 19 12 19C12.1445 19 12.2862 18.961 12.4096 18.8873C19.3 14.7305 20 10.6185 20 8.88594C20 6.73964 18.2088 5 16 5C13.7912 5 12 7.35511 12 7.35511C12 7.35511 10.2088 5 8 5Z"
                                                stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                       </button>
                                    </div>
                                    <div class="head-icons-eye">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16"
                                            viewBox="0 0 22 16" fill="none">
                                            <path
                                                d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z"
                                                stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path
                                                d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z"
                                                stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <img src="${item.image}" alt="image">

                            <button class="exproduct__cards-card-img-addcart " onClick="clickToCart(this, ${item.id})">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 25 24"
                                    fill="none">
                                    <path
                                        d="M8.75 20.25C9.16421 20.25 9.5 19.9142 9.5 19.5C9.5 19.0858 9.16421 18.75 8.75 18.75C8.33579 18.75 8 19.0858 8 19.5C8 19.9142 8.33579 20.25 8.75 20.25Z"
                                        stroke="white" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M19.25 20.25C19.6642 20.25 20 19.9142 20 19.5C20 19.0858 19.6642 18.75 19.25 18.75C18.8358 18.75 18.5 19.0858 18.5 19.5C18.5 19.9142 18.8358 20.25 19.25 20.25Z"
                                        stroke="white" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M2.75 3.75H5.75L8 16.5H20" stroke="white" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path
                                        d="M8 12.5H19.6925C19.7792 12.5001 19.8633 12.4701 19.9304 12.4151C19.9975 12.3601 20.0434 12.2836 20.0605 12.1986L21.4105 5.44859C21.4214 5.39417 21.42 5.338 21.4066 5.28414C21.3931 5.23029 21.3679 5.18009 21.3327 5.13717C21.2975 5.09426 21.2532 5.05969 21.203 5.03597C21.1528 5.01225 21.098 4.99996 21.0425 5H6.5"
                                        stroke="white" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <p>Add To Cart</p>
                            </button>
                        </div>

                        <div class="flash__cards-card-detail-display">
                            <div class="flash__cards-card-detail">
                                <a href="prodetails.html?cardId=${item.id}" target="_blank" class="card-detail-title">${item.title}</a>
                                <span class="detail-price">$${item.price}</span>
                                <span class="detail-discount">$${item.oldprice}</span>
                                <div class="flash__cards-card-detail-stars">
                                ${calculateStars(item.rating.rate)}
                                    <span>(${item.rating.rate})</span>
                                </div>
                            </div>
                        </div>
                    </div>
        `
        bestProductCardsContainer.innerHTML += `
        <div class="bestproduct__cards-card">
        <div class="bestproduct__cards-card-img">
        <div class="bestproduct__cards-card-img-head">
        <div class="bestproduct__cards-card-head-icons">
        <div >
        <button onclick="clickHeart(this,${item.id})" class="head-icons-heart ${dataHeart.map(n => n.id == item.id ? 'heartactive' : '').join('')}" class='card-head-icons-btn' ${dataHeart.map(n => n.id == item.id ? 'disabled' : '').join('')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
             viewBox="0 0 24 24" fill="none">
             <path
                 d="M8 5C5.7912 5 4 6.73964 4 8.88594C4 10.6185 4.7 14.7305 11.5904 18.8873C11.7138 18.961 11.8555 19 12 19C12.1445 19 12.2862 18.961 12.4096 18.8873C19.3 14.7305 20 10.6185 20 8.88594C20 6.73964 18.2088 5 16 5C13.7912 5 12 7.35511 12 7.35511C12 7.35511 10.2088 5 8 5Z"
                 stroke="black" stroke-width="1.5" stroke-linecap="round"
                 stroke-linejoin="round" />
         </svg>
        </button>
        </div>
        <div class="head-icons-eye">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16"
        viewBox="0 0 22 16" fill="none">
        <path
        d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z"
        stroke="black" stroke-width="1.5" stroke-linecap="round"
        stroke-linejoin="round" />
        <path
        d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z"
        stroke="black" stroke-width="1.5" stroke-linecap="round"
        stroke-linejoin="round" />
        </svg>
                                    </div>
                                    </div>
                            </div>
                            <img src="${item.image}" alt="image">
                            <button class="exproduct__cards-card-img-addcart " onClick="clickToCart(this, ${item.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 25 24"
                                fill="none">
                                <path
                                    d="M8.75 20.25C9.16421 20.25 9.5 19.9142 9.5 19.5C9.5 19.0858 9.16421 18.75 8.75 18.75C8.33579 18.75 8 19.0858 8 19.5C8 19.9142 8.33579 20.25 8.75 20.25Z"
                                    stroke="white" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M19.25 20.25C19.6642 20.25 20 19.9142 20 19.5C20 19.0858 19.6642 18.75 19.25 18.75C18.8358 18.75 18.5 19.0858 18.5 19.5C18.5 19.9142 18.8358 20.25 19.25 20.25Z"
                                    stroke="white" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M2.75 3.75H5.75L8 16.5H20" stroke="white" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M8 12.5H19.6925C19.7792 12.5001 19.8633 12.4701 19.9304 12.4151C19.9975 12.3601 20.0434 12.2836 20.0605 12.1986L21.4105 5.44859C21.4214 5.39417 21.42 5.338 21.4066 5.28414C21.3931 5.23029 21.3679 5.18009 21.3327 5.13717C21.2975 5.09426 21.2532 5.05969 21.203 5.03597C21.1528 5.01225 21.098 4.99996 21.0425 5H6.5"
                                    stroke="white" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            <p>Add To Cart</p>
                        </button>
                        </div>

                        <div class="bestproduct__cards-card-detail-display">
                            <div class="bestproduct__cards-card-detail">
                                <a href="prodetails.html?cardId=${item.id}" target="_blank" class="card-detail-title">${item.title}</a>
                                <span class="detail-price">${item.price}</span>
                                <span class="detail-discount">${item.oldprice}</span>
                                <div class="bestproduct__cards-card-detail-stars">
                                ${calculateStars(item.rating.rate)}
                                    <span>(${item.rating.rate})</span>
                                </div>
                            </div>
                        </div>
                    </div>
        `
        exProductCardsContainer.innerHTML += `
        <div class="exproduct__cards-card">
                        <div class="exproduct__cards-card-img">
                            <div class="exproduct__cards-card-img-head">
                                
                                <div class="exproduct__cards-card-head-icons">
                                    <div >
                                    <button onclick="clickHeart(this,${item.id})" class="head-icons-heart ${dataHeart.map(n => n.id == item.id ? 'heartactive' : '').join('')}" class='card-head-icons-btn' ${dataHeart.map(n => n.id == item.id ? 'disabled' : '').join('')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24" fill="none">
                                         <path
                                             d="M8 5C5.7912 5 4 6.73964 4 8.88594C4 10.6185 4.7 14.7305 11.5904 18.8873C11.7138 18.961 11.8555 19 12 19C12.1445 19 12.2862 18.961 12.4096 18.8873C19.3 14.7305 20 10.6185 20 8.88594C20 6.73964 18.2088 5 16 5C13.7912 5 12 7.35511 12 7.35511C12 7.35511 10.2088 5 8 5Z"
                                             stroke="black" stroke-width="1.5" stroke-linecap="round"
                                             stroke-linejoin="round" />
                                     </svg>
                                    </button>
                                    </div>
                                    <div class="head-icons-eye">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16"
                                            viewBox="0 0 22 16" fill="none">
                                            <path
                                                d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z"
                                                stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path
                                                d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z"
                                                stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <img src="${item.image}" alt="image">
                            <button class="exproduct__cards-card-img-addcart " onClick="clickToCart(this, ${item.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 25 24"
                                fill="none">
                                <path
                                    d="M8.75 20.25C9.16421 20.25 9.5 19.9142 9.5 19.5C9.5 19.0858 9.16421 18.75 8.75 18.75C8.33579 18.75 8 19.0858 8 19.5C8 19.9142 8.33579 20.25 8.75 20.25Z"
                                    stroke="white" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M19.25 20.25C19.6642 20.25 20 19.9142 20 19.5C20 19.0858 19.6642 18.75 19.25 18.75C18.8358 18.75 18.5 19.0858 18.5 19.5C18.5 19.9142 18.8358 20.25 19.25 20.25Z"
                                    stroke="white" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M2.75 3.75H5.75L8 16.5H20" stroke="white" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M8 12.5H19.6925C19.7792 12.5001 19.8633 12.4701 19.9304 12.4151C19.9975 12.3601 20.0434 12.2836 20.0605 12.1986L21.4105 5.44859C21.4214 5.39417 21.42 5.338 21.4066 5.28414C21.3931 5.23029 21.3679 5.18009 21.3327 5.13717C21.2975 5.09426 21.2532 5.05969 21.203 5.03597C21.1528 5.01225 21.098 4.99996 21.0425 5H6.5"
                                    stroke="white" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            <p>Add To Cart</p>
                        </button>
                        </div>

                        <div class="exproduct__cards-card-detail-display">
                            <div class="exproduct__cards-card-detail">
                                <a href="prodetails.html?cardId=${item.id}" target="_blank" class="card-detail-title">${item.title}</a>
                                <div class="card-detail-main">
                                    <span class="detail-price exproduct-price">${item.price}</span>
                                    <div class="exproduct__cards-card-detail-stars">
                                    ${calculateStars(item.rating.rate)}
                                    <span>(${item.rating.rate})</span>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    </div>
        `
        exProductCardsDown.innerHTML += `
        <div class="exproductDown__cards-card">
                        <div class="exproduct__cards-card-img">
                            <div class="exproduct__cards-card-img-head">
                                <div class="exproduct__cards-card-head-new new-active">
                                    <p>New</p>
                                </div>
                                <div class="exproduct__cards-card-head-icons">
                                    <div >
                                    <button onclick="clickHeart(this,${item.id})" class="head-icons-heart ${dataHeart.map(n => n.id == item.id ? 'heartactive' : '').join('')}" class='card-head-icons-btn' ${dataHeart.map(n => n.id == item.id ? 'disabled' : '').join('')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24" fill="none">
                                         <path
                                             d="M8 5C5.7912 5 4 6.73964 4 8.88594C4 10.6185 4.7 14.7305 11.5904 18.8873C11.7138 18.961 11.8555 19 12 19C12.1445 19 12.2862 18.961 12.4096 18.8873C19.3 14.7305 20 10.6185 20 8.88594C20 6.73964 18.2088 5 16 5C13.7912 5 12 7.35511 12 7.35511C12 7.35511 10.2088 5 8 5Z"
                                             stroke="black" stroke-width="1.5" stroke-linecap="round"
                                             stroke-linejoin="round" />
                                     </svg>
                                    </button>
                                    </div>
                                                <div class="head-icons-eye">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16"
                                            viewBox="0 0 22 16" fill="none">
                                            <path
                                                d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z"
                                                stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path
                                                d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z"
                                                stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                </div>
                                <img src="${item.image}" alt="image">
                                <button class="exproduct__cards-card-img-addcart " onClick="clickToCart(this, ${item.id})">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 25 24"
                                    fill="none">
                                    <path
                                        d="M8.75 20.25C9.16421 20.25 9.5 19.9142 9.5 19.5C9.5 19.0858 9.16421 18.75 8.75 18.75C8.33579 18.75 8 19.0858 8 19.5C8 19.9142 8.33579 20.25 8.75 20.25Z"
                                        stroke="white" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M19.25 20.25C19.6642 20.25 20 19.9142 20 19.5C20 19.0858 19.6642 18.75 19.25 18.75C18.8358 18.75 18.5 19.0858 18.5 19.5C18.5 19.9142 18.8358 20.25 19.25 20.25Z"
                                        stroke="white" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M2.75 3.75H5.75L8 16.5H20" stroke="white" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path
                                        d="M8 12.5H19.6925C19.7792 12.5001 19.8633 12.4701 19.9304 12.4151C19.9975 12.3601 20.0434 12.2836 20.0605 12.1986L21.4105 5.44859C21.4214 5.39417 21.42 5.338 21.4066 5.28414C21.3931 5.23029 21.3679 5.18009 21.3327 5.13717C21.2975 5.09426 21.2532 5.05969 21.203 5.03597C21.1528 5.01225 21.098 4.99996 21.0425 5H6.5"
                                        stroke="white" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <p>Add To Cart</p>
                            </button>
                        </div>

                        <div class="exproduct__cards-card-detail-display">
                            <div class="exproduct__cards-card-detail">
                                <a href="prodetails.html?cardId=${item.id}" target="_blank" class="card-detail-title">${item.title}</a>
                                <div class="card-detail-main">
                                <span class="detail-price exproduct-price">${item.price}</span>
                                <div class="exproduct__cards-card-detail-stars">
                                    ${calculateStars(item.rating.rate)}
                                        <span>(${item.rating.rate})</span>
                                    </div>
                                </div>
                                <div class="card-detail-color">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                        fill="none">
                                        <circle cx="10" cy="10" r="6" fill="#EEFF61" />
                                        <circle cx="10" cy="10" r="9" stroke="black" stroke-width="2" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                        fill="none">
                                        <circle cx="10" cy="10" r="10" fill="#DB4444" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
        `
    });
}

function aboutStaffData() {
    fetch('http://localhost:3000/staff')
        .then(res => res.json())
        .then(data => {
            allData = data;
            aboutAllStaff(data);

            $(".about__container-staff").slick({
                dots: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 1700,
                speed: 300,
                slidesToShow: 3,
                centerMode: true,
                variableWidth: true
            });
        });
}
function aboutAllStaff(x) {
    aboutStaff.innerHTML = '';
    x.map(item => {
        aboutStaff.innerHTML += `
    <div class="about__container-staff-card">
                    <div class="about__container-staff-card-photo">
                        <img src="${item.image}" alt="image">
                    </div>
                    <h4>${item.name}</h4>
                    <p>${item.duty}</p>
                    <div class="about__container-staff-card-sosicials">
                       <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                        <path
                        d="M12.905 8.84651L12.905 8.84646C12.9194 8.06035 13.2418 7.3113 13.8028 6.76049C14.3639 6.20969 15.1188 5.90116 15.905 5.90129L12.905 8.84651ZM12.905 8.84651L12.877 10.4213M12.905 8.84651L12.877 10.4213M4.75811 7.80857L4.89001 7.91846C6.76679 9.48211 8.71781 10.4182 10.7495 10.6952C10.7495 10.6952 10.7495 10.6952 10.7495 10.6952L12.3104 10.9072L4.75811 7.80857ZM4.75811 7.80857L4.72759 7.97751M4.75811 7.80857L4.72759 7.97751M4.72759 7.97751C4.42576 9.64819 4.5683 11.0709 5.1479 12.3018C5.72718 13.532 6.73827 14.5605 8.15577 15.4519L8.15579 15.452M4.72759 7.97751L8.15579 15.452M8.15579 15.452L9.90279 16.55L9.954 16.4685M8.15579 15.452L9.954 16.4685M9.954 16.4685L9.90279 16.55C9.97196 16.5934 10.0294 16.6532 10.0702 16.724C10.1109 16.7948 10.1337 16.8745 10.1365 16.9562C10.1392 17.0378 10.122 17.1189 10.0862 17.1924C10.0504 17.2658 9.99716 17.3294 9.93112 17.3775L9.93101 17.3775M9.954 16.4685L9.93101 17.3775M9.93101 17.3775L8.33901 18.5405L8.11542 18.7039M9.93101 17.3775L8.11542 18.7039M8.11542 18.7039L8.39178 18.7211M8.11542 18.7039L8.39178 18.7211M8.39178 18.7211C9.3449 18.7805 10.2529 18.7385 11.0095 18.5884L11.0096 18.5884M8.39178 18.7211L11.0096 18.5884M11.0096 18.5884C13.3886 18.1134 15.3745 16.9794 16.7652 15.2211M11.0096 18.5884L16.7652 15.2211M12.877 10.4213C12.8757 10.4918 12.8594 10.5612 12.8293 10.625C12.7993 10.6887 12.7561 10.7454 12.7026 10.7912C12.649 10.8371 12.5864 10.8712 12.5188 10.8911C12.4513 10.9111 12.3803 10.9166 12.3105 10.9072L12.877 10.4213ZM16.7652 15.2211C18.1557 13.463 18.945 11.0883 18.945 8.14229M16.7652 15.2211L18.945 8.14229M18.945 8.14229C18.945 7.99668 18.8714 7.78474 18.744 7.55722M18.945 8.14229L18.744 7.55722M18.744 7.55722C18.6142 7.32559 18.4215 7.06508 18.1673 6.82049M18.744 7.55722L18.1673 6.82049M18.1673 6.82049C17.6587 6.33088 16.8999 5.90129 15.905 5.90129L18.1673 6.82049ZM20.4978 5.53842C20.8818 5.48388 21.3285 5.34345 21.916 5.01105C21.6101 6.49526 21.4321 7.16764 20.7642 8.08336L20.745 8.10969V8.14229C20.745 11.9415 19.578 14.7567 17.8258 16.7397C16.0726 18.7238 13.7277 19.8813 11.3624 20.3532C9.74529 20.6759 7.7544 20.5728 5.99643 20.2106C5.11813 20.0296 4.30077 19.7846 3.61983 19.4974C3.03727 19.2517 2.56009 18.9775 2.22956 18.6904C2.66065 18.6482 3.4114 18.5535 4.24366 18.3598C5.24355 18.1272 6.37173 17.7494 7.20306 17.141L7.31918 17.056L7.19904 16.9768C7.15724 16.9492 7.11178 16.9196 7.06301 16.8879C6.30477 16.3938 4.74648 15.3786 3.73155 13.5166C2.66714 11.5637 2.19257 8.66295 3.91362 4.42592C5.57889 6.34347 7.2726 7.66001 8.99504 8.3668L8.99505 8.36681C9.57662 8.60536 9.94255 8.72373 10.2318 8.79141C10.4509 8.84265 10.6261 8.86463 10.8117 8.88794C10.8703 8.89529 10.93 8.90278 10.9924 8.91135L11.2872 8.95189L11.1059 8.77077C11.131 7.8414 11.4254 6.93895 11.9539 6.17331C12.4904 5.39606 13.2442 4.79434 14.1211 4.4435C14.9979 4.09265 15.9588 4.00828 16.8833 4.20093C17.8079 4.39359 18.6551 4.85471 19.3189 5.52657L19.3485 5.55658L19.3907 5.55628C19.4934 5.55556 19.5972 5.55908 19.7036 5.56269C19.9483 5.57098 20.2068 5.57974 20.4978 5.53842Z"
                        fill="white" stroke="black" stroke-width="1.1"stroke-linejoin="round" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M15 1H5C3.93913 1 2.92172 1.42143 2.17157 2.17157C1.42143 2.92172 1 3.93913 1 5V15C1 16.0609 1.42143 17.0783 2.17157 17.8284C2.92172 18.5786 3.93913 19 5 19H15C16.0609 19 17.0783 18.5786 17.8284 17.8284C18.5786 17.0783 19 16.0609 19 15V5C19 3.93913 18.5786 2.92172 17.8284 2.17157C17.0783 1.42143 16.0609 1 15 1Z"
                                stroke="black" stroke-width="1.5" stroke-linejoin="round" />
                            <path
                                d="M10 14C11.0609 14 12.0783 13.5786 12.8284 12.8284C13.5786 12.0783 14 11.0609 14 10C14 8.93913 13.5786 7.92172 12.8284 7.17157C12.0783 6.42143 11.0609 6 10 6C8.93913 6 7.92172 6.42143 7.17157 7.17157C6.42143 7.92172 6 8.93913 6 10C6 11.0609 6.42143 12.0783 7.17157 12.8284C7.92172 13.5786 8.93913 14 10 14V14Z"
                                stroke="black" stroke-width="1.5" stroke-linejoin="round" />
                            <path
                                d="M15.5 5.5C15.7652 5.5 16.0196 5.39464 16.2071 5.20711C16.3946 5.01957 16.5 4.76522 16.5 4.5C16.5 4.23478 16.3946 3.98043 16.2071 3.79289C16.0196 3.60536 15.7652 3.5 15.5 3.5C15.2348 3.5 14.9804 3.60536 14.7929 3.79289C14.6054 3.98043 14.5 4.23478 14.5 4.5C14.5 4.76522 14.6054 5.01957 14.7929 5.20711C14.9804 5.39464 15.2348 5.5 15.5 5.5Z"
                                fill="black" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M11.5 9.05C12.417 8.113 13.611 7.5 15 7.5C16.4587 7.5 17.8576 8.07946 18.8891 9.11091C19.9205 10.1424 20.5 11.5413 20.5 13V20.5H18.5V13C18.5 12.0717 18.1313 11.1815 17.4749 10.5251C16.8185 9.86875 15.9283 9.5 15 9.5C14.0717 9.5 13.1815 9.86875 12.5251 10.5251C11.8687 11.1815 11.5 12.0717 11.5 13V20.5H9.5V8H11.5V9.05ZM4.5 6C4.10218 6 3.72064 5.84196 3.43934 5.56066C3.15804 5.27936 3 4.89782 3 4.5C3 4.10218 3.15804 3.72064 3.43934 3.43934C3.72064 3.15804 4.10218 3 4.5 3C4.89782 3 5.27936 3.15804 5.56066 3.43934C5.84196 3.72064 6 4.10218 6 4.5C6 4.89782 5.84196 5.27936 5.56066 5.56066C5.27936 5.84196 4.89782 6 4.5 6ZM3.5 8H5.5V20.5H3.5V8Z"
                                fill="black" />
                        </svg>
                    </div>
    </div>
    `
    });
}

//  Account Toggle
function account() {
    accountIcon.addEventListener('click', (e) => {
        accountDropdown.classList.toggle('account-display');
    });
}

// *********Add To Favorites
let getStorageData = localStorage.getItem('heart');
if (getStorageData) {
    try {
        dataHeart = JSON.parse(getStorageData);
        dataHeart.length > 0 ? heart.classList.remove('icon-disnone') : heart.classList.add('icon-disnone');
        heartCount.textContent = dataHeart.length;
    }
    catch {
        console.error('Error');
    }
}
function clickHeart(event, id) {
    event.classList.toggle('heartactive');
    event.classList.contains('heartactive') ? heart.classList.remove('icon-disnone') : heart.classList.add('icon-disnone');
    let find = allCarts.find(item => item.id == id);

    dataHeart.push(find);
    event.setAttribute('disabled', true);
    localStorage.setItem('heart', JSON.stringify(dataHeart));
    heartCount.textContent = dataHeart.length;
}

// *********Add To Carts
let cartStorage = localStorage.getItem('shop');
if (cartStorage) {
    try {
        addToCart = JSON.parse(cartStorage);
        addToCart.length > 0 ? basket.classList.remove('icon-disnone') : basket.classList.add('icon-disnone');
        basketCount.textContent = addToCart.length;
    }
    catch {
        console.error('Error');
    }
}
function clickToCart(event, id) {
    event.classList.toggle('basketactive');
    event.classList.contains('basketactive') ? basket.classList.remove('icon-disnone') : basket.classList.add('icon-disnone');
    let findX = allCarts.find(item => item.id == id);
    addToCart.push(findX);
    event.setAttribute('disabled', true);
    localStorage.setItem('shop', JSON.stringify(addToCart));
    basketCount.textContent = addToCart.length;
}

function getAllCategoryData() {
    fetch('http://localhost:3000/category')
        .then(res => res.json())
        .then(data => {
            allData = data;
            getCategoryData(data);
            $(".homepage__main-categories-cards").slick({
                dots: false,
                infinite: true,
                nextArrow: $('.categories-title-icons-back'),
                prevArrow: $('.categories-title-icons-next'),
                autoplay: true,
                autoplaySpeed: 1500,
                centerPadding: '60px',
                speed: 300,
                slidesToShow: 5,
                centerMode: true,
                variableWidth: true
            });
        });
}
function getCategoryData(x) {
    categoryCardsContainer.innerHTML = '';
    x.map(item => {
        categoryCardsContainer.innerHTML += `
               <div class="categories__cards-card">
                        <div class="categories__cards-card-img">
                        <img src="${item.icon}" alt="icons">
                        </div>
                        <a href="./allproduct.html?categoryId=${item.id}" class="categories__cards-card-name">${item.name}</a>
                </div>
        `
    })
}

function getAllSlidersData() {
    fetch('http://localhost:3000/sliders')
        .then(res => res.json())
        .then(data => {
            allData = data;
            getSlidersData(data);
            $(".information-right-bg-image").slick({
                dots: true,
                autoplay: true,
                autoplaySpeed: 1700,
                prevArrow: false,
                nextArrow: false,
                slidesToShow: 1,
                centerMode: true,
                variableWidth: true
            });
        });
}
function getSlidersData(x) {
    phoneContainer.innerHTML = '';
    x.map(item => {
        phoneContainer.innerHTML += `
        <img src="${item.image}" alt="image">
        `
    });
}

function getViewAllData() {
    fetch('http://localhost:3000/products')
        .then(res => res.json())
        .then(data => {
            allData = data;
            viewAllData(data);
            searchFilter();
        });
}
function viewAllData(x) {
    viewAllContainer.innerHTML = '';
    x.map(item => {
        viewAllContainer.innerHTML += `
        <div class="viewall__container-cards-card">
                        <div class="viewall__container-card-img">
                            <div class="viewall__cards-card-img-head">
                                <div class="viewall__cards-card-head-discount">
                                    <p>${item.discount}%</p>
                                </div>
                                <div class="viewall__cards-card-head-icons">
                                    <div class="head-icons-heart">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M8 5C5.7912 5 4 6.73964 4 8.88594C4 10.6185 4.7 14.7305 11.5904 18.8873C11.7138 18.961 11.8555 19 12 19C12.1445 19 12.2862 18.961 12.4096 18.8873C19.3 14.7305 20 10.6185 20 8.88594C20 6.73964 18.2088 5 16 5C13.7912 5 12 7.35511 12 7.35511C12 7.35511 10.2088 5 8 5Z"
                                                stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div class="head-icons-eye">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16"
                                            viewBox="0 0 22 16" fill="none">
                                            <path
                                                d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z"
                                                stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path
                                                d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z"
                                                stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <img src="${item.image}" alt="image">
                            <button class="exproduct__cards-card-img-addcart " onClick="clickToCart(this, ${item.id})">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 25 24"
                                    fill="none">
                                    <path
                                        d="M8.75 20.25C9.16421 20.25 9.5 19.9142 9.5 19.5C9.5 19.0858 9.16421 18.75 8.75 18.75C8.33579 18.75 8 19.0858 8 19.5C8 19.9142 8.33579 20.25 8.75 20.25Z"
                                        stroke="white" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M19.25 20.25C19.6642 20.25 20 19.9142 20 19.5C20 19.0858 19.6642 18.75 19.25 18.75C18.8358 18.75 18.5 19.0858 18.5 19.5C18.5 19.9142 18.8358 20.25 19.25 20.25Z"
                                        stroke="white" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M2.75 3.75H5.75L8 16.5H20" stroke="white" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path
                                        d="M8 12.5H19.6925C19.7792 12.5001 19.8633 12.4701 19.9304 12.4151C19.9975 12.3601 20.0434 12.2836 20.0605 12.1986L21.4105 5.44859C21.4214 5.39417 21.42 5.338 21.4066 5.28414C21.3931 5.23029 21.3679 5.18009 21.3327 5.13717C21.2975 5.09426 21.2532 5.05969 21.203 5.03597C21.1528 5.01225 21.098 4.99996 21.0425 5H6.5"
                                        stroke="white" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <p>Add To Cart</p>
                            </button>
                        </div>

                        <div class="viewall__cards-card-detail-display">
                            <div class="viewall__cards-card-detail">
                                <a href="prodetails.html?cardId=${item.id}" target="_blank" class="card-detail-title">${item.title}</a>
                                <span class="detail-price">$${item.price}</span>
                                <span class="detail-discount">$${item.oldprice}</span>
                                <div class="flash__cards-card-detail-stars">
                                ${calculateStars(item.rating.rate)}
                                    <span>(${item.rating.rate})</span>
                                </div>
                            </div>
                        </div>
                    </div>
        `
    });
}

function calculateStars(star) {
    let fullStar = Math.floor(+star);
    let starHtml = '';
    for (let i = 1; i < fullStar; i++) {
        starHtml += `
    <div class="flash__cards-card-detail-stars">
       <img src="./assets/icons/Vector.png" alt="icons">
    </div>
    `
    }
    if (+star - fullStar == 0.5) {
        starHtml += `
    <div class="flash__cards-card-detail-stars">
       <img src="./assets/icons/Vector-half.png" alt="icons">
    </div>
    `
    }
    return starHtml;
}
function productDetails(id) {
    fetch('http://localhost:3000/products/' + id)
        .then(res => res.json())
        .then(data => {
            innerProductDetails(data);
        });
}
function innerProductDetails(x) {
    proDetailsInfo.innerHTML = `
           <div class="prodetails__container-information-image">
                    <div class="information__image-left">
                        <img src="${x.image1}" alt="image">
                        <img src="${x.image2}" alt="image">
                        <img src="${x.image3}" alt="image">
                        <img src="${x.image4}" alt="image">
                    </div>
                    <div class="information__image-right">
                        <img src="${x.image}" alt="image">
                    </div>
                </div>
           <div class="prodetails__container-information-detail">
  <div class="information__detail-up">
  <h4>${x.title}</h4>
  <div class="information__detail-up-stars">
      <div class="information__detail-up-stars-display">
      ${calculateStars(x.rating.rate)}
          <span>(${x.rating.rate} Reviews)  |</span>
      </div>
      <span> In Stock</span>
  </div>
  <p class="prodetails-price">$${x.price}</p>
  <p>${x.description}.</p>
</div>
<div class="information__detail-down">
  <div class="information__detail-down-colors">
      <span>Colours:</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
          fill="none">
          <circle cx="10" cy="10" r="6" fill="#A0BCE0" />
          <circle cx="10" cy="10" r="9" stroke="black" stroke-width="2" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
          fill="none">
          <circle cx="10" cy="10" r="10" fill="#E07575" />
      </svg>
  </div>
  <div class="information__detail-down-size">
      <span>Size:</span>
      <p class="size-type typexs">XS</p>
      <p class="size-type types">S</p>
      <p class="size-type typem">M</p>
      <p class="size-type typel">L</p>
      <p class="size-type typexl">XL</p>
  </div>
  <div class="information__detail-down-count">
      <div class="product-count">
          <button class="product-count-minus">-</button>
          <p class="product--count">1</p>
          <button class="product-count-plus">+</button>
      </div>
      <button><a href="./cart.html">Buy Now</a></button>
      <div class="product-count-like">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
      </div>
  </div>
  <div class="product-delivery">
      <div class="product-delivery-free">
          <div class="product-delivery-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <g clip-path="url(#clip0_261_4843)">
                    <path d="M11.6673 31.6667C13.5083 31.6667 15.0007 30.1743 15.0007 28.3333C15.0007 26.4924 13.5083 25 11.6673 25C9.82637 25 8.33398 26.4924 8.33398 28.3333C8.33398 30.1743 9.82637 31.6667 11.6673 31.6667Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M28.3333 31.6667C30.1743 31.6667 31.6667 30.1743 31.6667 28.3333C31.6667 26.4924 30.1743 25 28.3333 25C26.4924 25 25 26.4924 25 28.3333C25 30.1743 26.4924 31.6667 28.3333 31.6667Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.33398 28.3335H7.00065C5.89608 28.3335 5.00065 27.4381 5.00065 26.3335V21.6668M3.33398 8.3335H19.6673C20.7719 8.3335 21.6673 9.22893 21.6673 10.3335V28.3335M15.0007 28.3335H25.0007M31.6673 28.3335H33.0007C34.1052 28.3335 35.0007 27.4381 35.0007 26.3335V18.3335M35.0007 18.3335H21.6673M35.0007 18.3335L30.5833 10.9712C30.2218 10.3688 29.5708 10.0002 28.8683 10.0002H21.6673" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8 28H6.66667C5.5621 28 4.66667 27.1046 4.66667 26V21.3333M3 8H19.3333C20.4379 8 21.3333 8.89543 21.3333 10V28M15 28H24.6667M32 28H32.6667C33.7712 28 34.6667 27.1046 34.6667 26V18M34.6667 18H21.3333M34.6667 18L30.2493 10.6377C29.8878 10.0353 29.2368 9.66667 28.5343 9.66667H21.3333" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5 11.8182H11.6667" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1.81836 15.4545H8.48503" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5 19.0909H11.6667" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_261_4843">
                      <rect width="40" height="40" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
          </div>
          <div class="product-delivery-info">
              <p>Free Delivery</p>
              <p>Enter your postal code for Delivery Availability</p>
          </div>
      </div>
      <div class="product-delivery-return">
          <div class="product-delivery-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <g clip-path="url(#clip0_261_4865)">
                    <path d="M33.3327 18.3334C32.9251 15.4004 31.5645 12.6828 29.4604 10.5992C27.3564 8.51557 24.6256 7.18155 21.6888 6.80261C18.752 6.42366 15.7721 7.02082 13.208 8.5021C10.644 9.98337 8.6381 12.2666 7.49935 15M6.66602 8.33335V15H13.3327" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.66602 21.6667C7.07361 24.5997 8.43423 27.3173 10.5383 29.4009C12.6423 31.4845 15.3731 32.8185 18.3099 33.1974C21.2467 33.5764 24.2266 32.9792 26.7907 31.4979C29.3547 30.0167 31.3606 27.7335 32.4994 25M33.3327 31.6667V25H26.666" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_261_4865">
                      <rect width="40" height="40" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
          </div>
          <div class="product-delivery-info">
              <p>Return Delivery</p>
              <p>Free 30 Days Delivery Returns. Details</p>
          </div>
      </div>
  </div>
</div> 
</div>
  `
    proDetailsHead.innerHTML = `
  <span>Home /</span>
  <span>Product /</span>
  <span>${x.title}</span>
  `
    let productCount = document.querySelector('.product--count');
    let productCountMinus = document.querySelector('.product-count-minus');
    let productCountPlus = document.querySelector('.product-count-plus');
    increasAndReduce(productCountPlus, productCountMinus, productCount);
}
function increasAndReduce(plus, minus, count) {
    plus.addEventListener('click', () => {
        +(count.textContent)++;
    });
    minus.addEventListener('click', () => {
        +(count.textContent) <= 1 ? +(count.textContent) : +(count.textContent)--;
    });
}

function innerProductWishlist() {
    wishlistCards.innerHTML = '';
    dataHeart.map(like => {
        wishlistCards.innerHTML += `
   <div class="favorite__wishlist-cards-card">
   <div class="wishlist__cards-card-img">
       <div class="wishlist__cards-card-img-head">
           <div class="wishlist__cards-card-head-icons">
               <div class="head-icons-remove">
               <button class='remove-btn' onClick="removeData(this, ${like.id})">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                       fill="none">
                       <path
                           d="M20 5.57143H5.33333L6.66667 21H17.3333L18.6667 5.57143H4M12 9.42857V17.1429M15.3333 9.42857L14.6667 17.1429M8.66667 9.42857L9.33333 17.1429M9.33333 5.57143L10 3H14L14.6667 5.57143"
                           stroke="black" stroke-width="1.56" stroke-linecap="round"
                           stroke-linejoin="round" />
                   </svg>
                </button>
               </div>
           </div>
       </div>
       <img src="${like.image}" alt="image">
        <div class="wishlist__cards-card-img-addcart ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 25 24"
                                fill="none">
                                <path
                                    d="M8.75 20.25C9.16421 20.25 9.5 19.9142 9.5 19.5C9.5 19.0858 9.16421 18.75 8.75 18.75C8.33579 18.75 8 19.0858 8 19.5C8 19.9142 8.33579 20.25 8.75 20.25Z"
                                    stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M19.25 20.25C19.6642 20.25 20 19.9142 20 19.5C20 19.0858 19.6642 18.75 19.25 18.75C18.8358 18.75 18.5 19.0858 18.5 19.5C18.5 19.9142 18.8358 20.25 19.25 20.25Z"
                                    stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M2.75 3.75H5.75L8 16.5H20" stroke="white" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M8 12.5H19.6925C19.7792 12.5001 19.8633 12.4701 19.9304 12.4151C19.9975 12.3601 20.0434 12.2836 20.0605 12.1986L21.4105 5.44859C21.4214 5.39417 21.42 5.338 21.4066 5.28414C21.3931 5.23029 21.3679 5.18009 21.3327 5.13717C21.2975 5.09426 21.2532 5.05969 21.203 5.03597C21.1528 5.01225 21.098 4.99996 21.0425 5H6.5"
                                    stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p>Add To Cart</p>
                        </div>
   </div>

   <div class="wishlist__cards-card-detail-display">
       <div class="wishlist__cards-card-detail">
           <h4>${like.title}</h4>
           <span class="detail-price">$${like.price}</span>
           <span class="detail-discount">$${like.discount}</span>
       </div>
   </div>
</div>
   `
    });
    wishlistTitle.textContent = dataHeart.length;
    heartCount.textContent = dataHeart.length;
    localStorage.setItem('heart', JSON.stringify(dataHeart));
    // wishlistCards.innerHTML = wishlistData;
}

function removeData(e, id) {
    dataHeart = dataHeart.filter(item => item.id != id);
    dataHeart.length > 0 ? heart.classList.remove('icon-disnone') : heart.classList.add('icon-disnone');
    innerProductWishlist();
    localStorage.setItem('heart', JSON.stringify(dataHeart));
}

function innerCartDetails() {
    cartContainer.innerHTML = '';
    addToCart.map(cart => {
        cartContainer.innerHTML += `
        <div class="info-details-product product-one " dataId=${cart.id}>
                        <div class="info-details-product-img ">
                        <button class='cartRemove' onClick="removeCarts(this, ${cart.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <circle cx="12" cy="12" r="9" fill="#DB4444" />
                                <path d="M9 15L12 12M15 9L11.9994 12M11.9994 12L9 9M12 12L15 15" stroke="white"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            </button>
                            <img src="${cart.image}" alt="photo">
                            <p class="fontdesign">${cart.title.substring(0, 15).concat('..')}</p>
                        </div>
                        <p class="crt fontdesign cartPrice">$${cart.price}</p>
                        <div class="productnum crt info-details-product-price">
                            <span class="product-nmbr">${Number(productCount)}</span>
                            <div class="info-details-product-price-button">
                            <img class="price-button-up" onclick="cartAddSubtotal(this, ${cart.id})" src="./assets/icons/arrow-up.png" alt="icons">
                            <img class="price-button-down" onclick="cartRemoveSubtotal(this, ${cart.id})" src="./assets/icons/arrow-down-sign-to-navigate.png" alt="icons">
                            </div>
                        </div>
                        <p class="crt fontdesign subtotal">$${cart.price}</p>
        </div>
        `
        sumPrice = +cart.price;
        productCount >= 1 ? sumTotal += Number(cart.price) : sumTotal -= Number(cart.price);
        checkoutCartSubtotal.textContent = `$${sumTotal}`;
        checkoutCartSubtotalTwo.textContent = `$${sumTotal}`;
    });
    basketCount.textContent = addToCart.length;
    localStorage.setItem('shop', JSON.stringify(addToCart));
    updateCarts();
}

function cartAddSubtotal(e, id) {
    let find = addToCart.find(item => item.id == id);
    let productNmbr = document.querySelector(`.info-details-product[dataId="${id}"] .product-nmbr`);
    let productTotal = document.querySelector(`.info-details-product[dataId="${id}"] .subtotal`);
    let productCartTotal = document.querySelector(`.info-details-product[dataId="${id}"] .cartPrice`);
    productNmbr.textContent = Number(productNmbr.textContent) + 1;
    let plusValue = +productNmbr.textContent;
    let total = plusValue * Number(productCartTotal.textContent.slice(-3));
    productTotal.textContent = "$" + total;
    sumTotal += Number(find.price);
    checkoutCartSubtotal.textContent = "$" + sumTotal;
    checkoutCartSubtotalTwo.textContent = "$" + sumTotal;
}
function cartRemoveSubtotal(e, id) {
    let find = addToCart.find(item => item.id == id);
    let productNmbr = document.querySelector(`.info-details-product[dataId="${id}"] .product-nmbr`);
    let productTotal = document.querySelector(`.info-details-product[dataId="${id}"] .subtotal`);
    let productCartTotal = document.querySelector(`.info-details-product[dataId="${id}"] .cartPrice`);
    let plusValue = +productNmbr.textContent;

    if (plusValue <= 1) {
        plusValue = 1;
        productCartTotal.textContent = find.price;
    }
    else {
        productNmbr.textContent = Number(productNmbr.textContent) - 1;
        productTotal.textContent = "$" + (Number(productNmbr.textContent) * Number(productCartTotal.textContent.slice(-3)));
        sumTotal -= Number(find.price);
        checkoutCartSubtotal.textContent = "$" + sumTotal;
        checkoutCartSubtotalTwo.textContent = "$" + sumTotal;
    }
}

// Update  All Cart
function updateCarts() {
    let updateBtn = document.querySelector('.update-btn');
    let sumUpdateTotal = 0;
    updateBtn.addEventListener('click', (e) => {
        cartContainer.innerHTML = '';
        addToCart.map(cart => {
            cartContainer.innerHTML += `
        <div class="info-details-product product-one">
                        <div class="info-details-product-img ">
                        <button class='cartRemove' onClick="removeCarts(this, ${cart.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <circle cx="12" cy="12" r="9" fill="#DB4444" />
                                <path d="M9 15L12 12M15 9L11.9994 12M11.9994 12L9 9M12 12L15 15" stroke="white"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            </button>
                            <img src="${cart.image}" alt="photo">
                            <p class="fontdesign">${cart.title.substring(0, 15).concat('..')}</p>
                        </div>
                        <p class="crt fontdesign cartPrice">$${Number(cart.price)}</p>
                        <div class="productnum crt info-details-product-price">
                            <span class="product-nmbr">1</span>
                            <div class="info-details-product-price-button">
                            <img class="price-button-up" onclick="cartAddSubtotal(this)" src="./assets/icons/arrow-up.png" alt="icons">
                            <img class="price-button-down" src="./assets/icons/arrow-down-sign-to-navigate.png" alt="icons">
                            </div>
                        </div>
                        <p class="crt fontdesign subtotal">$${cart.price}</p>
        </div>
        `
            sumUpdateTotal += Number(cart.price);
            let checkoutCartSubtotal = document.querySelector(".footer-right-checkout-subtotal");
            checkoutCartSubtotal.textContent = `$${sumUpdateTotal}`;
            let checkoutCartSubtotalTwo = document.querySelector(".checkout-cart-subtotal");
            checkoutCartSubtotalTwo.textContent = `$${sumUpdateTotal}`;
        });
    })
}
function removeCarts(e, id) {
    addToCart = addToCart.filter(item => item.id != id);
    addToCart.length > 0 ? basket.classList.remove('icon-disnone') : basket.classList.add('icon-disnone');
    innerCartDetails();
    localStorage.setItem('shop', JSON.stringify(addToCart));
    let find = addToCart.find(item => item.id == id);
    sumTotal -= Number(find.price);
    checkoutCartSubtotal.textContent = "$" + sumTotal;
    checkoutCartSubtotalTwo.textContent = "$" + sumTotal;
}

let sum = 0;
function checkoutPageCarts() {
    checkoutDetailsCont.innerHTML = '';
    addToCart.map(cart => {
        checkoutDetailsCont.innerHTML += `
                <div class="checkout-details">
                            <div class="checkout-detail">
                                <img src="${cart.image}" alt="photo">
                                <p>${cart.title}</p>
                            </div>
                            <span class="checkout-detail-price">$${Number(cart.price)}</span>
                </div>
        `
        sum += Number(cart.price);
        chekoutTotal();
    });
}
function chekoutTotal() {
    let checkoutPrice = document.querySelector('.checkout-details-total');
    checkoutPrice.textContent = `$${sum}`;
    let checkoutPriceSubtotal = document.querySelector('.checkout-details-subtotal');
    checkoutPriceSubtotal.textContent = `$${sum}`;
}

//   Sign up Regex.....
let isCheck = true;
let usersForm = localStorage.getItem("users");
if (usersForm) {
    try {
        formData = JSON.parse(usersForm);
    } catch (error) {
        console.error('error');
    }
}

function signupRegex() {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let name = document.querySelector("#text-id");
        let email = document.querySelector("#email-id");
        let password = document.querySelector("#pswrd-id");
        const nameRegex = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!nameRegex.test(name.value) ||
            !emailRegex.test(email.value) ||
            !passwordRegex.test(password.value)) {
            isCheck = false;
            if (!nameRegex.test(name.value)) {
                alert('Please enter a valid name');
            }
            if (!emailRegex.test(email.value)) {
                alert('Please enter a valid email');
            }
            if (!passwordRegex.test(password.value)) {
                alert('Please enter a valid password');
            }
        }
        else {
            isCheck = true;
            alert('Successful !');
            window.location.href = "/log_in.html";
            formData.push({
                userEmail: email.value.trim(),
                userPassw: password.value.trim(),
                userName: name.value.trim()
            });
            localStorage.setItem("users", JSON.stringify(formData));
        }
    });
}

function loginRegex() {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let emailLogin = document.querySelector("#email-logid");
        let passwordLogin = document.querySelector("#pswrd-logid");
        let userFormEmail = byFindEmail(emailLogin.value)
        let userFormPassword = byFindPassw(passwordLogin.value);

        if ((emailLogin.value == userFormEmail.userEmail) && (passwordLogin.value == userFormPassword.userPassw)) {
            alert('Successful !');
            window.location.href = "/index.html";
        }
        else {
            alert('Please enter a valid password or email');
        }
    });
}
function byFindEmail(mail) {
    return formData.find(item => {
        return item.userEmail == mail
    })
}

function byFindPassw(pass) {
    return formData.find(item => {
        return item.userPassw == pass
    })
}

function searchData(searchItem, key, allData) {
    searchItem = searchItem.toLowerCase();
    const filterData = allData.filter((item) => {
        const currentValue = item[key].toLowerCase();
        return currentValue.includes(searchItem);
    })
    return filterData;
}
function searchFilterIndex() {
    searchInput.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = './allproduct.html?searchName=' + `${searchArea.value}`;
    });
}
function searchFilter() {
    searchAreaAllPro.value = page.searchName;
    let resultFilter = searchData(searchAreaAllPro.value, 'title', allData);
    viewAllData(resultFilter);
}
function viewAllSearch() {
    searchAreaButton.addEventListener('click', (e) => {
        e.preventDefault();
        let resultFilter = searchData(searchAreaAllPro.value, 'title', allData);
        viewAllData(resultFilter);
    });
}
function filterClick(id) {
    let filterX = allData.filter(item => item.categoryId == id);
    viewAllData(filterX);
}
function filterClickFetch() {
    fetch(`http://localhost:3000/products`)
        .then(res => res.json())
        .then(data => {
            allData = data;
            filterClick(page.categoryId);
        });
}