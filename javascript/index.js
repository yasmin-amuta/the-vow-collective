document.addEventListener("DOMContentLoaded", (event) => {
  document.fonts.ready.then(() => {
    //lenis scroll
    const lenis = new Lenis({
      duration: 1.2, // smoothness: lower = snappier, higher = smoother
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

    //GSAP
    // INTRO TIMELINE
    let introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    let split = SplitText.create(".cover-logo", {
      type: "words",
    });

    introTl.from(split.words, {
      y: 40,
      autoAlpha: 0,
      delay: 1,
      stagger: 0.3,
    });

    // 2. Wait for video + text to finish
    introTl.to({}, { duration: 0.5 }); // delay before wipe

    // 3. Wipe intro upward
    introTl.to(".cover", {
      yPercent: -100,
      duration: 1.3,
      ease: "power4.inOut",
    });

    // 4. Reveal main content
    introTl.to(
      "#main-content",
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      },
      "-=0.6",
    );

    // 5. Re-enable scrolling
    introTl.add(() => {
      document.body.classList.remove("intro-active");
    });

    const burger = document.querySelector("#burger");
    const closeIcon = document.querySelector(".close-icon");
    var navbar = gsap.timeline({ paused: true });

    // NAVBAR Drawer animation
    navbar
      .to(".drawer", { right: 0, duration: 0.5, ease: "power3.out" })
      .fromTo(
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
        },
        "-=0.2",
      );

    // ▶ OPEN NAV
    burger.addEventListener("click", () => {
      document.body.classList.add("nav-open"); // NEW
      navbar.play();
    });

    // ◀ CLOSE NAV
    closeIcon.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      navbar.reverse();
    });

    // HERO SECTION
    gsap.to(".hero img", {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      stagger: 0.3,
      ease: "back",
      scrollTrigger: {
        trigger: ".hero img",
        start: "top 70%",
      },
    });

    const heroImg1 = document.querySelector(".hero-img-1");
    const heroImg2 = document.querySelector(".hero-img-2");

    heroImg1.addEventListener("mouseenter", () => {
      gsap.to(heroImg1, { x: 10, y: 10, duration: 0.5 });
      gsap.to(heroImg2, { x: -10, y: -10, duration: 0.5 });
    });

    heroImg1.addEventListener("mouseleave", () => {
      gsap.to(heroImg1, { x: 0, y: 0, duration: 0.5 });
      gsap.to(heroImg2, { x: 0, y: 0, duration: 0.5 });
    });

    //SECTION 3

    gsap.from(".section3 img", {
      opacity: 0,
      scale: 0.5,
      y: 30,
      duration: 1,
      stagger: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".section3 img",
        start: "top 95%",
      },
    });

    // SLIDER TEXT
    let slider = gsap.timeline({
      scrollTrigger: {
        trigger: ".slider-main",
        start: "top 80%",
        end: "top 10%",
        scrub: true,
      },
    });

    slider
      .from(".slider", { x: -20, y: 80, opacity: 0, duration: 0.7 })
      .from(".slider-2 span", { x: -20, y: 50, opacity: 0, duration: 0.7 });

    // SECTION 5
    gsap.to(".section5 img", {
      y: -50,
      opacity: 1,
      duration: 0.5,
      stagger: 0.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".section5 img",
        start: "top 90%",
      },
    });

    let refined = SplitText.create(".section6 p", {
      type: "lines",
    });

    gsap.from(refined.lines, {
      y: 30,
      autoAlpha: 0,
      stagger: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".section6 p",
        start: "top 90%",
      },
    });

    let testimonialT = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonial",
        start: "center 90%",
      },
    });

    let note = SplitText.create(".testimonial-text h3", {
      type: "lines",
    });

    testimonialT
      .from(note.lines, {
        x: -20,
        y: 30,
        autoAlpha: 0,
        stagger: 0.3,
        ease: "power3.out",
      })
      .from(
        ".testimonial-image",
        {
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "<",
      )
      .from(
        ".testimonial-text h4",
        { y: 50, opacity: 0, duration: 0.5 },
        "-=0.3",
      );

    // FOOTER ANIMATIONS
    const track = document.querySelector(".carousel-track");

    // total width of one full set
    const trackWidth = track.offsetWidth / 2;

    gsap.to(track, {
      x: -trackWidth,
      duration: 40,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % trackWidth),
      },
    });

    let footerT = gsap.timeline({
      scrollTrigger: {
        trigger: ".footer",
        start: "top 90%",
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
