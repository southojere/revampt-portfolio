// const menuButton = document.querySelector('.menuButton');
const menu = document.querySelector('.menu');
const menuBranding = document.querySelector('.menu-branding');
const menuNav = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.nav-item');

const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.item');

setTimeout(()=> {
    navItems.forEach(item => item.classList.add('showing'))
},0.4)

let menuOpen = false;
let currentFilter = "all"; // for filtering projects


// smooth scroll code

navItems.forEach(item => item.addEventListener('click', handleNavItemClick));

function handleNavItemClick() {
    let loc = this.innerText;
    console.log(loc)
    if (loc === 'PROJECTS') {
        // Scroll to a certain element
        document.getElementById('work').scrollIntoView({
            behavior: 'smooth'
        });
    }
    else if (loc === 'CONTACT') {
        document.getElementById('about').scrollIntoView({
            behavior: 'smooth'
        });
    }
    else {
        //HOME
        document.getElementById('home').scrollIntoView({
            behavior: 'smooth'
        });
    }
    // handleMenuClick();
}


//Project filtering functionality

filters.forEach(filter => filter.addEventListener('click', handleProjectFilter))

function handleProjectFilter() {
    let filterPressed = this.innerText.toLowerCase().replace(/\s/g, '');
    if (currentFilter === filterPressed) return; //no differents dont do anything.
    currentFilter = filterPressed;
    console.log(filterPressed)
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



// code responsible for triggering the pop up
