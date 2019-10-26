/**
 * Classe responsável pela animação de digitação
 * @class TypeAnimation
 */
export default class TypeAnimation {
  /**
   * @param {Element} el Elemento em que irá sofrer a animação
   */
  constructor(el) {
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
  animate(milliseconds, delay = 0) {
    setTimeout(_ => {
      this.loop(milliseconds);
    }, delay);
  }
  /**
   * Esconde o texto que está dentro do this.el
   * @method hide
   * @return {undefined}
   */
  hide() {
    this.el.innerText = "";
  }
  /**
   * Inicializa o loop para animação
   * @method animate
   * @param {Integer} millisecondsOfAnimation Valor em millisegundos da duração da animação
   * @return {undefined}
   */
  loop(millisecondsOfAnimation) {
    const startTime = new Date();
    const go = _ => {
      requestAnimationFrame(_ => {
        let millisecondsPassed = new Date() - startTime;
        if (millisecondsPassed < millisecondsOfAnimation) go();
        let percentage = millisecondsPassed / millisecondsOfAnimation;
        percentage = percentage > 1 ? 1 : percentage;
        this.type(percentage);
      });
    };
    go();
  }
  /**
   * Mostra o texto de acordo com a porcentagem passada no parâmetro
   * @method animate
   * @param {float} percentage Porcentagem de conclusão da animação sendo 1=100%
   * @return {undefined}
   */
  type(percentage) {
    const numberChars = this.text.length * Math.pow(percentage, 1.1);
    const newText = this.text.substr(0, numberChars);
    this.el.innerText = newText;
  }
}
