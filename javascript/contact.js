document.addEventListener("DOMContentLoaded", (event) => {
  document.fonts.ready.then(() => {
    //lenis scroll
    const lenis = new Lenis({
      duration: 1.5, // smoothness: lower = snappier, higher = smoother
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // default easing
      smooth: true,
      smoothTouch: 0.1, //or false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    // Sync ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    //cursor
    const cursor = document.querySelector(".custom-cursor");

    // Cursor movement
    document.addEventListener("mousemove", (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    });

    // Add hover effect on cursor when hovering over elements with class 'hover-target'
    document.querySelectorAll(".hover-target").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("hover");
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hover");
      });
    });

    //Navbar dropdown

    let logo = SplitText.create(".logo h1", {
      type: "words",
    });

    gsap.from(logo.words, {
      y: 30,
      duration: 0.9,
      autoAlpha: 0,
      stagger: 0.4,
      ease: "power3.out",
    });

    var navbar = gsap.timeline({ paused: true });
    // Drawer animation
    navbar.fromTo(
      ".drawer-links a",
      {
        x: 150,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".drawer-links a", start: "top center" },
      }
    );
    const burger = document.getElementById("burger");
    const drawer = document.getElementById("drawer");

    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      drawer.classList.toggle("open");
      navbar.play();
    });

    var heroTl = gsap.timeline();

    heroTl
      .from(".heading", {
        x: -50,
        duration: 0.6,
        opacity: 0,
        delay: 0.9,
        ease: "power3.out",
      })
      .from(".sub-heading", {
        x: -50,
        duration: 0.6,
        opacity: 0,
        ease: "power3.out",
      });

    gsap.from(".image", { y: 100, duration: 0.6, opacity: 0 });
  });
});
