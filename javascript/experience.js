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

    let title = SplitText.create(".hero-title", {
      type: "lines",
    });

    var heroTl = gsap.timeline();

    heroTl
      .from(title.lines, {
        x: -100,
        duration: 0.9,
        autoAlpha: 0,
        delay: 0.6,
        stagger: 0.4,
        ease: "power3.out",
      })
      .from(
        ".hero-img1",
        {
          y: 30,
          opacity: 0,
          ease: "power3.out",
          duration: 0.3,
        },
        "-=0.4"
      )
      .from(".hero-text p", {
        x: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.3,
      });

    var approachTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".approach",
        start: "top 70%",
      },
    });

    approachTl
      .from(".appr-textbox p", {
        x: -100,
        opacity: 0,
        duration: 0.7,
        stagger: 0.3,
        ease: "power3.out",
      })
      .from(".appr-image img", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
      });

    gsap.from(".desc", {
      x: 100,
      opacity: 0,
      duration: 0.5,
      scrollTrigger: { trigger: ".process-box", start: "top 70%" },
    });

    let footerT = gsap.timeline({
      scrollTrigger: {
        trigger: ".footer",
        start: "center 90%",
      },
    });

    let foot = SplitText.create(".footer-2 p", {
      type: "words",
    });

    footerT
      .from(foot.words, {
        y: 30,
        duration: 0.6,
        autoAlpha: 0,
        stagger: 0.3,
        ease: "power3.out",
      })
      .from(".footer-1", {
        x: -20,
        y: 50,
        opacity: 0,
      })
      .from(".footer-3", {
        x: -20,
        y: 50,
        opacity: 0,
      });
  });
});
