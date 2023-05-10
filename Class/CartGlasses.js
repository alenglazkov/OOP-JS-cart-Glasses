class CartGlasses {
    constructor(
        items, // массив с товарами в корзине
        cartClass = "cart",
        plusClass = 'plus',
        minusClass = 'minus',
        deleteClass = 'delete',
        currency = '',
    ) {
        this.items = items;
        this.plusClass = plusClass;
        this.minusClass = minusClass;
        this.deleteClass = deleteClass;
        this.cartClass = cartClass;
        this.currency = 'UAH'
    }

   
    emptyInCartOut(out) { // проверка на пустую корзину и вывод сообщений

        //для мини-корзины
        if (out === '.widget_shopping_cart') {
            if (this.render() === undefined) {
                document.querySelector(out).innerHTML = ''; // очищаю вывод
                let emptyMessage = document.querySelector(out);
                let emptyHead = document.createElement('p');
                emptyHead.classList.add('empty-head');
                emptyHead.style.fontSize = '1.1em';
                emptyHead.textContent = 'Your cart is currently empty.'
                emptyMessage.append(emptyHead);

                let buttonDiv = document.createElement('div');
                buttonDiv.classList.add('button-div');
                let button = document.createElement('button');
                button.classList.add('button-cart');
                button.innerHTML = "Back to shop";
                buttonDiv.append(button);
                emptyMessage.append(buttonDiv);
            }
        }

        // для корзины
        if (out === '.cart-out') {
            if (this.render() === undefined) {
                document.querySelector('.cart-out').innerHTML = ''; // очищаю вывод
                let emptyMessage = document.querySelector('.for-empty');
                let emptyHead = document.createElement('p');
                emptyHead.classList.add('empty-head');
                emptyHead.textContent = 'Your cart is currently empty.'
                emptyMessage.append(emptyHead);

                let areaText = document.createElement('div');
                areaText.classList.add('empty-text');

                let text1 = document.createElement('p');
                text1.innerHTML = `Please add items to your shopping cart before proceeding to checkout.`;
                areaText.append(text1);

                let text2 = document.createElement('p');
                text2.innerHTML = 'On the "Shop" page you will find many interesting products.';
                areaText.append(text2);

                emptyMessage.append(areaText);

                let buttonDiv = document.createElement('div');
                buttonDiv.classList.add('button-div');
                let button = document.createElement('button');
                button.classList.add('button-cart');
                button.innerHTML = "Back to shop";
                buttonDiv.append(button);
                emptyMessage.append(buttonDiv);
            }
        }
    };

    goodsPlus(art) {
        this.items[art]['count']++;
    }
    goodsMinus(art) {
        if (this.items[art]['count'] - 1 == 0) {
            this.goodsDelete(art);
        }
        else {
            this.items[art]['count']--;
        }
    }
    goodsDelete(art) {
        delete this.items[art];
    }

    getQt() { // счетчик количества товара в корзине
        let countItem = document.querySelector('.count-item');
        let qt = 0;
        for (let key in this.items) {
            qt += this.items[key]['count'];
        }
        countItem.innerHTML = qt;
    }

    getTotal() {
        let total = 0;
        for (let key in this.items) {
            total += this.items[key]['count'] * (this.items[key]['price'] * this.items[key]['sale']);
        }
        return total;
    }

    getSaving() { // расчет сэкономленной суммы
        let total = 0;
        let saved = 0;
        for (let key in this.items) {
            total += this.items[key]['count'] * this.items[key]['price'];
        }
        saved = total - this.getTotal();
        return saved;
    }

    render() { // метод построения корзины
        let tableHeaders = [" ", " ", "product", "price", " ", "qt", " ", "sum"];
        let table = document.createElement('table'); // create table
        table.classList.add(this.cartClass); // add class from constructor
        let trHeader = document.createElement('tr');
        trHeader.classList.add('tableHeader');
        tableHeaders.forEach(elem => {
            let td = document.createElement('td');
            td.textContent = elem;
            trHeader.append(td);
        });
        table.append(trHeader);

        for (let key in this.items) {
            let goods = this.items[key];
            // делаем строку
            const tr = document.createElement('tr');
            // делаем кнопку удалить
            let td = document.createElement('td');
            let button = document.createElement('button');
            button.classList.add(this.deleteClass);
            button.classList.add('button-cart');
            button.innerHTML = "x";
            button.setAttribute('data-articul', key);
            td.append(button);
            tr.append(td);
            // делаем картинку
            td = document.createElement('td');
            let img = document.createElement('img');
            img.src = goods.image;
            td.append(img);
            tr.append(td);
            // // делаем название
            td = document.createElement('td');
            let p = document.createElement('p');
            p.style.textAlign = 'left';
            p.innerHTML = goods.name;
            td.append(p);
            tr.append(td);

            // делаем price
            td = document.createElement('td');

            if (goods.sale < 1) {
                td.classList.add('sale');
                let priceDel = document.createElement('del');
                priceDel.innerHTML = (goods.price).toLocaleString('ua') + ' ' + this.currency;
                td.append(priceDel);
                let ins = document.createElement('ins');
                let price = document.createElement('span');
                price.classList.add('span-cart');
                price.innerHTML = (Math.ceil(goods.price * goods.sale)).toLocaleString('ua') + ' ' + this.currency;
                ins.append(price);
                td.append(ins);
            } else {
                let price = document.createElement('span');
                price.classList.add('span-cart');
                price.innerHTML = (goods.price).toLocaleString('ua') + ' ' + this.currency;
                td.append(price);
            }

            tr.append(td);

            // делаем минус
            td = document.createElement('td');
            button = document.createElement('button');
            button.classList.add(this.minusClass);
            button.classList.add('button-cart');
            button.innerHTML = "-";
            button.setAttribute('data-articul', key);
            td.append(button);
            tr.append(td);

            // делаем количество
            td = document.createElement('td');
            let qt = document.createElement('input');
            qt.classList.add('input-qt');
            qt.setAttribute('type', 'number');
            qt.setAttribute('value', goods.count);
            // qt.innerHTML = goods.count;
            td.append(qt);
            tr.append(td);

            // делаем плюс
            td = document.createElement('td');
            button = document.createElement('button');
            button.classList.add(this.plusClass);
            button.classList.add('button-cart');
            button.innerHTML = "+";
            button.setAttribute('data-articul', key);
            td.append(button);
            tr.append(td);

            // делаем total
            td = document.createElement('td');
            td.style.textAlign = 'right';
            if (goods.sale < 1) {
                td.classList.add('sale');
                let priceDel = document.createElement('del');
                priceDel.innerHTML = (goods.count * goods.price).toLocaleString('ua') + ' ' + this.currency;
                td.append(priceDel);
                let ins = document.createElement('ins');
                let price = document.createElement('span');
                price.classList.add('span-cart');
                price.innerHTML = (Math.ceil(goods.count * goods.price * goods.sale)).toLocaleString('ua') + ' ' + this.currency;
                ins.append(price);
                td.append(ins);
            } else {
                let price = document.createElement('span');
                price.classList.add('span-cart');
                price.innerHTML = (goods.count * goods.price).toLocaleString('ua') + ' ' + this.currency;
                td.append(price);
            }
            tr.append(td);
            table.append(tr); //!!! add tr to table
        }

        // делаем saved
        if (this.getSaving() > 0) {
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            td.setAttribute('colspan', 7); // merge 7 td
            td.style.textAlign = 'right';
            td.innerHTML = '<span class="total">Saving: </span> ';
            tr.append(td);

            td = document.createElement('td');
            td.style.textAlign = 'right';
            td.innerHTML = `<span class="full-saving">${this.getSaving().toLocaleString('ua')} ${this.currency}</span>`;
            tr.append(td);
            table.append(tr);// to table  
        }

        // делаем full total
        if (this.getTotal() > 0) {

            let tr = document.createElement('tr');
            let td = document.createElement('td');
            td.setAttribute('colspan', 7); // merge 7 td
            td.style.textAlign = 'right';
            td.innerHTML = '<span class="total">Total: </span> ';
            tr.append(td);

            td = document.createElement('td');
            td.style.textAlign = 'right';
            td.innerHTML = `<span class="full-total">${(this.getTotal()).toLocaleString('ua')} ${this.currency}</span>`;
            tr.append(td);
            table.append(tr);// to table

            tr = document.createElement('tr');
            tr.style.border = 'none';
            td = document.createElement('td');
            td.setAttribute('colspan', 9); // merge 9 td
            td.style.border = 'none';

            let button = document.createElement('button');
            button.classList.add('button-cart');
            button.innerHTML = "Checkout";
            td.append(button);
            tr.append(td);
            table.append(tr);

            return table;
        }
    }

    getMiniCart() { // метод построения мини-корзины

        let shopping_cart_content = document.createElement('div');
        shopping_cart_content.classList.add('widget_shopping_cart_content');

        // start cart Body

        let cartBody = document.createElement('div');
        cartBody.classList.add('shopping-cart-widget-body');
        cartBody.classList.add('wd-scroll');

        let scrollContent = document.createElement('div');
        scrollContent.classList.add('wd-scroll-content');


        let table = document.createElement('table'); // create table
        table.classList.add(this.cartClass); // add class from constructor
        table.classList.add('cart-mini');


        for (let key in this.items) {
            let goods = this.items[key];
            // делаем строку
            const tr = document.createElement('tr');
            // делаем кнопку удалить
            let td = document.createElement('td');
            let button = document.createElement('button');
            button.classList.add(this.deleteClass);
            button.classList.add('button-cart-mini');
            button.innerHTML = "×";
            button.setAttribute('data-articul', key);
            td.append(button);
            tr.append(td);
            // делаем картинку
            td = document.createElement('td');
            let img = document.createElement('img');
            img.src = goods.image;
            td.append(img);
            tr.append(td);
            // // делаем название
            td = document.createElement('td');
            // let p = document.createElement('p');
            td.style.textAlign = 'left';
            td.innerHTML = goods.name;
            tr.append(td);

            let tr2 = document.createElement('tr');
            tr2.classList.add('cart-mini-qt-price');
            tr2.style.border = 'none';
            let td2 = document.createElement('td');
            td2.classList.add('sale-mini');

            let ins = document.createElement('ins');
            let qt = document.createElement('span');
            qt.style.color = '#656565';
            qt.innerHTML = goods.count + '<span class="multiply">×</span>';
            ins.append(qt);
            td2.append(ins);

            if (goods.sale < 1) {
                let priceDel = document.createElement('del');
                priceDel.innerHTML = `${(goods.price).toLocaleString('ua')} ${this.currency}`;
                td2.append(priceDel);
                ins = document.createElement('ins');
                let price = document.createElement('span');
                price.classList.add('span-cart');
                price.innerHTML = (Math.ceil(goods.price * goods.sale)).toLocaleString('ua') + ' ' + this.currency;
                ins.append(price);
                td2.append(ins);
            } else {
                let price = document.createElement('span');
                price.classList.add('span-cart');
                price.innerHTML = (goods.price).toLocaleString('ua') + ' ' + this.currency;
                td2.append(price);
            }
            tr2.append(td2);
            td.append(tr2);

            tr.append(td);

            table.append(tr); //!!! add tr to table
        }

        scrollContent.append(table);
        cartBody.append(scrollContent);
        shopping_cart_content.append(cartBody);
        // end cart Body


        // cart footer
        let cartFooter = document.createElement('div');
        cartFooter.classList.add('shopping-cart-widget-footer');

        // делаем saved
        if (this.getSaving() > 0) {
            let p = document.createElement('p');
            p.classList.add('cart-mini-total');
            p.innerHTML = '<span class="total">Saving: </span> ';
            let span = document.createElement('span');
            span.classList.add('full-saving');
            span.style.textAlign = 'left';
            span.innerHTML = `${this.getSaving().toLocaleString('ua')} ${this.currency}`;
            p.append(span);
            cartFooter.append(p);
        }

        // делаем full total
        if (this.getTotal() > 0) {

            let p = document.createElement('p');
            p.classList.add('cart-mini-total');
            p.innerHTML = '<span class="total">Total: </span>';
            let span = document.createElement('span');
            span.classList.add('full-total');
            span.style.textAlign = 'left';
            span.innerHTML = `${(this.getTotal()).toLocaleString('ua')} ${this.currency}`;
            p.append(span);
            cartFooter.append(p);

            // Кнопка Viev Cart
            p = document.createElement('p');
            let button = document.createElement('button');
            button.setAttribute('onclick', 'window.location.href="cart.html"');
            button.classList.add('button-cart');
            button.classList.add('cart-mini-button');
            button.classList.add('viev-cart');
            button.innerHTML = "Viev Cart";
            p.append(button);
            cartFooter.append(p);

            // Кнопка Checkout
            p = document.createElement('p');
            button = document.createElement('button');
            button.classList.add('button-cart');
            button.classList.add('cart-mini-button');
            button.style.background = 'rgba(125, 177, 34, 1)';
            button.style.color = 'white';
            button.innerHTML = "Checkout";
            p.append(button);
            cartFooter.append(p);

            shopping_cart_content.append(cartFooter);

            return shopping_cart_content;
        }
    }
}