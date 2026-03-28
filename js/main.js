/**
 * World Flight Travels - Ultimate Merged JS
 * GSAP 3 + Three.js + ScrollTrigger
 */

document.addEventListener("DOMContentLoaded", () => {
  // 0. Initial Setup & Plugin Registration
  gsap.registerPlugin(ScrollTrigger);
  const isMobile = window.innerWidth < 992;

  // ==========================================
  // 1. GLOBAL HEADER & HERO ANIMATION
  // ==========================================
  const initHeroSequence = () => {
    const masterTl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1 },
    });

    masterTl.from(".logo-anim", { x: -30, opacity: 0, duration: 0.8 });

    if (!isMobile) {
      masterTl.to(
        ".desktop-menu ul li a",
        {
          autoAlpha: 1,
          y: 0,
          startAt: { y: 20 },
          stagger: 0.1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.4",
      );
    } else {
      masterTl.fromTo(
        ".btn-menu-trigger",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.5",
      );
    }

    masterTl
      .to(
        ".hero-content h1",
        { autoAlpha: 1, y: 0, startAt: { y: 40 } },
        "-=0.3",
      )
      .to(
        ".hero-content p",
        { autoAlpha: 1, y: 0, startAt: { y: 20 } },
        "-=0.7",
      )
      .to(
        ".hero-content .btn",
        {
          autoAlpha: 1,
          scale: 1,
          startAt: { scale: 0.8 },
          ease: "back.out(1.7)",
        },
        "-=0.6",
      );
  };

  // ==========================================
  // 2. THREE.JS COMPONENTS (Hero, Why, Countries, Footer)
  // ==========================================

  // A. Hero Globe
  const initHero3D = () => {
    const container = document.getElementById("hero-canvas");
    if (!container) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    const sphere = new THREE.Points(
      new THREE.SphereGeometry(2, 32, 32),
      new THREE.PointsMaterial({
        color: "#ffca28",
        size: 0.015,
        transparent: true,
      }),
    );
    scene.add(sphere);
    camera.position.z = 5;
    const anim = () => {
      requestAnimationFrame(anim);
      sphere.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    anim();
  };

  // B. Why Choose Us 3D Image
  const initWhyChoose3D = () => {
    const container = document.getElementById("three-js-image-container");
    if (!container) return;
    const imageUrl = container.getAttribute("data-image");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    new THREE.TextureLoader().load(imageUrl, (texture) => {
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 3.5, 16, 16),
        new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }),
      );
      scene.add(mesh);
      camera.position.z = 5;
      if (!isMobile) {
        container.addEventListener("mousemove", (e) => {
          const rect = container.getBoundingClientRect();
          gsap.to(mesh.rotation, {
            y: ((e.clientX - rect.left) / rect.width - 0.5) * 0.4,
            x: -((e.clientY - rect.top) / rect.height - 0.5) * 0.4,
          });
        });
        container.addEventListener("mouseleave", () =>
          gsap.to(mesh.rotation, { x: 0, y: 0 }),
        );
      }
    });
    const anim = () => {
      requestAnimationFrame(anim);
      renderer.render(scene, camera);
    };
    anim();
  };

  // D. Footer Particles
  const initFooterThree = () => {
    const container = document.getElementById("footer-wave-container");
    if (!container) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    const posArray = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000 * 3; i++) posArray[i] = (Math.random() - 0.5) * 10;
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const points = new THREE.Points(
      geom,
      new THREE.PointsMaterial({ size: 0.005, color: "#ffca28" }),
    );
    scene.add(points);
    camera.position.z = 3;
    const anim = () => {
      requestAnimationFrame(anim);
      points.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    anim();
  };

  // ==========================================
  // 3. SECTION SCROLL TRIGGERS
  // ==========================================

  const initScrollAnimations = () => {
    // About Section
    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 75%",
        once: true,
      },
    });
    gsap.set(".reveal-item", { y: 60, opacity: 0 });
    aboutTl
      .to(".about-interactive-img", {
        rotationY: 0,
        opacity: 1,
        duration: 1.5,
        startAt: { rotationY: -30 },
      })
      .to(
        ".floating-badge",
        { scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.8",
      )
      .to(".reveal-item", { y: 0, opacity: 1, stagger: 0.2 }, "-=1")
      .to(".fact-item", { scale: 1, opacity: 1, stagger: 0.1 }, "-=0.5");

    // Why Choose Us
    const whyTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".why-choose-section",
        start: "top 75%",
        once: true,
      },
    });
    whyTl
      .to(".reveal-up", {
        autoAlpha: 1,
        y: 0,
        startAt: { y: 30 },
        stagger: 0.2,
      })
      .to(
        ".feature-item",
        { autoAlpha: 1, x: 0, startAt: { x: -50 }, stagger: 0.2 },
        "-=0.5",
      )
      .from(
        ".stat-card",
        { scale: 0, opacity: 0, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.4",
      );

    // Countries Reveal
    const countryTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".countries-section",
        start: "top 70%",
        once: true,
      },
    });
    countryTl.from(".reveal-up", { opacity: 0, y: 50, duration: 1 }).to(
      ".reveal-zoom",
      {
        autoAlpha: 1,
        scale: 1,
        startAt: { scale: 0.5, autoAlpha: 0 },
        stagger: 0.05,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.5",
    );

    // Contact Form
    gsap.fromTo(
      ".custom-input",
      { opacity: 0, y: 20, visibility: "hidden" },
      {
        scrollTrigger: {
          trigger: ".contact-form-card",
          start: "top 85%",
          once: true,
        },
        opacity: 1,
        y: 0,
        visibility: "visible",
        autoAlpha: 1,
        stagger: 0.15,
        ease: "power3.out",
      },
    );
  };

  // ==========================================
  // 4. HELPER UTILITIES
  // ==========================================
  const initInteractions = () => {
    document.querySelectorAll(".mag-link").forEach((link) => {
      link.addEventListener("mousemove", (e) => {
        const rect = link.getBoundingClientRect();
        gsap.to(link, {
          x: (e.clientX - rect.left - rect.width / 2) * 0.3,
          y: (e.clientY - rect.top - rect.height / 2) * 0.3,
          duration: 0.3,
        });
      });
      link.addEventListener("mouseleave", () =>
        gsap.to(link, { x: 0, y: 0, duration: 0.5 }),
      );
    });

    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu) {
      mobileMenu.addEventListener("shown.bs.offcanvas", () => {
        gsap.from(".offcanvas-body ul li", {
          x: -50,
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
        });
      });
    }
  };

  // ==========================================
  // 5. MASTER EXECUTION
  // ==========================================
  initHeroSequence();
  initHero3D();
  initWhyChoose3D();
  initFooterThree();
  initScrollAnimations();
  initInteractions();
});

// A. The 3D Advanced Globe
function initCountriesGlobe() {
  const container = document.getElementById("advanced-globe-wrapper");
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.IcosahedronGeometry(4, 15);
  const material = new THREE.PointsMaterial({
    color: "#0E4C96",
    size: 0.04,
    transparent: true,
    opacity: 0.35, // Reduced opacity to highlight content
  });

  const globe = new THREE.Points(geometry, material);
  scene.add(globe);
  camera.position.z = 8;

  function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.0012;
    renderer.render(scene, camera);
  }
  animate();
}

// B. GSAP Reveal (Strictly Cards Only)
function initCountriesReveal() {
  gsap.to(".reveal-zoom", {
    scrollTrigger: {
      trigger: ".countries-section",
      start: "top 75%",
      once: true,
    },
    autoAlpha: 1,
    scale: 1,
    startAt: { scale: 0.5, autoAlpha: 0 },
    stagger: 0.05,
    duration: 0.8,
    ease: "back.out(1.7)",
  });
}

// Global Initialization
document.addEventListener("DOMContentLoaded", () => {
  initCountriesGlobe();
  initCountriesReveal();
});

document.addEventListener("DOMContentLoaded", () => {
  // Reveal Cards on Scroll
  gsap.to(".reveal-card", {
    scrollTrigger: {
      trigger: ".services-section",
      start: "top 80%",
      once: true,
    },
    opacity: 1,
    y: 0,
    startAt: { y: 50 },
    stagger: 0.15,
    duration: 1,
    ease: "power4.out",
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // GSAP Animation for Industry Cards
  gsap.to(".reveal-industry", {
    scrollTrigger: {
      trigger: ".industries-section",
      start: "top 80%",
      once: true,
    },
    opacity: 1,
    y: 0,
    startAt: { y: 60 },
    stagger: 0.2,
    duration: 1.2,
    ease: "power3.out",
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // 1. Three.js: Subtle Floating Geometry Background
  const initPartnersBG = () => {
    const container = document.getElementById("partners-bg-canvas");
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.PointsMaterial({ size: 0.02, color: "#0E4C96" });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 15;

    function animate() {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    }
    animate();
  };

  // 2. GSAP: Partners Logo Reveal
  const initPartnerReveal = () => {
    gsap.to(".reveal-partner", {
      scrollTrigger: {
        trigger: ".partners-section",
        start: "top 80%",
        once: true,
      },
      opacity: 1,
      y: 0,
      scale: 1,
      startAt: { y: 40, scale: 0.8 },
      stagger: 0.1,
      duration: 0.8,
      ease: "back.out(1.7)",
    });
  };

  initPartnersBG();
  initPartnerReveal();
});


