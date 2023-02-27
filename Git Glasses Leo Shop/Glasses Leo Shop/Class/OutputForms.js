class OutputForms {

    constructor(data) {
        this.headerClass = data.headerClass;
        this.data = data.data;
        this.element = data.element;
    }

    getProductsMain(arrHeaders) {
        this.headers = arrHeaders;

        // карточка товара, плюс учет скидки

        const card = function (image, name, price, discount, art) {
            let out = '';
            out += `<a href="#">`;
            out += `<div class="glasses">`;
            out += `<img class="img-glasses" src="${image}">`;
            out += `</div>`;
            out += `</a>`;

            out += `<a class="effect" href="#">`;
            out += `<div class="areaName">`;
            out += `<span>${name}</span>`;
            out += `</div>`;
            out += `</a>`;

            out += `<div class="areaPrice-and-button">`;

            out += `<div class="areaPrice">`;
            // учет скидки
            if (discount < 1) {
                out += `<span class="full-price">${price} UAH</span><br>`;
                out += `<span class="discount-price">${Math.ceil(price * discount)} UAH</span>`;
            } else {
                out += `<span>${price} UAH</span>`;
            }

            out += `</div>`; // areaPrice

            // out += `<a href="#">`;
            // out += `<div class="cart-button">`;
            out += `<button class="cart-button" ><img class="to-cart bay" data-articul="${art}" src="./Styles/img/bay.png" alt="Bay"></button>`;
            // out += `</div>`; //cart-button
            // out += `</a>`;
            out += `</div>`;  // areaPrice-and-button

            out += `</div>`; // conteiner
            return out;
        }

        
        // Label "NEW"
        const cardLabelNew = function () {
            let out = '';
            out += `<div class="conteiner-blue">`;
            out += `<img class="img-label-blue" src="./Styles/img/labelBlue.png" alt="Label Blue">`;
            out += `<img class="img-label-blue" src="./Styles/img/labelAddBlue.png" alt="Label Add Blue">`;
            out += `<img class="img-label-point-blue-right" src="./Styles/img/pointBlueRight.png"
                                        alt="Point Blue Right">`;
            out += `<img class="img-label-point-blue-left" src="./Styles/img/pointBlueLeft.png" alt="Point Blue Left"></img>`;
            return out;
        }
        // Label 'SALE'
        const cardLabelSale = function () {
            let out = '';
            out += `<div class="conteiner-green">`;
            out += `<img class="img-label-green" src="./Styles/img/labelGreen.png" alt="Label Green">`;
            out += `<img class="img-label-green" src="./Styles/img/labelAddGreen.png" alt="Label Add Green">`;
            out += `<img class="img-label-point-green-right" src="./Styles/img/pointGreenRight.png"
                alt="Point Green Right">`;
            out += `<img class="img-label-point-green-left" src="./Styles/img/pointGreenLeft.png"
                alt="Point Green Left">`;
            return out;
        }

        // вывод заголовков  и соответствующих товаров

        document.querySelector(this.element).innerHTML = ''; // очищаем вывод

        for (let i = 0; i < this.headers.length; i++) {
            // вывод заголовков

            let header = document.createElement('p');
            header.textContent = this.headers[i];
            this.headerClass.forEach(cssClass => {
                header.classList.add(cssClass);
            });
            document.querySelector(this.element).append(header);

            // вывод товаров
            let producstBlock = document.createElement('div');
            producstBlock.classList.add('product');
            document.querySelector(this.element).append(producstBlock);

            let out = '';

            // Новые товары
            if (this.headers[i] == 'new goods') {
                for (let key in this.data) {
                    if (this.data[key]['tags'].includes('new')) {
                        out += cardLabelNew();
                        out += card(this.data[key]['image'], this.data[key]['name'], this.data[key]['price'], this.data[key]['sale'], key);
                    }
                }
            }

            // Товары по распродаже
            if (this.headers[i] == 'sale') {
                for (let key in this.data) {
                    if (this.data[key]['sale'] < 1) {
                        out += cardLabelSale();
                        out += card(this.data[key]['image'], this.data[key]['name'], this.data[key]['price'], this.data[key]['sale'], key);
                    }
                }
            }

            // Популярные товары
            if (this.headers[i] == 'featured products') {
                for (let key in this.data) {
                    if (this.data[key]['tags'].includes('popular') &&
                        this.data[key]['sale'] < 1) {
                        out += cardLabelSale();
                        out += card(this.data[key]['image'], this.data[key]['name'], this.data[key]['price'], this.data[key]['sale'], key);
                    } else
                        if (this.data[key]['tags'].includes('popular') &&
                            this.data[key]['tags'].includes('new')) {
                            out += cardLabelNew();
                            out += card(this.data[key]['image'], this.data[key]['name'], this.data[key]['price'], this.data[key]['sale'], key);
                        }
                        else
                            if (this.data[key]['tags'].includes('popular') &&
                                this.data[key]['sale'] == 1) {
                                out += `<div class="conteiner">`;
                                out += card(this.data[key]['image'], this.data[key]['name'], this.data[key]['price'], this.data[key]['sale'], key);
                            }
                }
            }

            // для женщин
            if (this.headers[i] == 'for women') {
                for (let key in this.data) {
                    if (this.data[key]['category'].includes('for women') &&
                        this.data[key]['tags'].includes('new')) {
                        out += cardLabelNew();
                        out += card(this.data[key]['image'], this.data[key]['name'], this.data[key]['price'], this.data[key]['sale'], key);
                    } else
                        if (this.data[key]['category'].includes('for women') &&
                            this.data[key]['sale'] < 1) {
                            out += cardLabelSale();
                            out += card(this.data[key]['image'], this.data[key]['name'], this.data[key]['price'], this.data[key]['sale']);
                        } else
                            if (this.data[key]['category'].includes('for women') &&
                                this.data[key]['sale'] == 1 &&
                                !this.data[key]['tags'].includes('new')) {
                                out += `<div class="conteiner">`;
                                out += card(this.data[key]['image'], this.data[key]['name'], this.data[key]['price'], this.data[key]['sale'], key);
                            };
                }
            }

            // Для мужчин 2
            if (this.headers[i] == 'for men') {
                for (let key in this.data) {
                    if (this.data[key]['category'].includes('for men') &&
                        this.data[key]['tags'].includes('new')) {
                        out += cardLabelNew();
                        out += card(this.data[key]['image'], this.data[key]['name'], this.data[key]['price'], this.data[key]['sale'], key);
                    }
                    else
                        if (this.data[key]['category'].includes('for men') &&
                            this.data[key]['sale'] < 1) {
                            out += cardLabelSale();
                            out += card(this.data[key]['image'], this.data[key]['name'], this.data[key]['price'], this.data[key]['sale'], key);
                        }
                        else
                            if (this.data[key]['category'].includes('for men') &&
                                this.data[key]['sale'] == 1 &&
                                !this.data[key]['tags'].includes('new')) {
                                out += `<div class="conteiner">`;
                                out += card(this.data[key]['image'], this.data[key]['name'], this.data[key]['price'], this.data[key]['sale'], key);
                            };
                }
            }


            producstBlock.innerHTML = out;
        }
    }

}