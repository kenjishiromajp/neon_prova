export default class TypeAnimation{
    constructor(el){
        this.el = el;
        this.text = this.el.innerText;
    }
    animate(milliseconds,delay = 0){
        setTimeout(_=>{
            this.loop(milliseconds);
        },delay);
    }
    hide(){
        this.el.innerText = "";
    }
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
    type(percentage){
        var numberChars = this.text.length * Math.pow(percentage,1.1);
        var newText = this.text.substr(0,numberChars);
        this.el.innerText = newText;
    }
}