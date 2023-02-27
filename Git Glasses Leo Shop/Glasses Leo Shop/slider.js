
const slides = {
    '1': {
        'url': "./Styles/img/BannerGlass.png",
        'alt': "Banner Glasses 1",
        'text_1': "aluminium club",
        'text_2': "Experience Ray-Ban"
    },
    '2': {
        'url': './Styles/img/ray-ban_1400_jpg.png',
        'alt': 'Banner Glasses 2',
        'text_1': 'titanium club',
        'text_2': 'The best choice Ray-Ban'
    },
    '3': {
        'url': './Styles/img/ray-ban_1400_2_jpg.png',
        'alt': 'Banner Glasses 3',
        'text_1': 'cobalt club',
        'text_2': 'try on style Ray-Ban'
    },
}

const slider = document.querySelector('.slider');
// функция формирования слайдера
function showSlider() {
    let count = 0;
    for (let key in slides) {
        let picture = document.createElement('img');
        picture.classList.add('pic-img');
        picture.setAttribute('src', slides[key]['url']);
        picture.setAttribute('alt', slides[key]['alt'])
        slider.append(picture);

        let offsetLabel = 250; // отступ надписей слева в 'px'
        let label = document.createElement('div');
        label.classList.add(`'slide-label-${count}'`);//присвоение индивидуального класса для надписей
        offsetLabel += 1400 * count;
        label.style.left = offsetLabel + 'px';
        let span = document.createElement('span');
        span.textContent = slides[key]['text_1'];
        label.append(span);
        span = document.createElement('span');
        span.textContent = slides[key]['text_2'];
        label.append(span);
        slider.append(label);
        count++;
    }
}

showSlider();

// количество слайдов в объекте 'slides'
const countSlides = () => {
    let count = 0;
    for (let key in slides) {
        count++;
    }
    return count;
}
// console.log(countSlides());

// смещение вправо. 1400 ширина картинки, 250 - отступ для надписей слайда
let offset = 0;
offsetLabel = 250;
document.querySelector('.arrow-right').addEventListener('click', () => {
    offset += 1400;
    offsetLabel += 1400;
    if (offset >= 1400 * countSlides()) {
        offset = 0;
        offsetLabel = 250;
    }
    slider.style.left = -offset + 'px';
    // slider.style.transition = ;
});

// смещение влево
document.querySelector('.arrow-left').addEventListener('click', () => {
    offset -= 1400;
    offsetLabel -= 1400;
    if (offset < 0) {
        offset = 1400 * (countSlides()-1);
        offsetLabel = 250;
    }
    slider.style.left = -offset + 'px';
})