/**
 * World Flight Travels - Master JS
 * GSAP + Three.js + ScrollTrigger
 */

document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);

  // Check if Device is Mobile
  const isMobile = window.innerWidth < 992;

  // ==========================================
  // 1. GLOBAL MASTER TIMELINE (Header & Hero)
  // ==========================================
  const masterTl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 1 },
  });

  // Logo Animation
  masterTl.from(".logo-anim", {
    x: -30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  // Navigation (Desktop vs Mobile)
  if (!isMobile) {
    masterTl.to(
      ".desktop-menu ul li a",
      {
        autoAlpha: 1,
        y: 0,
        startAt: { y: 20 },
        duration: 0.5,
        stagger: 0.15,
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

  // Hero Content Sequence
  masterTl
    .to(
      ".hero-content h1",
      {
        autoAlpha: 1,
        y: 0,
        startAt: { y: 40 },
      },
      "-=0.3",
    )
    .to(
      ".hero-content p",
      {
        autoAlpha: 1,
        y: 0,
        startAt: { y: 20 },
      },
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

  // ==========================================
  // 2. HERO 3D GLOBE (Three.js)
  // ==========================================
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

    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.PointsMaterial({
      color: "#ffca28",
      size: 0.015,
      transparent: true,
    });

    const sphere = new THREE.Points(geometry, material);
    scene.add(sphere);
    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.002;
      sphere.rotation.x += 0.001;
      renderer.render(scene, camera);
    }

    window.addEventListener("resize", () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
    animate();
  };
  initHero3D();

  // ==========================================
  // 3. ABOUT SECTION (Scroll & Hover)
  // ==========================================
  const aboutTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 75%",
      once: true,
    },
  });

  // Initial Hide for ScrollReveal
  gsap.set(".reveal-item", { y: 60, opacity: 0 });
  gsap.set(".fact-item", { scale: 0.8, opacity: 0 });
  gsap.set(".about-interactive-img", { rotationY: -30, opacity: 0 });
  gsap.set(".floating-badge", { scale: 0 });

  aboutTl
    .to(".about-interactive-img", { rotationY: 0, opacity: 1, duration: 1.5 })
    .to(
      ".floating-badge",
      { scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.8",
    )
    .to(".reveal-item", { y: 0, opacity: 1, stagger: 0.2 }, "-=1")
    .to(".fact-item", { scale: 1, opacity: 1, stagger: 0.1 }, "-=0.5");

  // About 3D Hover Tilt
  const aboutArea = document.getElementById("aboutInteractiveArea");
  if (aboutArea && !isMobile) {
    aboutArea.addEventListener("mousemove", (e) => {
      const rect = aboutArea.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 10;
      const y = (rect.height / 2 - (e.clientY - rect.top)) / 10;
      gsap.to(aboutArea, {
        rotationX: y,
        rotationY: x,
        scale: 1.05,
        duration: 0.5,
      });
    });
    aboutArea.addEventListener("mouseleave", () => {
      gsap.to(aboutArea, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.6,
      });
    });
  }

  // ==========================================
  // 4. WHY CHOOSE US (Three.js Image)
  // ==========================================
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    new THREE.TextureLoader().load(
      imageUrl,
      (texture) => {
        const geometry = new THREE.PlaneGeometry(5, 3.5, 16, 16);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        camera.position.z = 5;

        if (!isMobile) {
          container.addEventListener("mousemove", (e) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(mesh.rotation, { y: x * 0.4, x: -y * 0.4, duration: 0.8 });
          });
          container.addEventListener("mouseleave", () => {
            gsap.to(mesh.rotation, { x: 0, y: 0, duration: 1 });
          });
        }
      },
      undefined,
      (err) => {
        container.innerHTML = `<img src="${imageUrl}" class="img-fluid rounded-4">`;
      },
    );

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  };
  initWhyChoose3D();

  // ==========================================
  // 5. MOBILE MENU LOGIC
  // ==========================================
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu) {
    mobileMenu.addEventListener("shown.bs.offcanvas", () => {
      gsap.from(".offcanvas-body ul li", {
        x: -50,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        clearProps: "all",
      });
    });
  }
});
/**
 * World Flight Travels - Merged Master JS
 * GSAP + Three.js + ScrollTrigger
 */

document.addEventListener("DOMContentLoaded", () => {
  // 0. Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);

  // Global variables
  const isMobile = window.innerWidth < 992;

  // ==========================================
  // 1. HERO & NAVBAR ANIMATION (Master Timeline)
  // ==========================================
  const masterTl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 1 },
  });

  // Logo
  masterTl.from(".logo-anim", {
    x: -30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  // Navigation
  if (!isMobile) {
    masterTl.to(
      ".desktop-menu ul li a",
      {
        autoAlpha: 1,
        y: 0,
        startAt: { y: 20 },
        duration: 0.5,
        stagger: 0.15,
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

  // Hero Content
  masterTl
    .to(".hero-content h1", { autoAlpha: 1, y: 0, startAt: { y: 40 } }, "-=0.3")
    .to(".hero-content p", { autoAlpha: 1, y: 0, startAt: { y: 20 } }, "-=0.7")
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

  // ==========================================
  // 2. THREE.JS INITIALIZATIONS
  // ==========================================

  // A. Hero 3D Globe
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
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.PointsMaterial({
      color: "#ffca28",
      size: 0.015,
      transparent: true,
    });
    const sphere = new THREE.Points(geometry, material);
    scene.add(sphere);
    camera.position.z = 5;
    function animate() {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.002;
      sphere.rotation.x += 0.001;
      renderer.render(scene, camera);
    }
    animate();
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
    new THREE.TextureLoader().load(
      imageUrl,
      (texture) => {
        const geometry = new THREE.PlaneGeometry(5, 3.5, 16, 16);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        camera.position.z = 5;
        if (!isMobile) {
          container.addEventListener("mousemove", (e) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(mesh.rotation, { y: x * 0.4, x: -y * 0.4, duration: 0.8 });
          });
          container.addEventListener("mouseleave", () =>
            gsap.to(mesh.rotation, { x: 0, y: 0, duration: 1 }),
          );
        }
      },
      undefined,
      (err) => {
        container.innerHTML = `<img src="${imageUrl}" class="img-fluid rounded-4">`;
      },
    );
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  };

  // C. Footer Particle Wave
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
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const material = new THREE.PointsMaterial({
      size: 0.005,
      color: "#ffca28",
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    camera.position.z = 3;
    function animate() {
      requestAnimationFrame(animate);
      points.rotation.y += 0.001;
      points.rotation.x += 0.0005;
      renderer.render(scene, camera);
    }
    animate();
  };

  // ==========================================
  // 3. SECTION SCROLL ANIMATIONS
  // ==========================================

  // About Section
  const aboutTl = gsap.timeline({
    scrollTrigger: { trigger: ".about-section", start: "top 75%", once: true },
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

  // Why Choose Us (Fixed Text Reveal)
  const whyTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".why-choose-section",
      start: "top 75%",
      once: true,
    },
  });
  whyTl
    .to(".reveal-up", { autoAlpha: 1, y: 0, startAt: { y: 30 }, stagger: 0.2 })
    .to(
      ".feature-item",
      { autoAlpha: 1, x: 0, startAt: { x: -50 }, duration: 0.8, stagger: 0.2 },
      "-=0.5",
    )
    .to(
      ".reveal-right",
      { autoAlpha: 1, x: 0, startAt: { x: 50 }, duration: 1 },
      "-=0.8",
    )
    .from(
      ".stat-card",
      { scale: 0, opacity: 0, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.4",
    );

  // Footer Reveal
  gsap.from(".reveal-footer", {
    scrollTrigger: { trigger: ".main-footer", start: "top 90%" },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
  });

  // ==========================================
  // 4. INTERACTIVE HOVERS
  // ==========================================
  const initMagneticLinks = () => {
    document.querySelectorAll(".mag-link").forEach((link) => {
      link.addEventListener("mousemove", (e) => {
        const rect = link.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
        gsap.to(link, { x: x, y: y, duration: 0.3 });
      });
      link.addEventListener("mouseleave", () =>
        gsap.to(link, { x: 0, y: 0, duration: 0.5 }),
      );
    });
  };

  // ==========================================
  // 5. CALL ALL FUNCTIONS
  // ==========================================
  initHero3D();
  initWhyChoose3D();
  initFooterThree();
  initMagneticLinks();

  // Mobile Menu logic
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu) {
    mobileMenu.addEventListener("shown.bs.offcanvas", () => {
      gsap.from(".offcanvas-body ul li", {
        x: -50,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        clearProps: "all",
      });
    });
  }
});
