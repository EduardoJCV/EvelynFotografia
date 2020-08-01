function verMas(el){
    document.querySelector(`#${el}`).classList.add('card-activada');
}

function verMenos(el){
    document.querySelector(`#${el}`).classList.remove('card-activada');
}

var elems = document.querySelectorAll('.carousel');
var instances = M.Carousel.init(elems);