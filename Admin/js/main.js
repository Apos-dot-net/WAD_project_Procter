"use strict"
/* Aside: submenus toggle */
Array.from(document.getElementsByClassName('menu is-menu-main')).forEach(function (el) {
  Array.from(el.getElementsByClassName('has-dropdown-icon')).forEach(function (elA) {
    elA.addEventListener('click', function (e) {
      const dropdownIcon = e.currentTarget.getElementsByClassName('dropdown-icon')[0].getElementsByClassName('mdi')[0];
      e.currentTarget.parentNode.classList.toggle('is-active');
      dropdownIcon.classList.toggle('mdi-plus');
      dropdownIcon.classList.toggle('mdi-minus');
    });
  });
});
/* Aside Mobile toggle */

Array.from(document.getElementsByClassName('jb-aside-mobile-toggle')).forEach(function (el) {
  el.addEventListener('click', function (e) {
    const dropdownIcon = e.currentTarget.getElementsByClassName('icon')[0].getElementsByClassName('mdi')[0];
    document.documentElement.classList.toggle('has-aside-mobile-expanded');
    dropdownIcon.classList.toggle('mdi-forwardburger');
    dropdownIcon.classList.toggle('mdi-backburger');
  });
});
/* NavBar menu mobile toggle */

Array.from(document.getElementsByClassName('jb-navbar-menu-toggle')).forEach(function (el) {
  el.addEventListener('click', function (e) {
    const dropdownIcon = e.currentTarget.getElementsByClassName('icon')[0].getElementsByClassName('mdi')[0];
    document.getElementById(e.currentTarget.getAttribute('data-target')).classList.toggle('is-active');
    dropdownIcon.classList.toggle('mdi-dots-vertical');
    dropdownIcon.classList.toggle('mdi-close');
  });
});
/* Modal: open */

Array.from(document.getElementsByClassName('jb-modal')).forEach(function (el) {
  el.addEventListener('click', function (e) {
    const modalTarget = e.currentTarget.getAttribute('data-target');
    document.getElementById(modalTarget).classList.add('is-active');
    document.documentElement.classList.add('is-clipped');
  });
});
/* Modal: close */

Array.from(document.getElementsByClassName('jb-modal-close')).forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.currentTarget.closest('.modal').classList.remove('is-active');
    document.documentElement.classList.remove('is-clipped');
  });
});
/* Notification dismiss */

Array.from(document.getElementsByClassName('jb-notification-dismiss')).forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.currentTarget.closest('.notification').classList.add('is-hidden');
  });
});

Array.from(document.getElementsByClassName('field')).forEach(function (el) {
  const OthersRadio = el.getElementsByClassName('othersRadio');
  const OthersInput = el.getElementsByClassName('othersInput');
  OthersInput.disabled = !OthersRadio.checked;
  OthersInput.value = "";
  if (!OthersInput.disabled) {
    OthersInput.focus();
  }
});

/*Validation*/

function errorHelp(el, str = ""){
  const help = el.querySelector('.help')
  if(str) {
    help.innerHTML = str
    help.classList.remove('is-hidden');
  } else {
    help.classList.add('is-hidden');
  }
}

function validateOptions(name) {
  const runner= document.getElementsByName(name);

  for (let i = 0; i < runner.length; i++) {
    if (runner[i].checked) {
      return runner[i];
    }
  }
  return false;
}

const ping = (url, timeout = 6000) => {
  return new Promise((resolve, reject) => {
    const urlRule = new RegExp('(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]');
    if (!urlRule.test(url)) reject('invalid url');
    try {
      fetch(url)
        .then(() => resolve(true))
        .catch(() => resolve(false));
      setTimeout(() => {
        resolve(false);
      }, timeout);
    } catch (e) {
      reject(e);
    }
  });
};

// noinspection DuplicatedCode
Array.from(document.getElementsByTagName("form")).forEach(function(el) {
  el.addEventListener("submit",function(submit) {
      submit.preventDefault();
      let validity = true;
      const valid = new Promise((resolve) => {
        Array.from(el.getElementsByClassName("input"), async function(e) {
          if(e.classList.contains("is-danger-passive")){
            if(e.type === "text"){
              if(!e.value && !e.disabled){
                e.classList.add('is-danger');
                errorHelp(e.closest(".control"), 'This Field is Required');
                e.classList.add('apply-shake');
              }else if((e.value || e.disabled)){
                e.classList.remove('is-danger');
                errorHelp(e.closest(".control"));
                return e;
              }
              await e.addEventListener('animationend', function (){
                e.classList.remove('apply-shake');
                return false;
              })

            } else if(e.type === "radio"){
              let rValue = validateOptions(e.name);
              if(rValue){
                e.classList.remove("is-danger");
                errorHelp(e.closest(".control"));
                return rValue;
              } else if(!validateOptions(e.name)){
                e.classList.add("is-danger");
                e.closest(".field").classList.add("apply-shake");
                errorHelp(e.closest(".control"), 'Choose an Option');
              }
              await e.closest(".field").addEventListener('animationend', function (){
                e.closest(".field").classList.remove('apply-shake');
                return false;
              })

            } else if(e.type === "date"){
              if(!e.value){
                e.classList.add("is-danger");
                e.classList.add("apply-shake");
                errorHelp(e.closest(".control"), 'This Field is Required')
              }else if(e.value){
                e.classList.remove("is-danger");
                errorHelp(e.closest(".control"));
                return e;
              }
              await e.addEventListener('animationend', function (){
                e.classList.remove('apply-shake');
                return false;
              })

            } else if(e.type === "file"){
              if(!e.value){
                e.classList.add("is-danger");
                e.previousElementSibling.classList.add("is-danger");
                e.previousElementSibling.classList.add("apply-shake");
                errorHelp(e.closest(".field").parentElement, 'This Field is Required')
              }else if(e.value){
                e.classList.remove("is-danger");
                e.previousElementSibling.classList.remove("is-danger");
                errorHelp(e.closest(".field").parentElement);
                return e;
              }
              await e.previousElementSibling.addEventListener('animationend', function (){
                e.previousElementSibling.classList.remove('apply-shake');
                return false;
              })

            } else if(e.type === "number"){
              if(!e.value && !e.disabled){
                e.classList.add("is-danger");
                e.classList.add("apply-shake");
                errorHelp(e.closest(".control"), 'This Field is Required')
              }else if((e.value || e.disabled)){
                e.classList.remove("is-danger");
                errorHelp(e.closest(".control"));
                return e;
              }
              await e.addEventListener('animationend', function (){
                e.classList.remove('apply-shake');
                return false;
              })

            } else if(e.classList.contains("select")){
              if(!e.value){
                e.classList.add("is-danger");
                e.closest(".select").classList.add("is-danger");
                e.closest(".select").classList.add("apply-shake");
                errorHelp(e.closest(".control"), 'This Field is Required')
              }else if(e.value){
                e.classList.remove("is-danger");
                e.closest(".select").classList.remove("is-danger");
                errorHelp(e.closest(".control"));
                return e;
              }
              await e.closest(".select").addEventListener('animationend', function (){
                e.closest(".select").classList.remove('apply-shake');
                return false;
              })
            } else if(e.type === "email"){
              if(!e.value && !e.disabled){
                e.classList.add('is-danger');
                errorHelp(e.closest(".control"), 'This Field is Required');
                e.classList.add('apply-shake');
              }else if(e.value){
                console.log(e.value.substring(e.value.indexOf('@') + 1))
                e.classList.remove('is-danger');
                errorHelp(e.closest(".control"));
                return e;
              }
              await e.addEventListener('animationend', function (){
                e.classList.remove('apply-shake');
                return false;
              })
            }
          } else {
            return e;
          }
        }).forEach(async function (e, index, array){
          await e.then(result => {
            try {
              console.log(result.value);
            } catch (Error) {
              validity = false;
            }
          });
          if (index === array.length -1) resolve();
        })
      });

    valid.then(() => {
        console.log(validity);
        console.log(el.submitted)
      });
   }
  )
  el.addEventListener('reset', function (){
    Array.from(el.getElementsByClassName('is-danger')).forEach(function(e){
      if(e.classList.contains('help')){
        e.classList.add('is-hidden');
      } else {
        e.classList.remove('is-danger');
      }
    })
  })
});

