/**
 * Classe responsável pelo Slider
 * @class Slider
 */
export default class Slider {
  /**
   * @param {Element} elSlider elemento do slider
   */
  constructor(elSlider) {
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
  init() {
    this.bindHandles();
  }
  /**
   * Adiciona os Eventos nos componentes do slider
   * @method bindHandles
   * @return {undefined}
   */
  bindHandles() {
    this.leftButton.addEventListener("click", this.previousSlide.bind(this));
    this.rightButton.addEventListener("click", this.nextSlide.bind(this));
  }
  /**
   * Prepara o HTML do slider com as classes e atributos adequados
   * @method _prepareSlidesHTML
   * @return {undefined}
   */
  _prepareSlidesHTML() {
    for (let i = 0; i < this.slides.length; i++) {
      let slide = this.slides[i];
      slide.setAttribute("aria-hidden", i != 0);
    }
    this.slides[0].classList.add("active");
  }
  /**
   * Remove as classes de Animações adicionados anteriormente
   * @method _removeAnimateClasses
   * @return {undefined}
   */
  _removeAnimateClasses() {
    for (let i = 0; i < this.slides.length; i++) {
      let slide = this.slides[i];
      slide.classList.remove(
        "fade-in-left",
        "fade-in-right",
        "fade-out-left",
        "fade-out-right"
      );
    }
  }
  /**
   * Move o Slider para o slide anterior
   * @method previousSlide
   * @return {undefined}
   */
  previousSlide(ev) {
    this._changeSlide("left");
    ev.preventDefault();
  }
  /**
   * Move o Slider para a direção recebida no parametro
   * @method _changeSlide
   * @param {String} direction mostra a direção do slider "left" ou "right"
   * @return {undefined}
   */
  _changeSlide(direction) {
    this._removeAnimateClasses();
    const prevSlide = this.activeSlide.el;
    const directionClass = direction == "right" ? "left" : "right";
    const increment = direction == "right" ? 1 : -1;
    prevSlide.setAttribute("aria-hidden", true);
    prevSlide.classList.add("fade-out-" + directionClass);
    prevSlide.classList.remove("active");

    this.activeSlide.index += increment;
    if (this.activeSlide.index < 0)
      this.activeSlide.index = this.slides.length - 1;

    if (this.activeSlide.index >= this.slides.length)
      this.activeSlide.index = 0;

    this.activeSlide.el = this.slides[this.activeSlide.index];
    this.activeSlide.el.classList.add("active", "fade-in-" + directionClass);
  }
  /**
   * Move o Slider para o próximo slide
   * @method nextSlide
   * @return {undefined}
   */
  nextSlide(ev) {
    this._changeSlide("right");
    ev.preventDefault();
  }
}
