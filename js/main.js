/* =========================================================
   Alva & Siri – interaktion och animationer
   Ren JavaScript, inga bibliotek. Allt innehåll syns även
   om skriptet inte laddas.
   ========================================================= */
(() => {
  "use strict";

  window.__as = true; // talar om för <head>-skriptet att JS laddades

  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Header: bakgrund vid scroll, döljs vid scroll nedåt ---------- */
  const header = $("[data-header]");
  if (header) {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 24);
      const goingDown = y > lastY + 4;
      const goingUp = y < lastY - 4;
      if (goingDown && y > 420 && !root.classList.contains("menu-open")) header.classList.add("is-hidden");
      else if (goingUp || y < 420) header.classList.remove("is-hidden");
      lastY = y;
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    header.addEventListener("focusin", () => header.classList.remove("is-hidden"));
    update();
  }

  /* ---------- Mobilmeny ---------- */
  const toggle = $(".menu-toggle");
  const menu = $("#mobile-menu");
  if (toggle && menu) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Stäng meny" : "Öppna meny");
      menu.classList.toggle("is-open", open);
      menu.inert = !open;
      root.classList.toggle("menu-open", open);
      document.body.style.overflow = open ? "hidden" : "";
      if (open) setTimeout(() => $("a", menu)?.focus({ preventScroll: true }), 350);
    };
    menu.inert = true;
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    $$("a", menu).forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia("(min-width: 960px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
  }

  /* ---------- Scroll-reveal, linjeteckningar och stagger ---------- */
  $$("[data-stagger]").forEach((group) => {
    Array.from(group.children).forEach((child, i) => child.style.setProperty("--i", i));
  });
  $$(".draw, .draw-auto").forEach((svg) => {
    $$("[pathLength]", svg).forEach((el, k) => el.style.setProperty("--k", k));
  });

  const revealTargets = $$("[data-reveal], .draw, [data-visible]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.matches(".draw")) el.classList.add("is-drawn");
        el.classList.add("is-visible");
        el.dispatchEvent(new CustomEvent("reveal"));
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible", "is-drawn"));
  }

  /* ---------- Parallax ---------- */
  const parallaxEls = $$("[data-parallax]");
  if (parallaxEls.length && !reduceMotion) {
    let ticking = false;
    const run = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const frame = el.parentElement.getBoundingClientRect();
        if (frame.bottom < -100 || frame.top > vh + 100) return;
        const speed = parseFloat(el.dataset.parallax) || 0.08;
        const progress = (frame.top + frame.height / 2 - vh / 2) / vh; // -1 … 1
        el.style.setProperty("--py", `${(-progress * frame.height * speed).toFixed(1)}px`);
      });
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(run); ticking = true; } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    run();
  }

  /* ---------- Tidslinje (retreatsidan): linjen ritas fram när man scrollar ---------- */
  const timeline = $("[data-timeline]");
  if (timeline) {
    const progress = $(".timeline__progress", timeline);
    if (reduceMotion) progress.style.setProperty("--progress", "1");
    else {
      let ticking = false;
      const run = () => {
        const r = timeline.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
        progress.style.setProperty("--progress", p.toFixed(3));
        ticking = false;
      };
      window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(run); ticking = true; } }, { passive: true });
      run();
    }
  }

  /* ---------- Räkna upp siffror när de syns ---------- */
  const countUp = (el, target, duration = 1400) => {
    if (reduceMotion) { el.textContent = target; return; }
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = Math.round(target * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ---------- Nedräkning till retreat ---------- */
  // Datum anges i HTML: data-countdown="2026-10-23" data-countdown-end="2026-10-25"
  const dayDiff = (iso) => {
    const [y, m, d] = iso.split("-").map(Number);
    const target = new Date(y, m - 1, d);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((target - today) / 86400000);
  };
  $$("[data-countdown]").forEach((box) => {
    const days = dayDiff(box.dataset.countdown);
    const daysToEnd = dayDiff(box.dataset.countdownEnd || box.dataset.countdown);
    const num = $("[data-countdown-num]", box);
    const label = $("[data-countdown-label]", box);
    const pre = $("[data-countdown-pre]", box);
    if (daysToEnd < 0) { box.hidden = true; return; }      // retreaten har varit
    if (days <= 0) {                                         // pågår just nu
      if (pre) pre.textContent = "";
      num.textContent = days === 0 ? "Idag" : "Pågår";
      if (label) label.textContent = days === 0 ? "kör vi!" : "just nu";
      return;
    }
    if (label) label.textContent = days === 1 ? "dag" : "dagar";
    num.textContent = "0";
    const go = () => countUp(num, days);
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { go(); io.disconnect(); } }, { threshold: 0.5 });
      io.observe(box);
    } else go();
  });

  /* ---------- Menscykeln: ring, flikar och kort ---------- */
  const cycle = $("[data-cycle]");
  if (cycle) {
    const tabs = $$("[role=tab]", cycle);
    const cards = $$(".phase-card", cycle);
    const ring = $(".ring", cycle);
    const segs = $$(".ring__seg", cycle);
    const centerInner = $(".cycle__center-inner", cycle);
    const scroller = $(".cycle__cards", cycle);
    const dots = $$(".cycle__dots button", cycle);
    const desktop = window.matchMedia("(min-width: 960px)");
    let active = 0;
    let autoTimer = null;
    let userTookOver = false;

    // 28 små prickar runt ringen – en för varje dag i en "typisk" cykel
    const daysGroup = $(".ring__days", cycle);
    if (daysGroup) {
      const ns = "http://www.w3.org/2000/svg";
      for (let d = 0; d < 28; d++) {
        const a = (d / 28) * Math.PI * 2 - Math.PI / 2 + 0.06;
        const c = document.createElementNS(ns, "circle");
        const key = d === 0 || d === 13;
        c.setAttribute("cx", (200 + Math.cos(a) * 192).toFixed(2));
        c.setAttribute("cy", (200 + Math.sin(a) * 192).toFixed(2));
        c.setAttribute("r", key ? 3.2 : 1.8);
        c.setAttribute("class", key ? "ring__day ring__day--key" : "ring__day");
        daysGroup.appendChild(c);
      }
    }

    const setActive = (i, { focus = false, fromScroll = false } = {}) => {
      active = (i + cards.length) % cards.length;
      tabs.forEach((t, k) => {
        t.setAttribute("aria-selected", String(k === active));
        t.tabIndex = k === active ? 0 : -1;
      });
      cards.forEach((c, k) => c.classList.toggle("is-active", k === active));
      segs.forEach((s, k) => s.classList.toggle("is-active", k === active));
      ring?.classList.add("has-active");
      dots.forEach((d, k) => d.setAttribute("aria-current", String(k === active)));
      if (focus) tabs[active].focus();

      // Mitten av ringen: tona ut, byt text, tona in
      if (centerInner) {
        const card = cards[active];
        centerInner.classList.add("is-switching");
        setTimeout(() => {
          $(".cycle__center-season", centerInner).textContent = card.dataset.season;
          $(".cycle__center-phase", centerInner).textContent = card.dataset.phase;
          $(".cycle__center-days", centerInner).textContent = card.dataset.days;
          const icon = $(".phase-card__icon", card);
          const iconBox = $(".cycle__center-icon", centerInner);
          iconBox.innerHTML = icon ? icon.outerHTML : "";
          iconBox.style.setProperty("--c", getComputedStyle(card).getPropertyValue("--c"));
          centerInner.classList.remove("is-switching");
        }, 320);
      }

      // Mobil: skrolla till kortet om valet inte kom från en swipe
      if (!desktop.matches && scroller && !fromScroll) {
        scroller.scrollTo({ left: cards[active].offsetLeft - scroller.offsetLeft - parseFloat(getComputedStyle(scroller).paddingLeft), behavior: reduceMotion ? "auto" : "smooth" });
      }
    };

    const stopAuto = () => { clearInterval(autoTimer); autoTimer = null; };
    const takeOver = () => { userTookOver = true; stopAuto(); };
    const startAuto = () => {
      if (reduceMotion || userTookOver || autoTimer || !desktop.matches) return;
      autoTimer = setInterval(() => setActive(active + 1), 4800);
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => { takeOver(); setActive(i); });
      tab.addEventListener("keydown", (e) => {
        const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
        if (e.key in keys) { e.preventDefault(); takeOver(); setActive(active + keys[e.key], { focus: true }); }
        if (e.key === "Home") { e.preventDefault(); takeOver(); setActive(0, { focus: true }); }
        if (e.key === "End") { e.preventDefault(); takeOver(); setActive(cards.length - 1, { focus: true }); }
      });
    });
    segs.forEach((seg, i) => {
      seg.addEventListener("click", () => { takeOver(); setActive(i); });
      seg.addEventListener("mouseenter", () => { if (desktop.matches) { takeOver(); setActive(i); } });
    });
    dots.forEach((dot, i) => dot.addEventListener("click", () => setActive(i)));

    // Mobil: uppdatera prickarna när man swipar
    if (scroller) {
      let raf = null;
      scroller.addEventListener("scroll", () => {
        if (desktop.matches) return;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const mid = scroller.scrollLeft + scroller.clientWidth / 2;
          let best = 0, bestDist = Infinity;
          cards.forEach((c, k) => {
            const d = Math.abs(c.offsetLeft - scroller.offsetLeft + c.offsetWidth / 2 - mid);
            if (d < bestDist) { bestDist = d; best = k; }
          });
          if (best !== active) setActive(best, { fromScroll: true });
        });
      }, { passive: true });
    }

    setActive(0);

    // När ringen syns: rita segmenten ett i taget, sedan ett långsamt varv
    if ("IntersectionObserver" in window && ring) {
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          ring.classList.add("is-drawn");
          setTimeout(startAuto, reduceMotion ? 0 : 1800);
        } else stopAuto();
      }, { threshold: 0.35 });
      io.observe(cycle);
    } else ring?.classList.add("is-drawn");
    desktop.addEventListener("change", () => { if (!desktop.matches) stopAuto(); });
  }

  /* ---------- Citatkarusell ---------- */
  const carousel = $("[data-carousel]");
  if (carousel) {
    const slides = $$(".quote", carousel);
    const dotsWrap = $(".quotes__dots", carousel);
    const live = $(".quotes__viewport", carousel);
    let index = 0;
    const dots = slides.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Visa citat ${i + 1} av ${slides.length}`);
      b.addEventListener("click", () => { go(i); });
      dotsWrap.appendChild(b);
      return b;
    });
    const go = (i) => {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, k) => {
        s.classList.toggle("is-active", k === index);
        s.setAttribute("aria-hidden", String(k !== index));
      });
      dots.forEach((d, k) => d.setAttribute("aria-current", String(k === index)));
    };
    $("[data-prev]", carousel).addEventListener("click", () => go(index - 1));
    $("[data-next]", carousel).addEventListener("click", () => go(index + 1));

    // Automatisk bläddring styrs av förloppsstapeln i aktiv prick
    if (!reduceMotion) {
      carousel.classList.add("is-playing");
      live.setAttribute("aria-live", "off");
      dotsWrap.addEventListener("animationend", () => go(index + 1));
      const pause = () => carousel.classList.add("is-paused");
      const resume = () => { if (!carousel.matches(":hover") && !carousel.contains(document.activeElement)) carousel.classList.remove("is-paused"); };
      carousel.addEventListener("mouseenter", pause);
      carousel.addEventListener("mouseleave", resume);
      carousel.addEventListener("focusin", pause);
      carousel.addEventListener("focusout", () => setTimeout(resume, 0));
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(([e]) => e.isIntersecting ? resume() : pause(), { threshold: 0.3 }).observe(carousel);
      }
    } else {
      live.setAttribute("aria-live", "polite");
    }

    // Swipe på mobil
    let startX = null;
    carousel.addEventListener("pointerdown", (e) => { startX = e.clientX; });
    carousel.addEventListener("pointerup", (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1));
      startX = null;
    });
    go(0);
  }

  /* ---------- Dragspel (vanliga frågor) med mjuk animation ---------- */
  $$(".faq__item").forEach((item) => {
    const summary = $("summary", item);
    const content = $(".faq__content", item);
    let anim = null;
    summary.addEventListener("click", (e) => {
      if (reduceMotion || !content.animate) return;
      e.preventDefault();
      const closing = item.classList.contains("is-closing");
      const from = anim ? content.offsetHeight : null;
      anim?.cancel();
      anim = null;
      if (item.open && !closing) {
        // Stäng: ikonen vrids tillbaka direkt, innehållet glider ihop
        item.classList.add("is-closing");
        anim = content.animate(
          [{ height: `${from ?? content.offsetHeight}px`, opacity: 1 }, { height: "0px", opacity: 0 }],
          { duration: 450, easing: "cubic-bezier(.65,0,.35,1)" }
        );
        anim.onfinish = () => { item.open = false; item.classList.remove("is-closing"); anim = null; };
      } else {
        item.classList.remove("is-closing");
        item.open = true;
        const h = content.offsetHeight;
        anim = content.animate(
          [{ height: `${from ?? 0}px`, opacity: from ? 1 : 0 }, { height: `${h}px`, opacity: 1 }],
          { duration: 550, easing: "cubic-bezier(.22,1,.36,1)" }
        );
        anim.onfinish = () => { anim = null; };
      }
    });
  });

  /* ---------- Årtal i footern ---------- */
  $$("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* ---------- Anmälningsformulär ---------- */
  const form = $("[data-interest-form]");
  if (form) {
    const select = $("#retreat", form);
    const summaryImg = $("[data-summary-img]");
    const summaryBody = $("[data-summary-body]");
    const successBox = $("[data-success]");
    const card = $(".form-card");

    // Förval via ?retreat= i adressen (t.ex. anmal.html?retreat=var-2027)
    const wanted = new URLSearchParams(location.search).get("retreat");
    if (wanted && $(`option[value="${CSS.escape(wanted)}"]`, select)) select.value = wanted;

    const renderSummary = (animate) => {
      const opt = select.selectedOptions[0];
      const d = opt.dataset;
      const apply = () => {
        $("[data-s-tag]").textContent = d.tag;
        $("[data-s-name]").textContent = d.name;
        $("[data-s-date]").textContent = d.date;
        $("[data-s-place]").textContent = d.place;
        $("[data-s-price]").textContent = d.price;
      };
      if (!animate || reduceMotion) {
        apply();
        summaryImg.src = d.image;
        summaryImg.alt = d.alt;
        return;
      }
      summaryBody.classList.add("is-switching");
      summaryImg.classList.add("is-fading");
      setTimeout(() => {
        apply();
        summaryBody.classList.remove("is-switching");
        const done = () => summaryImg.classList.remove("is-fading");
        if (summaryImg.getAttribute("src") === d.image) done();
        else { summaryImg.onload = done; summaryImg.src = d.image; summaryImg.alt = d.alt; }
      }, 350);
    };
    select.addEventListener("change", () => renderSummary(true));
    renderSummary(false);

    // Validering med vänliga meddelanden
    const messages = {
      namn: { valueMissing: "Vad heter du? Vi vill gärna veta vem vi pratar med." },
      epost: {
        valueMissing: "Vi behöver din e-post för att kunna svara dig.",
        typeMismatch: "Hmm, den e-postadressen ser inte riktigt rätt ut. Kolla en gång till?",
      },
      telefon: { patternMismatch: "Telefonnumret verkar inte stämma – skriv gärna bara siffror." },
      villkor: { valueMissing: "Kryssa i rutan så vet vi att du har läst." },
    };
    const wrapOf = (input) => input.closest(".field, .check-wrap");
    const validate = (input) => {
      const wrap = wrapOf(input);
      const error = wrap && $(".field__error", wrap);
      if (!wrap || !error) return true;
      let msg = "";
      if (!input.validity.valid) {
        const m = messages[input.name] || {};
        const key = ["valueMissing", "typeMismatch", "patternMismatch"].find((k) => input.validity[k]);
        msg = m[key] || "Kolla det här fältet en gång till.";
      }
      error.textContent = msg;
      wrap.classList.toggle("is-invalid", !!msg);
      input.setAttribute("aria-invalid", String(!!msg));
      return !msg;
    };
    const inputs = $$("input[name], textarea[name]", form).filter((i) => i.type !== "radio");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => { if (input.value || input.type === "checkbox") validate(input); });
      input.addEventListener("input", () => { if (wrapOf(input)?.classList.contains("is-invalid")) validate(input); });
      input.addEventListener("change", () => { if (input.type === "checkbox") validate(input); });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const invalid = inputs.filter((i) => !validate(i));
      if (invalid.length) {
        const first = invalid[0];
        const wrap = wrapOf(first);
        first.focus();
        if (!reduceMotion) {
          wrap.classList.remove("shake");
          void wrap.offsetWidth;
          wrap.classList.add("shake");
        }
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());
      data.retreatNamn = select.selectedOptions[0].dataset.name;
      data.skickad = new Date().toISOString();

      /* ------------------------------------------------------------
         HÄR KOPPLAR NI IN EN RIKTIG FORMULÄRTJÄNST SENARE
         Just nu finns ingen server, så anmälan sparas bara i den här
         webbläsaren (localStorage) och skrivs ut i konsolen.
         Exempel med Formspree (https://formspree.io):
           await fetch("https://formspree.io/f/ERT-ID", {
             method: "POST",
             headers: { "Accept": "application/json" },
             body: new FormData(form),
           });
         ------------------------------------------------------------ */
      try {
        const key = "alvaSiri.intresseanmalningar";
        const saved = JSON.parse(localStorage.getItem(key) || "[]");
        saved.push(data);
        localStorage.setItem(key, JSON.stringify(saved));
      } catch (_) { /* privat läge eller blockerad lagring – gör inget */ }
      console.info("Intresseanmälan (sparad lokalt):", data);

      const btn = $("button[type=submit]", form);
      btn.classList.add("is-loading");
      btn.setAttribute("aria-busy", "true");

      setTimeout(() => {
        $("[data-success-name]").textContent = (data.namn || "").trim().split(/\s+/)[0] || "du";
        $("[data-success-retreat]").textContent = data.retreatNamn;
        card.classList.add("is-leaving");
        setTimeout(() => {
          card.hidden = true;
          successBox.hidden = false;
          requestAnimationFrame(() => successBox.classList.add("is-shown"));
          successBox.focus({ preventScroll: true });
          window.scrollTo({ top: Math.max(0, successBox.getBoundingClientRect().top + window.scrollY - 120), behavior: reduceMotion ? "auto" : "smooth" });
        }, reduceMotion ? 0 : 500);
      }, reduceMotion ? 0 : 900);
    });
  }
})();
