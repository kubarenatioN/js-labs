function idGenerator(start) {
    let i = 0
    return function() {
        return start + i++
    }
}
const createId = idGenerator(1000)
class Product {
    constructor({id, title, price, image}) {
        this.id = id
        this.title = title
        this.price = price
        this.image = image
        this.button = new Button()
        this.el = document.createElement('div')
        this.el.classList.add('product')
    }

    insert(root) {
        const title = document.createElement('h4')
        title.textContent = this.title
        const price = document.createElement('span')
        price.textContent = `$${this.price}`
        const img = document.createElement('img')
        img.src = this.image
        this.el.append(img, title, price, this.button.el)
        root.append(this.el)
    }
}

class Shop {
    constructor(container) {
        this.container = container
    }

    createNodes(data) {
        this.items = data.map((p, i) => {
            const item = new Product(p)
            if (i % 2 === 1) {
                item.el.style.backgroundColor = '#ededed'
            }
            return item
        })
    }

    setProducts(data) {
        this.data = data
        this.render()
    }

    addProducts(products) {
        this.data = [...this.data, ...products]
        this.render()
    }

    render() {
        this.clearView()
        this.createNodes(this.data)
        this.items.forEach(it => {
            it.insert(this.container)
        })
    }

    clearView() {
        this.container.innerHTML = ''
    }

    remove(id) {
        this.data = this.data.filter(p => p.id !== id)
        this.render()
    }

    setImage(id, newImage) {
        this.data.forEach(it => {
            if(it.id === id) {
                it.image = newImage
            }
        })
        this.render()
    }

    setTitle(id, newTitle) {
        this.data.forEach(it => {
            if(it.id === id) {
                it.title = newTitle
            }
        })
        this.render()
    }

    setPrice(id, newPrice) {
        this.data.forEach(it => {
            if(it.id === id) {
                it.price = newPrice
            }
        })
        this.render()
    }
}

class Button {
    constructor(text = 'Подарить') {
        this.text = text
        this.el = document.createElement('button')
        this.el.classList.add('button')
        this.el.textContent = this.text
    }

    setSize(w, h) {
        this.el.style.width = `${w}px`
        this.el.style.height = `${h}px`
    }

    setBackground(color) {
        this.el.style.backgroundColor = color
    }

    setText(text) {
        this.text = text
        this.el.textContent = text
    }

    destroy() {
        this.el.remove()
    }
}

const products = [
    {
        id: 1000,
        title: 'Macbook Pro',
        price: 2500,
        image: 'https://img.joomcdn.net/6219e40ee7ef727b4121820637441638b7dd817e_original.jpeg'
    },
    {
        id: 1001,
        title: 'Lenovo Ideapad',
        price: 960,
        image: 'https://www.google.com/search?q=%D0%B3%D0%B4%D0%B7&rlz=1C1GCEU_enBY980BY980&sxsrf=AOaemvItfn0x6Pj6EeNvCowFx_ZMesJs-Q:1637307091933&source=lnms&tbm=isch&sa=X&ved=2ahUKEwje2-ic9KP0AhW67rsIHR7LC8UQ_AUoAXoECAEQAw&biw=1920&bih=937&dpr=1#imgrc=mMKEY7T6z59mxM'
    },
    {
        id: 1002,
        title: 'HP Pavilion 13',
        price: 1050,
        image: 'https://www.google.com/search?q=bmw+i+430&rlz=1C1GCEU_enBY980BY980&sxsrf=AOaemvLMJt3Kp-nlA1-CSDL2GGEcPUX42w:1637306870483&tbm=isch&source=iu&ictx=1&fir=HOp7Qx0MD4d0IM%252CguvS6Q4NSAMXDM%252C_%253BRNkaeaKDqlZXdM%252C-clCVS5uz15brM%252C_%253B2YqMrifHktnhOM%252CWSKdMoHViALMxM%252C_%253BdN6R23XOPJmtUM%252CtcghyNEl4eqlzM%252C_%253BxmyZ3ORSabfTVM%252CPfYq56wlv2AFVM%252C_%253BjIp3j06muOwMTM%252CCUQPvFuys8fvjM%252C_%253B_Lb91p74O1OlyM%252Chvg0zP3xPmpwrM%252C_%253BABltP0flEtw5HM%252CED31gf81Lmg14M%252C_%253BQsl6eEkDt0XH9M%252C-JCtET90NU5euM%252C_%253BEJWCGI3UYe9_tM%252CoXA93CHfE6av1M%252C_%253B3YuTS5msKIr-5M%252C_sRREEL2IGXMRM%252C_%253BYmVYWOXtFBLKwM%252Chvg0zP3xPmpwrM%252C_&vet=1&usg=AI4_-kSIMWHAKmVxQILE-WIUZVUQxRZFeQ&sa=X&ved=2ahUKEwitzJyz86P0AhWlgv0HHcOcBqMQ9QF6BAghEAE&biw=1033&bih=927&dpr=1#imgrc=xmyZ3ORSabfTVM'
    },
]

const root = document.getElementById('app')

const shop = new Shop(root)
shop.setProducts(products)

// setTimeout(() => {
//     shop.addProducts([
//         {
//             id: 1003,
//             title: 'HP Pavilion 14',
//             price: 1560,
//             image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Ko1jyU_6OnbOfYamh-9rdtHe36i8e3ULSQ&usqp=CAU'
//         },
//         {
//             id: 1004,
//             title: 'HP Pavilion 15',
//             price: 1710,
//             image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Ko1jyU_6OnbOfYamh-9rdtHe36i8e3ULSQ&usqp=CAU'
//         },
//         {
//             id: 1005,
//             title: 'Lenovo Ideapad',
//             price: 960,
//             image: 'https://www.google.com/search?q=%D1%86%D0%B2%D0%B5%D1%82%D1%8B&rlz=1C1GCEU_enBY980BY980&sxsrf=AOaemvJwtU_emfZre7zkHE-anwGNp3vlDg:1637306794506&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiFlv-O86P0AhVf57sIHaNVCSQQ_AUoAXoECAIQAw&biw=1033&bih=927&dpr=1#imgrc=eQ0LMEHhAOMyPM'
//         },
//     ])
//     console.log(shop);
//     shop.remove(1002)
//     shop.setImage(1001, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp9z2-fWOm62rz5H54k2C5v7tGUF5hYHhwlQ&usqp=CAU')
//     shop.setPrice(1004, 123)
//     shop.setTitle(1004, 'New Laptop')
//     shop.items[3].button.setText('hello')
//     shop.items[3].button.setSize(120, 100)
//     shop.items[2].button.setBackground('#ee2020')
// }, 3000);
