(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const reveal = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveal.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    reveal.forEach((el) => io.observe(el));
  } else {
    reveal.forEach((el) => el.classList.add("in"));
  }

  const screens = document.querySelectorAll(".screens img");
  if (screens.length > 1 && !reduce) {
    let i = 0;
    setInterval(() => {
      screens[i].classList.remove("is-on");
      i = (i + 1) % screens.length;
      screens[i].classList.add("is-on");
    }, 3200);
  }

  const device = document.querySelector(".device-wrap");
  if (device && !reduce) {
    device.addEventListener("pointermove", (e) => {
      const r = device.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      device.style.setProperty("--tilt-x", `${y * -6}deg`);
      device.style.setProperty("--tilt-y", `${x * 8}deg`);
    });
    device.addEventListener("pointerleave", () => {
      device.style.setProperty("--tilt-x", "0deg");
      device.style.setProperty("--tilt-y", "0deg");
    });
  }
})();
