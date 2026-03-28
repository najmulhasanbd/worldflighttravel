document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline();
  const isMobile = window.innerWidth < 992;

  // 1. Logo Animation (Sob device e hobe)
  tl.from(".logo-anim", {
    x: -30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  // 2. Desktop Navigation Animation (Sudhu desktop e hobe)
  if (!isMobile) {
    tl.to(
      ".desktop-menu ul li a",
      {
        opacity: 1,
        y: 0,
        startAt: { y: 20 },
        duration: 0.5,
        stagger: 0.15,
        ease: "back.out(1.7)",
      },
      "-=0.4",
    );
  } else {
    // Mobile e trigger icon ke sathe sathe show kora
    tl.fromTo(
      ".btn-menu-trigger",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.5",
    );
  }

  // 3. Mobile Offcanvas Logic
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu) {
    mobileMenu.addEventListener("shown.bs.offcanvas", () => {
      gsap.from(".offcanvas-body ul li", {
        x: -100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
      });
    });

    mobileMenu.addEventListener("hidden.bs.offcanvas", () => {
      gsap.set(".offcanvas-body ul li", { opacity: 1, x: 0 });
    });
  }
});
