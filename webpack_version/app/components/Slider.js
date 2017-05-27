export default class Slider{
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
    init(){
        this.bindHandles();
    }
    bindHandles(){
        this.leftButton.addEventListener("click",this.previousSlide.bind(this));
        this.rightButton.addEventListener("click",this.nextSlide.bind(this));
    }
    _prepareSlidesHTML(){
        for (var i = 0; i < this.slides.length; i++) {
            var slide = this.slides[i];
            slide.setAttribute("aria-hidden",i!=0);
        }
        this.slides[0].classList.add("active");
    }
    _removeAnimateClasses(){
        for (var i = 0; i < this.slides.length; i++) {
            var slide = this.slides[i];
            slide.classList.remove("fade-in-left","fade-in-right","fade-out-left","fade-out-right");
        }
    }
    previousSlide(ev){
        this._changeSlide("left");
        ev.preventDefault();
    }
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
    nextSlide(ev){
        this._changeSlide("right");
        ev.preventDefault();
    }
};