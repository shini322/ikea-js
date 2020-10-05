import catalog from './catalog.js';
import { getData } from './getData.js';
import userData from './userData.js';

const NEW_COUNT_ITEM = 5;

const generateItemPage = () => {

    const renderCard = ({ category, count, description, id, img, name: nameItem, price, subcategory}) => {
        const goodImages = document.querySelector('.good-images'),
            goodItemNew = document.querySelector('.good-item__new'),
            goodItemHeader = document.querySelector('.good-item__header'),
            goodItemDescription = document.querySelector('.good-item__description'),
            goodItemEmpty = document.querySelector('.good-item__empty'),
            goodItemPriceValue = document.querySelector('.good-item__price-value'),
            goodItemCurrency = document.querySelector('.good-item__currency'),
            btnGood = document.querySelector('.btn-good'),
            btnAddWishlist = document.querySelector('.btn-add-wishlist'),
            breadcrumbLink = document.querySelectorAll('.breadcrumb__link');

            breadcrumbLink[0].textContent = category;
            breadcrumbLink[0].href = `goods.html?cat=${category}`;
            breadcrumbLink[1].textContent = subcategory;
            breadcrumbLink[1].href = `goods.html?subcat=${subcategory}`;
            breadcrumbLink[2].textContent = nameItem;

            goodImages.textContent == '';
            
            goodItemHeader.textContent = nameItem;
            goodItemDescription.textContent = description;
            
            goodItemPriceValue.textContent = price;
            btnGood.dataset.idd = id;
            btnAddWishlist.dataset.idd = id;

            img.forEach(item => {
                goodImages. insertAdjacentHTML('beforeend', `
                <div class="good-image__item">
                    <img src="${item}" alt="${nameItem} - ${description}">
                </div>
                `)
            });

            if(count >= NEW_COUNT_ITEM){
                goodItemNew.style.display = 'block';
            } else if(!count){
                goodItemEmpty.style.display = 'block';
                btnGood.style.display = 'none';
            }

            const checkWishList = () => {
                if(userData.wishList.includes(id)){
                    btnAddWishlist.classList.add('contains-wishlist')
                } else {
                    btnAddWishlist.classList.remove('contains-wishlist')
                }
            }
            
            checkWishList();

            btnAddWishlist.addEventListener('click', () => {
                userData.wishList = id;
                checkWishList();
            });

            btnGood.addEventListener('click', (e) => {
                userData.cartList = id;
            });
    }

    if(location.hash && location.pathname.includes('card')) {
        getData.item(location.hash.substring(1), renderCard);
    }       
};

export default generateItemPage;    