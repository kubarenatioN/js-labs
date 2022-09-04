const circle = document.querySelector('.progress-ring__circle')

const r = circle.r.baseVal.value
const C = 2 * Math.PI * r
console.log(r);

circle.style.strokeDasharray = `${C} ${C}`
circle.style.strokeDashoffset = `${C}`

function setProgress(p) {
    const offset = C - p / 100 * C
    circle.style.strokeDashoffset = offset
}

function animate({ timing, draw, duration }) {

    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // вычисление текущего состояния анимации
        let progress = timing(timeFraction);

        draw(progress * 100); // отрисовать её

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }

    });
}

animate({
    duration: 2000,
    timing(fraction) {
        return fraction
    },
    draw: setProgress
})