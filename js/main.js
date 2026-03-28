document.addEventListener("DOMContentLoaded", () => {
  // Check if Mobile
  const isMobile = window.innerWidth < 992;

  // Create a Single Master Timeline
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 1,
    },
  });

  // 1. Logo Animation
  tl.from(".logo-anim", {
    x: -30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  // 2. Navigation Animation (Desktop vs Mobile)
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
    tl.fromTo(
      ".btn-menu-trigger",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.5",
    );
  }

  // 3. Hero Content Animation (Headline, Paragraph, Button)
  // Headline
  tl.to(
    ".hero-content h1",
    {
      autoAlpha: 1,
      y: 0,
      startAt: { y: 40 },
    },
    "-=0.3",
  );

  // Paragraph
  tl.to(
    ".hero-content p",
    {
      autoAlpha: 1,
      y: 0,
      startAt: { y: 20 },
    },
    "-=0.7",
  );

  // Hero Button
  tl.to(
    ".hero-content .btn",
    {
      autoAlpha: 1,
      scale: 1,
      startAt: { scale: 0.8 },
      ease: "back.out(1.7)",
    },
    "-=0.6",
  );

  // 4. Mobile Offcanvas Logic (Independent of main timeline)
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu) {
    mobileMenu.addEventListener("shown.bs.offcanvas", () => {
      gsap.from(".offcanvas-body ul li", {
        x: -50,
        opacity: 0,
        duration: 0.4,
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

function initHero3D() {
  const container = document.getElementById("hero-canvas");
  if (!container) return;

  // Scene Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true }); // alpha true mane transparent bg

  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Geometry: Ekta Globe-er moto shape
  const geometry = new THREE.SphereGeometry(2, 32, 32);
  const material = new THREE.PointsMaterial({
    color: "#ffca28", // Apnar yellow color
    size: 0.015,
    transparent: true,
  });

  // Points toiri kora
  const sphere = new THREE.Points(geometry, material);
  scene.add(sphere);

  camera.position.z = 5;

  // Animation function
  function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.002; // Globe ghurbe
    sphere.rotation.x += 0.001;
    renderer.render(scene, camera);
  }

  // Responsive handle kora
  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  animate();
}

// Start Three.js
initHero3D();

// about
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Timeline Master for Entrance
  const entranceTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 75%",
      once: true, // Animation will run only once
    },
  });

  // 1. Initial State for entrance
  gsap.set(".reveal-item", { y: 60, opacity: 0 });
  gsap.set(".fact-item", { scale: 0.8, opacity: 0 });
  gsap.set(".about-interactive-img", { rotationY: -30, opacity: 0 });
  gsap.set(".floating-badge", { scale: 0 });

  // 2. Entrance Sequence
  entranceTl
    // Image Entrance
    .to(".about-interactive-img", {
      rotationY: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power4.out",
    })
    // Badge Pop
    .to(
      ".floating-badge",
      {
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.8",
    )
    // Text Reveal
    .to(
      ".reveal-item",
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=1",
    )
    // Facts grid staggered
    .to(
      ".fact-item",
      {
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      "-=0.5",
    );

  // 3. Gorgeous Hover Animation with Mousemove (Perspective tilt)
  const aboutArea = document.getElementById("aboutInteractiveArea");
  if (aboutArea) {
    aboutArea.addEventListener("mousemove", (e) => {
      const rect = aboutArea.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calc offsets based on center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (centerY - y) / 10; // Adjust intensity
      const rotateY = (x - centerX) / 10; // Adjust intensity

      gsap.to(aboutArea, {
        rotationX: rotateX,
        rotationY: rotateY,
        scale: 1.05, // Slight Zoom-in
        duration: 0.5,
        ease: "power2.out",
      });
    });

    // Mouseleave handle: Smooth Reset
    aboutArea.addEventListener("mouseleave", () => {
      gsap.to(aboutArea, {
        rotationX: 0,
        rotationY: 0,
        scale: 1, // Full reset
        duration: 0.6,
        ease: "power4.out",
      });
    });
  }
});

// choose
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // --- 1. Three.js Background Logic ---
  const initBackground = () => {
    const container = document.getElementById("canvas-container");
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Create Grid of Points
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 1000; i++) {
      vertices.push(THREE.MathUtils.randFloatSpread(20)); // x
      vertices.push(THREE.MathUtils.randFloatSpread(20)); // y
      vertices.push(THREE.MathUtils.randFloatSpread(20)); // z
    }
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3),
    );
    const material = new THREE.PointsMaterial({
      color: "#0E4C96",
      size: 0.05,
      transparent: true,
      opacity: 0.2,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      points.rotation.y += 0.001;
      renderer.render(scene, camera);
    }
    animate();
  };
  initBackground();

  // --- 2. GSAP Reveal Animations ---
  const isMobile = window.innerWidth < 992;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".why-choose-section",
      start: "top 70%",
    },
  });

  tl.from(".reveal-up", {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
  })
    .from(
      ".reveal-left",
      {
        x: -50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
      },
      "-=0.5",
    )
    .from(
      ".reveal-right",
      {
        x: 50,
        opacity: 0,
        duration: 1,
      },
      "-=1",
    );

  // --- 3. Image Tilt Effect (Desktop Only) ---
  if (!isMobile) {
    const imgWrapper = document.querySelector(".why-image-wrapper");
    const img = document.querySelector(".custom-tilt-img");

    imgWrapper.addEventListener("mousemove", (e) => {
      const { width, height, left, top } = imgWrapper.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      gsap.to(img, {
        rotationY: x * 20,
        rotationX: -y * 20,
        ease: "power2.out",
        duration: 0.5,
      });
    });

    imgWrapper.addEventListener("mouseleave", () => {
      gsap.to(img, { rotationY: 0, rotationX: 0, duration: 0.5 });
    });
  }
});
