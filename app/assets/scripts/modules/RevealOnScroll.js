import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'


class RevealOnScroll {
    constructor(els, thresholdPercent) {
        this.thresholdPercent = thresholdPercent
        this.itemsToReveal = els
        this.browserHeight = window.innerHeight
        this.hideInitially()
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this)
        this.events()
    }

    events() {
        window.addEventListener("scroll", this.scrollThrottle)
        window.addEventListener("resize", debounce(() => {
            console.log ("resize funzia?")
            this.browserHeight = window.innerHeight
        }, 333))
    }

    calcCaller() {
        console.log("Scroll function ran")
            this.itemsToReveal.forEach(el => {
               if(el.isRevealed == false) {
                this.calculateIfScrolledTo(el)
               }
            })
    }

    calculateIfScrolledTo(el) {
      if(window.scrollY + this.browserHeight > el.offsetTop){
        console.log("element was calculeted")
        let scrollPercent = (el.getBoundingClientRect().y /this.browserHeight) * 100
        if(scrollPercent < this.thresholdPercent){
            el.classList.add("reveal-item--is-visible")
            el.isRevealed = true
            if(el.islastItem){
                window.removeEventListener("scroll", this.scrollThrottle)
            }
        }
      }
    }

    hideInitially() {
        this.itemsToReveal.forEach(el =>{
            el.classList.add("reveal-item")
            el.isRevealed = false
        })
        this.itemsToReveal[this.itemsToReveal.length - 1].islastItem = true
    }
}

export default RevealOnScroll;
