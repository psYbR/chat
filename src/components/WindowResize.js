//called every time the window is resized - dispatches the window size to the store so components can do things with it
const windowResize = () => {
    const widthRem = window.innerWidth / parseFloat(getComputedStyle(document.querySelector('html'))['font-size']);
    const heightRem = window.innerHeight / parseFloat(getComputedStyle(document.querySelector('html'))['font-size']);

    console.log("New width: " + widthRem + 'rem');
    console.log("New height: " + heightRem + 'rem');
};

window.onresize = windowResize;