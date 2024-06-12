const toggler = document.getElementById("toggle-btn-open");
const main = document.getElementById("mouse-move");
const closeToggler = document.getElementById("icon2");
const arr = document.getElementsByTagName("h1");
const cursor = document.getElementById("cursor-tracker");
const imgM = document.getElementById("img1");
const hrScroll = document.getElementById("horizontal-scroll");
const skillList = document.querySelectorAll("#skill li");
const topBtn=document.getElementById("back-top");

var tl = gsap.timeline();
tl.to("#menu-bar", {
  x: "-59vw",
  duration: 0.2,
});
tl.from("#menu-bar li a", {
  opacity: 0,
  x: 20,
  stagger: 0.5,
});
tl.pause();
// Toggle button click event to play the timeline and hide the toggler
toggler.addEventListener("click", function () {
  tl.play(); // Play the GSAP timeline
  toggler.style.visibility = "hidden";
  gsap.to("#img1", {
    scale: 0.5,
    duration: 2,
  });
});

toggler.addEventListener("mouseover", function () {
  toggler.style.cursor = "pointer";
});

// Close toggler click event to reverse the timeline and show the toggler
closeToggler.addEventListener("click", function () {
  tl.reverse(); // Reverse the GSAP timeline
  gsap.to("#img1", {
    scale: 1,
    duration: 2,
  });
  // Use a timeout to make toggler visible after the reverse animation
  setTimeout(() => {
    toggler.style.visibility = "visible";
  }, 2000); // 2000ms (2 seconds) to match the animation duration
});

closeToggler.addEventListener("mouseover", function () {
  closeToggler.style.cursor = "pointer";
});

gsap.to("#horizontal-scroll ul", {
  transform: "translateX(-150%)",

  scrollTrigger: {
    trigger: "#horizontal-scroll",

    start: "top top",
    end: "bottom -20%",
    scrub: 1.7,
    pin: true,
  },
});
for (let index = 0; index < skillList.length; index++) {
  const element = skillList[index];
  if (index % 2 === 0) {
    gsap.from(element, {
      x: 40,
      duration: 1,
      scrollTrigger: {
        trigger: ".page2",

        scrub: 2,
      },
    });
  } else {
    gsap.to(element, {
      x: 40,
      duration: 1,
      scrollTrigger: {
        trigger: ".page2",

        scrub: 2,
      },
    });
  }
}

// Array of tasks with their respective end times (replace with actual end times)
// Define the tasks array with name and endTime for each task
const tasks = [
  { name: 'LC Weekly Contest', endTime: new Date('2024-06-16T02:30:12Z').getTime() },
  { name: 'LC Biweekly Contest', endTime: new Date('2024-06-22T14:30:00Z').getTime() },
  { name: 'GSOC 2025', endTime: new Date('2025-06-15T08:00:00Z').getTime() }
];

// Function to create countdown for each task
function createCountdown(task) {
  const countdownElement = document.getElementById(`countdown-${task.name.replace(/\s+/g, '-')}`);
  
  // Update the countdown every second
  setInterval(() => {
      // Get the current time
      const now = new Date().getTime();

      // Calculate the time remaining
      const distance = task.endTime - now;

      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the countdown
      countdownElement.innerHTML = `
          ${days}d ${hours}h ${minutes}m ${seconds}s
      `;

      // If the countdown is finished, display a message
      if (distance < 0) {
          clearInterval(countdown);
          countdownElement.innerHTML = `${task.name} has started!`;
      }
  }, 1000);
}

// Initialize countdowns for each task
tasks.forEach(task => createCountdown(task));


topBtn.addEventListener('click', function() {
  toggler.scrollIntoView(
    {
      behavior:'smooth'
    }
  );
});