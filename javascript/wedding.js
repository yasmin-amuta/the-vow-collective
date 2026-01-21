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

    // Cursor movement
    const cursor = document.querySelector(".custom-cursor");

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

    //Forever text
    gsap.from(".forever", { x: -100, opacity: 0, duration: 0.5, delay: 1 });

    //Main Images
    var mainTl = gsap.timeline();

    mainTl
      .from(".main-1", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      })
      .from(
        ".main-2",
        {
          y: 30,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "<"
      );

    var tradTl = gsap.timeline({
      scrollTrigger: { trigger: ".traditional", start: "top 60%" },
    });

    tradTl
      .from(".trad-text-1", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      })
      .from(".trad-image img", {
        x: -100,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.4,
      });

    var cereTl = gsap.timeline({
      scrollTrigger: { trigger: ".ceremony", start: "top 60%" },
    });
    cereTl
      .from(".ceremony-text-1", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      })
      .from(".ceremony-image img", {
        x: -100,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.4,
      });

    var recepTl = gsap.timeline({
      scrollTrigger: { trigger: ".reception", start: "top 60%" },
    });
    recepTl
      .from(".reception-text", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      })
      .from(".reception-image img", {
        x: -100,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.4,
      });

    var momentTl = gsap.timeline({
      scrollTrigger: { trigger: ".moments", start: "top 60%" },
    });
    momentTl
      .from(".moment-text-2", {
        y: 50,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      })
      .from(".moments img", {
        x: -100,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.4,
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

    //Testimonial slides
    var slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
      showSlides((slideIndex += n));
    }

    function currentSlide(n) {
      showSlides((slideIndex = n));
    }

    function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("dot");
      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }
  });
});
