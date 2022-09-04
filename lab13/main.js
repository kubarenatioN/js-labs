const cards = document.querySelectorAll('.card')

cards.forEach(c => {
    const item = c.querySelector('.card-item')
    c.addEventListener('mousemove', (e) => {
        rotateCard(item, e)
    })
    c.addEventListener('mouseleave', (e) => {
        resetCard(item)
    })
})

function rotateCard(item, e) {
    const halfHeight = item.offsetHeight / 2
    const halfWidth = item.offsetWidth / 2
    item.style.transform = `
        rotateX(${-(e.offsetY - halfHeight)/5}deg) 
        rotateY(${(e.offsetX - halfWidth)/5}deg)`
}

function resetCard(item) {
    item.style.transform = `rotate(0deg)`
}