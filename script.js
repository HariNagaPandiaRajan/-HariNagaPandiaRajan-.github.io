let header = document.querySelector("header");
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

menu.onclick = () => {
  navbar.classList.toggle("active");
};
window.onscroll = () => {
  navbar.classList.remove("active");
};

// Dark Mode / light mode
let darkmode = document.querySelector("#darkmode");

darkmode.onclick = () => {
  if (darkmode.classList.contains("bx-moon")) {
    darkmode.classList.replace("bx-moon", "bx-sun");   
    document.body.classList.add("active");
  } else {
    darkmode.classList.replace("bx-sun", "bx-moon");
    document.body.classList.remove("active");
  }
};

var img = document.getElementById('img');

var slides = ['images/htnlcss.jpg','images/mysql.jpg','images/figma.jpeg','images/uiux.jpg',' images/IMG_20230129_194345_134.png'];

var Start=0;
function slider(){
    if(Start<slides.length){
        Start=Start+1;
    }
    else{
        Start=1;
    }
    console.log(img);
    img.innerHTML = "<img src="+slides[Start-1]+">";
   
}
setInterval(slider,2000);


$(window).on("load",function() {
    $(window).scroll(function() {
      var windowBottom = $(this).scrollTop() + $(this).innerHeight();
      $(".fade").each(function() {
        /* Check the location of each desired element */
        var objectBottom = $(this).offset().top + $(this).outerHeight();
        
        /* If the element is completely within bounds of the window, fade it in */
        if (objectBottom < windowBottom) { //object comes into view (scrolling down)
          if ($(this).css("opacity")==0) {$(this).fadeTo(200,1);}
        } else { //object goes out of view (scrolling up)
          if ($(this).css("opacity")==1) {$(this).fadeTo(200,0);}
        }
      });
    }).scroll(); //invoke scroll-handler on page-load
  });

  const boxes = document.querySelectorAll('.percent')

window.addEventListener('scroll', checkBoxes)

checkBoxes()

function checkBoxes() {
    const triggerBottom = window.innerHeight / 5 * 4

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top

        if(boxTop < triggerBottom) {
            box.classList.add('show')
        } else {
            box.classList.remove('show')
        }
    })
}
                                    
// web router
$(document).ready(function() {
  $('#buttonProject1').click(function() {
      loadProject('project1.html');
  });

  $('#buttonProject2').click(function() {
      loadProject('project2.html');
  });

  $('#buttonProject3').click(function() {
      loadProject('project3.html');
  });
});

function loadProject(url) {
  $('#projectContainer').load(url);
}


// callender 

const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
buttons.forEach((item) => {
item.onclick = () => {
    if (item.id == 'clear') {
        display.innerText = '';
    } else if (item.id == 'backspace') {
        let string = display.innerText.toString();
        display.innerText = string.substr(0, string.length - 1);
    } else if (display.innerText != '' && item.id == 'equal') {
        display.innerText = eval(display.innerText);
    } else if (display.innerText == '' && item.id == 'equal') {
        display.innerText = 'Empty!';
        setTimeout(() => (display.innerText = ''), 2000);
    } else {
        display.innerText += item.id;
    }
}
})
const themeToggleBtn = document.querySelector('.theme-toggler');
const calculator = document.querySelector('.dark');
const toggleIcon = document.querySelector('.toggler-icon');
let isDark = true;
themeToggleBtn.onclick = () => {
calculator.classList.toggle('dark');
themeToggleBtn.classList.toggle('active');
isDark = !isDark;
}



// clock
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function(event) {
    event.preventDefault();
  });
});



// message

// document.addEventListener("DOMContentLoaded", function () {
//   const imageContainers = document.querySelectorAll(".me1hover");

//   imageContainers.forEach((container) => {
//     container.addEventListener("touchstart", function () {
//       const colorChange = this.querySelector(".me");
//       colorChange.style.filter = "grayscale(0%)";
//     });

//     container.addEventListener("touchend", function () {
//       const colorChange = this.querySelector(".me");
//       colorChange.style.filter = "grayscale(100%)";
//     });
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const imageContainers = document.querySelectorAll(".me1hover");

//   const observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//       const colorChange = entry.target.querySelector(".me");
//       if (entry.isIntersecting) {
//         colorChange.style.filter = "grayscale(0%)";
//       } else {
//         colorChange.style.filter = "grayscale(100%)";
//       }
//     });
//   });

//   imageContainers.forEach(container => {
//     observer.observe(container);
//   });
// });
document.addEventListener("DOMContentLoaded", function() {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");

  const slideMessage = document.createElement("div");
  slideMessage.classList.add("slide-message");
  slideMessage.textContent = "Tap the image";
  messageContainer.appendChild(slideMessage);

  document.body.appendChild(messageContainer);

  setTimeout(function() {
    messageContainer.style.display = "block";
    setTimeout(function() {
      messageContainer.style.top = "-50px";
      setTimeout(function() {
        messageContainer.style.display = "none";
      }, 500);
    }, 500); 
  }, 1000); // Slide in after 1 second
});







