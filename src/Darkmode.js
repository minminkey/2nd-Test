
const darkmodeBtn = document.querySelector("button");

function userTheme(toggle = false) {
    const osMode = !!window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
    let userMode = localStorage.userThemeMode || osMode;
    if(toggle) {
     switch(userMode) {
      case 'light':
       userMode = 'dark'; break;
      case 'dark':
       userMode = 'light'; break;
     }
     localStorage.userThemeMode = userMode;
    }
    else{
      userMode = osMode;
    }
    console.log(`current mode : ${userMode}`);
    window.__THEME_MODE = userMode === 'auto' ? osMode : userMode;
    document.getElementsByTagName('html')[0].classList[window.__THEME_MODE === 'dark' ? 'add' : 'remove']('darkmode');
  }
  if (!!window.matchMedia) {
   ['light', 'dark'].forEach(mode => {
    window.matchMedia(`(prefers-color-scheme: ${mode})`).addListener((e) => {
      if (!!e.matches) {
        userTheme();
      }
    });  
   });
  }
  function init(){
    console.log(darkmodeBtn);
    userTheme(false);
    darkmodeBtn.addEventListener('click', function (){userTheme(true)});
  }

  init();