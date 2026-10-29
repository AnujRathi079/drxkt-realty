(() => {
  "use strict";
  const config = window.DRXKT_CONFIG || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Mobile navigation
  const menuToggle = $("#menuToggle");
  const navLinks = $("#navLinks");
  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  $$("#navLinks a").forEach(link => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }));

  // Staggered reveal animation, with a graceful fallback.
  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 3, 2) * 90}ms`;
      observer.observe(el);
    });
  } else {
    revealItems.forEach(el => el.classList.add("visible"));
  }

  // Subtle cursor glow on desktop.
  const glow = $(".cursor-glow");
  if (glow && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", e => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    }, { passive: true });
  }

  // Property filters.
  const locationFilter = $("#locationFilter");
  const typeFilter = $("#typeFilter");
  const budgetFilter = $("#budgetFilter");
  const cards = $$(".property-card");
  const resultCount = $("#resultCount");
  function filterProperties() {
    const location = locationFilter.value;
    const type = typeFilter.value;
    const budget = budgetFilter.value;
    let visible = 0;
    cards.forEach(card => {
      const match = (location === "all" || card.dataset.location === location) &&
        (type === "all" || card.dataset.type === type) &&
        (budget === "all" || card.dataset.budget === budget);
      card.classList.toggle("is-hidden", !match);
      if (match) visible++;
    });
    resultCount.textContent = `${String(visible).padStart(2, "0")} MATCHING ${visible === 1 ? "OPPORTUNITY" : "OPPORTUNITIES"}`;
  }
  [locationFilter, typeFilter, budgetFilter].forEach(el => el.addEventListener("change", filterProperties));
  $("#searchBtn")?.addEventListener("click", () => {
    filterProperties();
    $("#properties").scrollIntoView({ behavior: "smooth" });
  });
  $("#resetFilters")?.addEventListener("click", () => {
    locationFilter.value = "all"; typeFilter.value = "all"; budgetFilter.value = "all";
    filterProperties();
  });

  // Schematic area explorer.
  const areaInfo = {
    expressway: { title: "Dwarka Expressway" },
    gurugram: { title: "Gurugram" },
    manesar: { title: "Manesar & GIC" }
  };
  function selectArea(area) {
    const info = areaInfo[area];
    if (!info) return;
    $("#areaTitle").textContent = info.title;
    $$(".area-item").forEach(el => el.classList.toggle("active", el.dataset.area === area));
    $$(".map-node").forEach(el => el.classList.toggle("active", el.dataset.node === area));
  }
  $$(".area-item").forEach(el => el.addEventListener("click", () => selectArea(el.dataset.area)));
  $$(".map-node").forEach(el => el.addEventListener("click", () => selectArea(el.dataset.node)));

  // Contact actions. Form data is prepared in WhatsApp; it is never silently sent.
  const whatsapp = String(config.whatsappNumber || "919813327686").replace(/\D/g, "");
  const directWhatsapp = $("#directWhatsapp");
  const floatingWhatsapp = $("#floatingWhatsapp");
  const defaultMessage = "Hello DRXKT Realty, I'd like to know more about your properties.";
  const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(defaultMessage)}`;
  if (directWhatsapp) directWhatsapp.href = waUrl;
  if (floatingWhatsapp) floatingWhatsapp.href = waUrl;

  const form = $("#contactForm");
  form?.addEventListener("submit", async event => {
    event.preventDefault();
    const data = new FormData(form);
    const value = key => String(data.get(key) || "").trim();
    const message = [
      "Hello DRXKT Realty, I'd like to enquire about a property.",
      `Name: ${value("name")}`,
      `Phone: ${value("phone")}`,
      `Email: ${value("email") || "Not provided"}`,
      `Requirement: ${value("requirement")}`,
      `Preferred location: ${value("location") || "Not specified"}`,
      `Budget: ${value("budget") || "Not specified"}`,
      `Message: ${value("message") || "No additional message"}`
    ].join("\n");
    const status = $("#formStatus");
    status.textContent = "Opening WhatsApp with your enquiry…";
    const target = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
    const newWindow = window.open(target, "_blank", "noopener,noreferrer");
    if (!newWindow) {
      status.textContent = "Pop-up blocked. Use the WhatsApp link below to continue.";
      status.style.color = "#a45a22";
      return;
    }
    status.textContent = "Your enquiry is prepared in WhatsApp. Review it and press Send to submit.";
    status.style.color = "#496c37";
  });

  // Social links are shown only when real URLs are configured.
  [["instagramUrl", "#instagramLink"], ["facebookUrl", "#facebookLink"]].forEach(([key, selector]) => {
    const url = String(config[key] || "").trim();
    const link = $(selector);
    if (link && /^https:\/\/(www\.)?(instagram\.com|facebook\.com)\//i.test(url)) {
      link.href = url;
      link.hidden = false;
    }
  });
  $("#year").textContent = new Date().getFullYear();
  filterProperties();
  selectArea("expressway");
})();