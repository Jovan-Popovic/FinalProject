const menuBar = () => {
    const menuButton= document.querySelector('.menuButton');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu li');

    //Toggle Nav
    menuButton.addEventListener('click', () => {
        menu.classList.toggle('menu-active');

        //Animate Links
        menuLinks.forEach((link,index) => {
            if(link.style.animation){
                link.style.animation = '';
            }
            else{
                link.style.animation = `navLinksFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });
        //Menu Button Animation
        menuButton.classList.toggle('toggle');
    });
};

menuBar();