let hamIcon = document.querySelector('.navbar-toggler-btn');
var menuList = document.querySelector('.menuList');
var navTogglerBtn = document.querySelector('.navbar-toggler-btn');



hamIcon.addEventListener('click', () => {
    menuList.classList.toggle("active");
    navTogglerBtn.classList.toggle('active')

})


