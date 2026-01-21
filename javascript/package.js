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
    //Navbar dropdown
    const burger = document.getElementById("burger");
    const drawer = document.getElementById("drawer");

    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      drawer.classList.toggle("open");
      navbar.play();
    });

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

    gsap.from(".package-info", {
      x: 100,
      duration: 0.9,
      opacity: 0,
      scrollTrigger: { trigger: ".package-info", start: "top 70%" },
    });

    //Package section
    const tabs = document.querySelectorAll(".tab");
    const packages = document.querySelectorAll(".package");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active state from tabs
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        // Hide all packages
        packages.forEach((pkg) => pkg.classList.remove("active"));

        // Show the selected one
        const target = document.getElementById(tab.dataset.target);
        target.classList.add("active");
      });
    });

    //FAQå
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }

    gsap.from(".faq-image", {
      y: 100,
      duration: 0.7,
      opacity: 0,
      scrollTrigger: { trigger: ".faq-image", start: "top 80%" },
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
