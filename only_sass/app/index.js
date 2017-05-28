const qs = q=>document.querySelector(q);
const qsa = q=>document.querySelectorAll(q);

/**
* Classe responsável pelo Slider
* @class Slider
*/
class Slider{
    /**
    * @param {Element} elSlider elemento do slider
    */
    constructor(elSlider){
        this.el = elSlider;
        this.slides = elSlider.querySelectorAll(".slide");
        this._prepareSlidesHTML();
        this.activeSlide = {
            el: this.slides[0],
            index: 0
        };
        this.leftButton = this.el.querySelector(".-button-left");
        this.rightButton = this.el.querySelector(".-button-right");
    }
    /**
    * Inicializao nosso Slider
    * @method init
    * @return {undefined}
    */
    init(){
        this.bindHandles();
    }
    /**
    * Adiciona os Eventos nos componentes do slider
    * @method bindHandles
    * @return {undefined}
    */
    bindHandles(){
        this.leftButton.addEventListener("click",this.previousSlide.bind(this));
        this.rightButton.addEventListener("click",this.nextSlide.bind(this));
    }
    /**
    * Prepara o HTML do slider com as classes e atributos adequados
    * @method _prepareSlidesHTML
    * @return {undefined}
    */
    _prepareSlidesHTML(){
        for (var i = 0; i < this.slides.length; i++) {
            var slide = this.slides[i];
            slide.setAttribute("aria-hidden",i!=0);
        }
        this.slides[0].classList.add("active");
    }
    /**
    * Remove as classes de Animações adicionados anteriormente
    * @method _removeAnimateClasses
    * @return {undefined}
    */
    _removeAnimateClasses(){
        for (var i = 0; i < this.slides.length; i++) {
            var slide = this.slides[i];
            slide.classList.remove("fade-in-left","fade-in-right","fade-out-left","fade-out-right");
        }
    }
    /**
    * Move o Slider para o slide anterior
    * @method previousSlide
    * @return {undefined}
    */
    previousSlide(ev){
        this._changeSlide("left");
        ev.preventDefault();
    }
    /**
    * Move o Slider para a direção recebida no parametro
    * @method _changeSlide
    * @param {String} direction mostra a direção do slider "left" ou "right"
    * @return {undefined}
    */
    _changeSlide(direction){
        this._removeAnimateClasses();
        var prevSlide = this.activeSlide.el;
        var directionClass = (direction == "right") ? "left": "right";
        var increment = (direction == "right")? 1: -1;
        prevSlide.setAttribute("aria-hidden",true);
        prevSlide.classList.add("fade-out-"+directionClass);
        prevSlide.classList.remove("active");
        
        this.activeSlide.index += increment;
        if(this.activeSlide.index < 0)
            this.activeSlide.index = this.slides.length-1;

        if(this.activeSlide.index >= this.slides.length)
            this.activeSlide.index = 0;

        this.activeSlide.el = this.slides[this.activeSlide.index];
        this.activeSlide.el.classList.add("active","fade-in-"+directionClass);
    }
    /**
    * Move o Slider para o próximo slide
    * @method nextSlide
    * @return {undefined}
    */
    nextSlide(ev){
        this._changeSlide("right");
        ev.preventDefault();
    }
};

/**
* Classe responsável pela animação de digitação
* @class TypeAnimation
*/
class TypeAnimation{
    /**
    * @param {Element} el Elemento em que irá sofrer a animação
    */
    constructor(el){
        this.el = el;
        this.text = this.el.innerText;
    }
    /**
    * Inicializa a animação de digitação
    * @method animate
    * @param {Integer} milliseconds valor em millisegundos da duração da animação
    * @param {Integer} delay valor em millisegundos do intervalo para começar a animação
    * @return {undefined}
    */
    animate(milliseconds,delay = 0){
        setTimeout(_=>{
            this.loop(milliseconds);
        },delay);
    }
    /**
    * Esconde o texto que está dentro do this.el
    * @method hide
    * @return {undefined}
    */
    hide(){
        this.el.innerText = "";
    }
    /**
    * Inicializa o loop para animação
    * @method animate
    * @param {Integer} millisecondsOfAnimation Valor em millisegundos da duração da animação
    * @return {undefined}
    */
    loop(millisecondsOfAnimation){
        var startTime = new Date();
        var go = _=>{
            requestAnimationFrame( _ =>{
                let millisecondsPassed = new Date() - startTime;
                if(millisecondsPassed < millisecondsOfAnimation)
                    go();
                let percentage = millisecondsPassed/millisecondsOfAnimation;
                percentage = (percentage > 1)? 1 : percentage;
                this.type(percentage);
            });
        }
        go();
    }
    /**
    * Mostra o texto de acordo com a porcentagem passada no parâmetro
    * @method animate
    * @param {float} percentage Porcentagem de conclusão da animação sendo 1=100%
    * @return {undefined}
    */
    type(percentage){
        var numberChars = this.text.length * Math.pow(percentage,1.1);
        var newText = this.text.substr(0,numberChars);
        this.el.innerText = newText;
    }
}


var slider = new Slider(qs(".slider"));
slider.init();
// Iterando pelos textos para fazer uma animação em cascata
var bannerTexts = qsa(".banner-text h2 > *");
for (var i = 0; i < bannerTexts.length; i++) {
    var el = bannerTexts[i];
    var typeAnimate = new TypeAnimation(el);
    typeAnimate.hide();
    typeAnimate.animate(1000,800+(i*1700));
}
