window.productTour = {
  async init({ userId = null, hasConsent = false }) {
    const domain = window.location.hostname;
    const path = window.location.pathname;

    if (!hasConsent) return;

    try {
      const res = await fetch(`https://api.yourdomain.com/tour?domain=${domain}&path=${path}`);
      if (!res.ok) return;
      const steps = await res.json();

      if (!steps?.length) return;

      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        const el = document.querySelector(step.selector);
        if (!el) continue;

        const tooltip = document.createElement("div");
        tooltip.className = "product-tour-tooltip";
        tooltip.innerHTML = step.text;
        tooltip.style.cssText = `
          position: absolute;
          background: #000;
          color: #fff;
          padding: 8px;
          border-radius: 4px;
          font-size: 14px;
          z-index: 9999;
        `;

        el.appendChild(tooltip);

        fetch("https://api.yourdomain.com/tour-analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "step_viewed",
            userId,
            tourId: step.tourId,
            selector: step.selector,
            stepIndex: i + 1,
            timestamp: new Date().toISOString()
          })
        });
      }
    } catch (err) {
      console.error("ProductTour error:", err);
    }
  }
};
