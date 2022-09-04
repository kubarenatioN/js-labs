const ballEl = document.getElementById('ball')

class Ball {
    constructor(el) {
        this.el = el
        this.body = document.body
        this.init()
        this.setEvents()
        console.log(this)
        this.thrown = false
        this.duration = 500
    }

    init() {
        const bounding = this.el.getBoundingClientRect()
        this.width = this.el.width;
        this.height = this.el.height;
        this.startX = this.x = bounding.left + this.width / 2;
        this.startY = this.y = bounding.top + this.height / 2;
    }

    setEvents() {
        this.body.addEventListener('mousemove', (e) => this.onMouseMove(e))
        this.el.addEventListener('mousedown', (e) => this.onMouseDown(e))
        this.el.addEventListener('mouseup', (e) => this.onMouseUp(e))
        this.el.addEventListener('dbclick', (e) => this.onMouseUp(e))
    }

    onMouseMove(e) {
        if (this.canMove && !this.thrown) {
            this.onDrag(e)
        }
    }

    onMouseDown(e) {
        this.canMove = true
    }

    onMouseUp(e) {
        this.canMove = false
        this.throwBall()
    }

    onDrag(e) {
        this.updatePosition({ x: e.x, y: e.y })
    }

    updatePosition(pos) {
        this.x = pos.x
        this.y = pos.y > this.startY ? pos.y : this.startY
        this.el.style.left = `${this.x}px`
        this.el.style.top = `${this.y}px`
    }

    throwBall() {
        this.thrown = true
        this.animate(
            this.timing, 
            this.draw.bind(this), 
            this.duration, 
            this.disposeAnimation.bind(this)
        )
    }

    animate(timing, draw, duration, callback) {
        let start = performance.now()

        const animId = requestAnimationFrame(function animate(time) {
            // timeFraction goes from 0 to 1
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            // calculate the current animation state
            let progress = timing(timeFraction)

            draw(progress); // draw it

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            } else {
                callback(animId)
            }

        })
        return animId
    }

    draw(progress) {
        const deltaX = (this.x - this.startX) * 2
        const deltaY = (this.y - this.startY) * 2
        this.el.style.left = `${this.x - deltaX * progress}px`
        this.el.style.top = `${this.y - deltaY * progress}px`
    }

    timing(t) {
        return 1 - Math.pow((1 - t), 2);
    }

    disposeAnimation(animdId) {
        cancelAnimationFrame(animdId)
        // this.resetPosition()
        console.log('canceled');
    }

    resetPosition() {
        this.canMove = false
        this.thrown = false
        this.updatePosition({x: this.startX, y: this.startY})
    }
}

const ball = new Ball(ballEl)