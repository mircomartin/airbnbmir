
document.addEventListener("DOMContentLoaded", function () {

    const menu = document.querySelector('#navbar')
    const submenu = document.querySelector('#submenu')

    menu.addEventListener('click', () => {
        menu.classList.add('profileClick')
        submenu.classList.add('submenuShow')
    })

    submenu.addEventListener('click', () => {
        menu.classList.remove('profileClick')
        submenu.classList.remove('submenuShow')
    })
    

  });

