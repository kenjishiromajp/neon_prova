import "./scss/style.scss";
import { qs, qsa } from "./Helper";
import Slider from "./components/Slider";
import TypeAnimation from "./components/TypeAnimation";

var slider = new Slider(qs(".slider"));
slider.init();

var bannerTexts = qsa(".banner-text h2 > *");
// Iterando pelos textos para fazer uma animação em cascata
for (var i = 0; i < bannerTexts.length; i++) {
    var el = bannerTexts[i];
    var typeAnimate = new TypeAnimation(el);
    typeAnimate.hide();
    typeAnimate.animate(1000,800+(i*1700));
}
