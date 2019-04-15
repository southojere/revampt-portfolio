// const menuButton = document.querySelector('.menuButton');
const menu = document.querySelector('.menu');
const menuBranding = document.querySelector('.menu-branding');
const menuNav = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.nav-item');

const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.item');

setTimeout(() => {
    navItems.forEach(item => item.classList.add('showing'))
}, 0.4)

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

/**
 * Code for project modals.
 */
let imageIndex = 0;
let primaryModalImage; // image
let modalImages; // current modal showing
/**
 * function for reseting some of the variables used for the model.
 * called when a modal is opened. 
 * 
 * used for prev and next options for modal.
 */
function openModel(modelID) {
    modalImages = document.querySelectorAll("." + modelID + "_projectImage");
    imageIndex = 0;
    primaryModalImage = document.getElementById(`${modelID + '_main_img'}`)

}

/**
 * handles logic for pressing the previous image button in modal view
 * @param {string} modelID 
 */
function prevImage(modelID) {
    imageIndex--;
    if (imageIndex < 0) {
        imageIndex = modalImages.length - 1;
    }
    //unshow current showing
    removeShowingClass(modalImages);
    //update new showing image.
    modalImages[imageIndex].classList.add('showing');
}

function nextImage(modelID) {
    imageIndex++;
    if (imageIndex > modalImages.length - 1) {
        imageIndex = 0;
    }
    //unshow current showing
    removeShowingClass(modalImages);
    //update new showing image.
    modalImages[imageIndex].classList.add('showing');
}


/**
 * Helper function for removing the current showing modal image.
 * @param {NodeList of <img>} htmlImageList 
 */
const removeShowingClass = (htmlImageList) => {
    htmlImageList.forEach(img => {
        if (img.classList.contains('showing')) {
            img.classList.remove('showing');
        }
    })
}

/**
 * Called once a model X is pressed, will set visible to hidden;
 * @param {string} modelID 
 */
function closeModal() {
    console.log('close modal')
    const modalDiv = document.getElementById('modalContainer');
    modalDiv.style.visibility = 'hidden';
}


/**
 * One thumbnail is clicked, set modal to visible.
 * @param {string} modelID 
 */
function showModal(modelID) {
    openModel(modelID);
    const modalDiv = document.getElementById('modalContainer');
    modalDiv.style.visibility = 'visible';
    
}

function createModal(title, images) {

    const projectImages = images.split(',');
    let projImgs = document.createElement('div');
    for (let i = 0; i < projectImages.length; i++) {
        let img = projectImages[i];
        let htmlImage = document.createElement('img');
        // all project images will have their image, the project thats its associated with and 
        // a class of prj
        htmlImage.setAttribute('src', `../../dist/img/projects/${img}`)
        htmlImage.classList.add(`${title}_projectImage`);
        htmlImage.classList.add('prjImg');

        if (i === 0) {
            //first image is main
            htmlImage.classList.add('showing');
            htmlImage.id = `${title}_main_img`;
        }
        projImgs.appendChild(htmlImage)
    }

    console.log(projImgs.innerHTML)
    const modelContainer = document.getElementById('modalContainer');
    modelContainer.innerHTML =
        `
    <div class="light-modal-content animated slideInDown">
        <div class="light-modal-header">
            <h3 class="light-modal-heading">${title}</h3>
            <a class="light-modal-close-icon" onclick="closeModal()" aria-label="close">X</a>
        </div>
        ${projImgs.innerHTML}

        <div class="light-modal-navigation">
            <a onclick="prevImage('${title}')" class="light-modal-navigation navigation-prev"></a>
            <a onclick="nextImage('${title}')" class="light-modal-navigation navigation-next"></a>
        </div>
    </div>
`
    showModal(title)
    modelContainer.style.visibility = 'visible'

}