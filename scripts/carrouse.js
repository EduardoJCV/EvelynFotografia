let data = [
    {
      bgColor: "#ff4757",
      info: "This is #ff4757",
    },
    {
      bgColor: "#2f3542",
      info: "This is #2f3542",
    },
    {
      bgColor: "#eccc68",
      info: "This is #eccc68",
    },
    {
      bgColor: "#2ed573",
      info: "This is #2ed573",
    },
  ];
  let carousel = document.querySelector(".carousel");
  let carouselContent = document.querySelector(".carousel-content");
  let carouselNav = document.querySelector(".carousel-nav");
  let prevBtn = document.getElementById("prev");
  let nextBtn = document.getElementById("next");
  let currentSlideIndex = 0;
  
  data.forEach((value, index) => {
    let content = document.createElement("div");
    let navItem = document.createElement("a");
  
    // create carousel content
  
    content.innerHTML = value.info;
    // content.style.backgroundColor = value.bgColor;
    content.innerHTML = `<img src="img/cinco.jpg">`;
    content.classList.add("carousel-content-item");
    carouselContent.appendChild(content);
    //   create nav items
    navItem.innerHTML = value.bgColor;
    navItem.style.color = value.bgColor;
    navItem.classList.add("carousel-nav-item");
    navItem.addEventListener("click", function () {
      changeSlide(index, content);
    });
  
    carouselNav.appendChild(navItem);
  });
  
  let contentNodes = document.querySelectorAll(".carousel-content-item");
  let navNodes = document.querySelectorAll(".carousel-nav-item");
  
  function changeSlide(contentIndex) {
    if (contentIndex < 0) {
      currentSlideIndex = contentNodes.length - 1;
    } else if (contentIndex > contentNodes.length - 1) {
      currentSlideIndex = 0;
    } else {
      currentSlideIndex = contentIndex;
    }
    contentNodes.forEach((node, index) => {
      if (index !== currentSlideIndex) {
        navNodes[index].style.borderBottom = 0;
        node.style.display = "none";
      } else {
        node.style.display = "block";
        navNodes[currentSlideIndex].style.borderBottom =
          "2px solid " + node.style.backgroundColor;
      }
    });
  }
  
  prevBtn.addEventListener("click", function () {
    changeSlide(currentSlideIndex - 1);
  });
  
  nextBtn.addEventListener("click", function () {
    changeSlide(currentSlideIndex + 1);
  });