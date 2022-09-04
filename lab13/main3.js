function parallax(e) {
    const layers = this.querySelectorAll('.layer')
    layers.forEach(l => {
        const speed = l.dataset.speed
        l.style.transform = `translateX(${e.clientX/speed}px)`
    })
}

document.addEventListener('mousemove', parallax)