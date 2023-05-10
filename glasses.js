const products = {
    "1001": {
        "name": "Glasses Giovanni Bros 1603",
        "url": "#",
        "image": "./styles/img/glasses_1.png",
        "price": 1720.00,
        "tags": ['popular', 'new'],
        "sale": 1,
        "category": "for men"
    },
    "1002": {
        "name": "Glasses Matrius 7553",
        "url": "#",
        "image": "./styles/img/glasses_2.png",
        "price": 1460.00,
        "tags": ['popular'],
        "sale": 0.7,
        "category": "for women"
    },
    "1003": {
        "name": "Glasses Cheysler 03303",
        "url": "#",
        "image": "./styles/img/glasses_3.png",
        "price": 1860.00,
        "tags": ['new'],
        "sale": 1,
        "category": "for women"
    },
    "1004": {
        "name": "Glasses Graffito 3803",
        "url": "#",
        "image": "./styles/img/glasses_4.png",
        "price": 1800.00,
        "tags": ['popular'],
        "sale": 1,
        "category": "for men"
    },
    "1005": {
        "name": "Glasses Polar Eagle 05037",
        "url": "#",
        "image": "./styles/img/glasses_5.png",
        "price": 1860.00,
        "tags": ['popular', 'recommended'],
        "sale": 1,
        "category": "for women"
    },
    "1006": {
        "name": "Glasses Graffito 3108",
        "url": "#",
        "image": "./styles/img/glasses_6.png",
        "price": 2350.00,
        "tags": ['popular'],
        "sale": 0.8,
        "category": "for men"
    },
    "1007": {
        "name": "Glasses Polar Eagle 20513",
        "url": "#",
        "image": "./styles/img/glasses_7.png",
        "price": 1980.00,
        "tags": ['new'],
        "sale": 1,
        "category": "for men"
    },
    "1008": {
        "name": "Glasses Giovanni Bros 1608",
        "url": "#",
        "image": "./styles/img/glasses_8.png",
        "price": 2980.00,
        "tags": ['popular'],
        "sale": 0.75,
        "category": "for men"
    },
    "1009": {
        "name": "Glasses Sissi 18271",
        "url": "#",
        "image": "./styles/img/glasses_9.png",
        "price": 2240.00,
        "tags": ['new'],
        "sale": 1,
        "category": "for women"
    },
}

// Шаблон вывода товаров магазина
const data = {
    headerClass: ['header-up'],
    data: products,
    element: '.shop'
}

// Функция 'outPageCart' определяет текущую страницу, формирует в 'out' данные для вывода
// корзины, мини- корзины. Эти данные используются также как условие для вывода
// товаров

let outPageCart = function () {
    let path = document.location.href; //  определение текущей страницы
    let out = '';
    // console.log(path);
    if (path.includes('cart.html')) {
        out = {
            'point': '.cart-out',
            // 'method': shopCart.render() 
            
        }
    } else {
        out = {
            'point': '.widget_shopping_cart',
            // 'method': shopCart.getMiniCart()
        }
    }
    return out;
}

let show = outPageCart(); // переменная с данными для вывода корзины
console.log(show);


if (show.point === '.widget_shopping_cart') { // вывод товаров  не работает на страницы корзины
    
    let outputForms = new OutputForms(data);

    // Вывод заголовков категорий товаров по умолчаню
    let arrHeaders = ['featured products', 'new goods', 'sale'];
    outputForms.getProductsMain(arrHeaders);


    // Вывод по нажатию в меню на MEN (понятно, что лучше создать отдельную страницу)
    document.querySelector('.men').onclick = function () {
        headerMen = ['for men'];
        outputForms.getProductsMain(headerMen);
    };

    // Вывод по нажатию в меню на WOMEN (понятно, что лучше создать отдельную страницу)
    document.querySelector('.women').addEventListener('click', function () {
        headerWomen = ['for women'];
        outputForms.getProductsMain(headerWomen);
    });

    // открытие-закрытие мини-корзины. 
    //  open-close cart-mini viev-cart
    let cartMini = document.querySelector('.cart-mini');
    let buttonCartMini = document.querySelector('.button-cart-mini');
    let openCart = document.querySelector('.open-cart');

    buttonCartMini.addEventListener('click', () => {
        if (cartMini.classList.contains('wd-opened')) {
            cartMini.classList.remove('wd-opened');
        }
    });

    openCart.addEventListener('click', () => {
        if (!cartMini.classList.contains('wd-opened')) {
            cartMini.classList.add('wd-opened');
        }
    });
}

// Корзина
let cart = {}; // корзина, сюда добавляем товары

const productBtn = document.querySelectorAll('.shop');

productBtn.forEach((item) => {
    item.addEventListener('click', function (event) {
        console.log('yes');
        if (event.target.classList.contains('to-cart')) {
            // console.log('yes-yes');
            let cartMini = document.querySelector('.cart-mini');
            let articul = event.target.dataset['articul'];
            console.log(articul);
            if (cart[articul] !== undefined) {
                cart[articul]['count']++;
            }
            else {
                console.log(products[articul]);
                cart[articul] = products[articul];
                cart[articul]['count'] = 1;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            //open mini-cart
            cartMini.classList.add('wd-opened');
            outCart(show.point); // запуск функции вывода корзины (мини-корзины)
        }
    });
});


// Функция вывода корзины

function outCart(out) {

    if (!localStorage.getItem('cart')) { // проверка на пустой localStorage
        shopCart.emptyInCartOut(out); // проверка на пустую корзину с передачей точки вывода 'out'
    } else

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            let shopCart = new CartGlasses(cart); // cart - массив товаров в корзине
            console.log(shopCart);

            // мини-корзина
            if (out === '.widget_shopping_cart') { // операции с мини-корзиной
                document.querySelector(out).innerHTML = ''; // очищаю вывод
                document.querySelector(out).append(shopCart.getMiniCart()); // рисую мини-корзину
                document.querySelector(out).addEventListener('click', (event) => {
                    let target = event.target;
                    if (target.classList.contains('delete')) {
                        shopCart.goodsDelete(target.dataset['articul']);
                        document.querySelector(out).innerHTML = '';
                        document.querySelector(out).append(shopCart.getMiniCart());
                        localStorage.setItem('cart', JSON.stringify(shopCart.items));
                        shopCart.emptyInCartOut(out); // проверка на пустую корзину
                        shopCart.getQt(); // количество товаров в корзине
                        return true;
                    }
                });
            }

            // корзина
            if (out === '.cart-out') { // операции с корзиной
                document.querySelector(out).innerHTML = ''; // очищаю вывод
                document.querySelector(out).append(shopCart.render()); // рисую корзину
                document.querySelector(out).addEventListener('click', (event) => {
                    let target = event.target;
                    if (target.classList.contains('delete')) {
                        shopCart.goodsDelete(target.dataset['articul']);
                        document.querySelector(out).innerHTML = '';
                        document.querySelector(out).append(shopCart.render());
                        localStorage.setItem('cart', JSON.stringify(shopCart.items));
                        shopCart.emptyInCartOut(out);
                        shopCart.getQt(); // количество товаров в корзине
                        return true;
                    }
                    else if (target.classList.contains('plus')) {
                        shopCart.goodsPlus(target.dataset['articul']);
                        console.log(shopCart);
                        document.querySelector(out).innerHTML = '';
                        document.querySelector(out).append(shopCart.render());
                        localStorage.setItem('cart', JSON.stringify(shopCart.items));
                        shopCart.getQt(); // 
                        return true;
                    }
                    else if (target.classList.contains('minus')) {
                        shopCart.goodsMinus(target.dataset['articul']);
                        document.querySelector(out).innerHTML = '';
                        document.querySelector(out).append(shopCart.render());
                        localStorage.setItem('cart', JSON.stringify(shopCart.items));
                        shopCart.emptyInCartOut(out);
                        shopCart.getQt(); // 
                        return true;
                    }
                });
            }
            shopCart.emptyInCartOut(out);
            shopCart.getQt();
        }
}

outCart(show.point); // запускаем функцию вывода корзины