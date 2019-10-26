import "./scss/style.scss";
import { qs, qsa } from "./Helper";
import Slider from "./components/Slider";
import TypeAnimation from "./components/TypeAnimation";

const slider = new Slider(qs(".slider"));
slider.init();

const bannerTexts = qsa(".banner-text h2 > *");
// Iterando pelos textos para fazer uma animação em cascata
for (let i = 0; i < bannerTexts.length; i++) {
  let el = bannerTexts[i];
  let typeAnimate = new TypeAnimation(el);
  typeAnimate.hide();
  typeAnimate.animate(1000, 800 + i * 1700);
}
