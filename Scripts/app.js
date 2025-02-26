const navBtn = document.querySelector(".menu-btn")
const navMenu = document.querySelector(".menu")
const objectItem = document.querySelectorAll('.object__item')
const pollbtn = document.querySelectorAll('.form__submit')
const menuItems = document.querySelectorAll('.menu__item')
const sections = document.querySelectorAll("body > section")


let navOpen = false;
navBtn.addEventListener("click", function () {
    if (navOpen) {
        navBtn.classList.remove("menu-btn--active")
        navMenu.classList.remove("menu--show")
        navOpen = false
    } else {
        navBtn.classList.add("menu-btn--active")
        navMenu.classList.add("menu--show")
        navOpen = true
    }
})

function navigationTabsInit(listItems, listItemActiveClass, contentItemShowClass) {
    listItems.forEach(listItem => {
        listItem.addEventListener('click', function () {
            removeActiveClass(listItemActiveClass)
            removeActiveClass(contentItemShowClass)
            this.classList.add(listItemActiveClass)
            let contentId = this.getAttribute('data-content-id')
            document.querySelector(contentId).classList.add(contentItemShowClass)
        })
    })
}
function removeActiveClass(className){
    document.querySelector(`.${className}`).classList.remove(className)
}

navigationTabsInit(objectItem,'object__item--active','panels__item--show')
navigationTabsInit(pollbtn,'form__submit','pollstar__content--show')

const observer = new IntersectionObserver(observerHandler,{threshold: 0.3});
function observerHandler(allSections) {
    allSections.map(section => {
        let sectionClassName = section.target.className
        let sectionMenuItem = document.querySelector(`.menu__item[data-section=${sectionClassName}]`)
        if (section.isIntersecting){
            sectionMenuItem.classList.add("menu__item--active")
        } else {
            sectionMenuItem.classList.remove("menu__item--active")
        }
    })
}

sections.forEach(section => {
    observer.observe(section)
})
menuItems.forEach(item => {
    item.addEventListener("click",function (e){
        e.preventDefault()
        removeActiveClass('menu__item--active')
        item.classList.add("menu__item--active")

        let sectionClass = item.getAttribute("data-section")
        let sectionOffsetTop = document.querySelector(`.${sectionClass}`).offsetTop

        window.scrollTo({
            top: sectionOffsetTop - 85,
            behavior : "smooth"
        })

    })
})