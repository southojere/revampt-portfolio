const menuButton = document.querySelector('.menuButton');
const menu = document.querySelector('.menu');
const menuBranding = document.querySelector('.menu-branding');
const menuNav = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.nav-item');

const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.item');

menuButton.addEventListener('click', handleMenuClick);

let menuOpen = false;
let currentFilter = "all"; // for filtering projects

function handleMenuClick() {
    menuOpen = !menuOpen;
    if (menuOpen) {
        menuButton.classList.add('close');
        menu.classList.add('showing')
        menuBranding.classList.add('showing')
        menuNav.classList.add('showing')
        navItems.forEach(e => e.classList.add('showing'));
        menuOpen = true;
    }
    else {
        menuButton.classList.remove('close');
        menu.classList.remove('showing')
        menuBranding.classList.remove('showing')
        menuNav.classList.remove('showing')
        navItems.forEach(e => e.classList.remove('showing'));
    }

}

// smooth scroll code

navItems.forEach(item => item.addEventListener('click', handleNavItemClick));

function handleNavItemClick() {
    let loc = this.innerText;
    if (loc === 'PROJECTS') {
        // Scroll to a certain element
        document.getElementById('work').scrollIntoView({
            behavior: 'smooth'
        });
    }
    else if (loc === 'ABOUT') {
        document.getElementById('about').scrollIntoView({
            behavior: 'smooth'
        });
    }
    handleMenuClick();
}


//Project filtering functionality

filters.forEach(filter => filter.addEventListener('click', handleProjectFilter))

function handleProjectFilter() {
    let filterPressed = this.innerText.toLowerCase().replace(/\s/g, '');
    if (currentFilter === filterPressed) return; //no differents dont do anything.
    currentFilter = filterPressed;

    //update current filter showing & deselect old.
    filters.forEach(f => {
        if (f.classList.contains('current')) {
            f.classList.remove('current');
        }
    });
    this.classList.add("current");

    //Update projects for pressed filter
    projects.forEach(p => {
        let filterTags = p.dataset.filter ? p.dataset.filter.split(" ") : undefined;
        // we want to only show these
        if (filterTags.includes(currentFilter)) {
            p.style.display = 'block';
        } else {
            p.style.display = 'none';
        }
    });
}


//Project Modal code

const nextBut = document.querySelector('.next');
const prevBut = document.querySelector('.prev');
const imageList = document.querySelector('.project-carousel-img').children;
nextBut.addEventListener('click', handleNext)
prevBut.addEventListener('click', handlePrev)

// changes to next image for this project
function handleNext() {

    for (let i = 0; i < imageList.length; i++) {

        let img = imageList[i];
        let nextImg = imageList[i + 1];
        if (img.classList.contains('showing') && i === imageList.length - 1) {
            img.classList.remove('showing');
            img.classList.add('hide');
            imageList[0].classList.add('showing')
            imageList[0].classList.remove('hide')
            return;
        }
        else if (img.classList.contains('showing')) {
            // remove this one from being shown
            img.classList.remove('showing');
            img.classList.add('hide');
            nextImg.classList.add('showing')
            nextImg.classList.remove('hide')
            return;
        }

    }
}

function handlePrev() {
    for (let i = imageList.length - 1; i >= 0; i--) {
        let img = imageList[i];
        let prevImg = imageList[i - 1];
        //if we need to go previous from the first element
        if (i === 0 && img.classList.contains('showing')) {
            img.classList.remove('showing');
            img.classList.add('hide');
            imageList[imageList.length - 1].classList.add('showing')
            imageList[imageList.length - 1].classList.remove('hide')
            console.log('test2', imageList[imageList.length - 1])
        }
        else if (img.classList.contains('showing')) {
            img.classList.remove('showing');
            img.classList.add('hide');
            console.log(prevImg)
            prevImg.classList.add('showing');
            prevImg.classList.remove('hide');
            return;
        }
    }
}

// code responsible for triggering the pop up

document.querySelectorAll('.thumbnail').forEach(tbnail => {
    tbnail.addEventListener('click',handleOpeningModal);
})

function handleOpeningModal() {
    console.log(typeof this.parentElement.childNodes)
    let modals = document.getElementsByClassName('modal');
    let projectSelected = this.dataset.name;
    //find selected projects modal and show it.

    modals = modals.forEach(e => {
        if(e.dataset.name === projectSelected) {
            e.style.display = "block";
        }
    })

    console.log()
}