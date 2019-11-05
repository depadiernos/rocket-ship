let intro =document.createElement('div')
intro.innerText = "Click on a Rocket to blast it to the top. Click and hold on the Rocket and the astronaut goes for a spacewalk!"
let br = document.createElement('br')

document.body.appendChild(intro)

let blocks = document.querySelectorAll(".block");

// Make the default rocket order explicit
blocks[0].style.order = "0";
blocks[1].style.order = "1";
blocks[2].style.order = "2";
blocks[3].style.order = "3";
blocks[4].style.order = "4";

// Add the traveler to the rocket
blocks.forEach(block => {
  traveler = document.createElement("div");
  traveler.style.backgroundImage = "url(spacewalk.svg)";
  traveler.style.backgroundSize = "100%";
  traveler.style.backgroundColor = block.style.backgroundColor;
  traveler.style.width = "40px";
  traveler.style.height = "40px";
  traveler.style.margin = "10px";
  traveler.style.zIndex = "999999";
  traveler.style.transform = "translate(40px, 0)";
  traveler.style.transition = "all 1s linear";
  block.appendChild(traveler);
});

// Define how rockets fly and travelers spacewalk
const addBlockListener = block => {
  // add the rocket graphic
  block.style.backgroundImage = "url(rocket.svg)";
  block.style.backgroundSize = "100%";

  // define rocket logic
  const rocketLaunch = event => {
    clickedBlock = event.target;
    topBlockOffsetTop = "";
    blocks.forEach(block => {
      block.style.order == 0 ? (topBlockOffsetTop = block.offsetTop) : null;
      block.style.order <= clickedBlock.style.order
        ? block.style.order++
        : block.style.order;
    });
    clickedBlock.style.transform = `translate(0, -${clickedBlock.offsetTop -
      topBlockOffsetTop}px)`;
    clickedBlock.style.transition = `transform ${
      clickedBlock.style.order / 2
    }s ease-out`;
    clickedBlock.style.zIndex = "9999";
    setTimeout(() => {
      clickedBlock.style.order = 0;
      clickedBlock.style.transition = "";
      clickedBlock.style.transform = "translate(0, 0)";
      clickedBlock.style.zIndex = "0";
    }, clickedBlock.style.order * 500);
  };

  //define traveler logic
  const travelerSpacewalk = event => {
    let spaceTime = null;
    clickedBlock = event.currentTarget;
    traveler = clickedBlock.querySelector("div");
    originalMarginLeft = parseFloat(traveler.style.marginLeft, 10);
    console.log(originalMarginLeft);
    if (spaceTime === null) {
      startFrom = traveler.style.marginLeft.substr(
        0,
        traveler.style.marginLeft.length - 2
      );
      distance = "";
      spaceTime = setInterval(() => {
        distance++;
        traveler.style.marginLeft = `${distance * 10 + originalMarginLeft}px`;
      }, 100);
    }
    clickedBlock.addEventListener("mouseup", () => {
      clearInterval(spaceTime);
      spaceTime = null;
      traveler.style.marginLeft = "10px";
    });
  };

  // add the event listener to the block
  block.addEventListener("click", rocketLaunch);
  block.addEventListener("mousedown", travelerSpacewalk);
};

// add the event listener to all the blocks
blocks.forEach(addBlockListener);
