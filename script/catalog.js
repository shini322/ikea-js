import { getData } from "./getData.js";
import generateSubcatalog from './generateSubcatalog.js'

const catalog = () => {
    const updateSubCatalog = generateSubcatalog(),
        btnBurger = document.querySelector('.btn-burger'),
        catalog = document.querySelector('.catalog'),
        subCatalog = document.querySelector('.subcatalog'),
        closeBtnReturn = document.querySelector('.btn-return');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.append(overlay);

    const openMenu = () => {
        catalog.classList.add('open');
        overlay.classList.add('active');
    };

    const closeMenu = () => {
        catalog.classList.remove('open');
        overlay.classList.remove('active');
        closeSubMenu();
    };

    const handlerCatalog = (e) => {
        e.preventDefault();
        const target = e.target;
        const closeTarget = target.closest('.btn-close')
        const itemList = target.closest('.catalog-list__item');
        if (itemList) {            
            getData.subCatalog(target.textContent, (data) => {  
                const subCatalogHeader = document.querySelector('.subcatalog-header')                                         
                updateSubCatalog(target.textContent, data)  
                subCatalog.classList.add('subopen');
            })            
        }

        if(closeTarget){
            closeMenu();
        }
    };

    const closeSubMenu = () => {
        subCatalog.classList.remove('subopen');
    };


    btnBurger.addEventListener('click', openMenu);
    overlay.addEventListener('click', closeMenu, );
    document.addEventListener('keydown', e => {
        if (e.code == 'Escape') {
            closeMenu();
        }
    });
    catalog.addEventListener('click', handlerCatalog);
    subCatalog.addEventListener('click', (e) => {
        const target = e.target,
              returnTarget = target.closest('.btn-return');
        if(returnTarget)  closeSubMenu();
    });
    // closeBtnReturn.addEventListener('click', closeSubMenu);
};

export default catalog;
