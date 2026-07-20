export function initAccordions() {
  document.querySelectorAll<HTMLElement>('[data-accordion]').forEach((root) => {
    const buttons = root.querySelectorAll<HTMLButtonElement>('[data-accordion-button]');

    buttons.forEach((button) => {
      if (button.dataset.bound === 'true') return;
      button.dataset.bound = 'true';

      button.addEventListener('click', () => {
        const panel = button.nextElementSibling as HTMLElement | null;
        const item = button.closest('.faq-item, .accordion-item');
        const isOpen = panel?.classList.contains('open');

        root.querySelectorAll('.accordion-panel.open').forEach((openPanel) => {
          openPanel.classList.remove('open');
        });
        root.querySelectorAll('[data-accordion-button]').forEach((openButton) => {
          openButton.setAttribute('aria-expanded', 'false');
        });
        root.querySelectorAll('.faq-item.is-open, .accordion-item.is-open').forEach((openItem) => {
          openItem.classList.remove('is-open');
        });

        if (!isOpen && panel) {
          panel.classList.add('open');
          button.setAttribute('aria-expanded', 'true');
          item?.classList.add('is-open');
        }
      });
    });
  });
}

export function initTestimonials() {
  document.querySelectorAll<HTMLElement>('[data-testimonials]').forEach((root) => {
    if (root.dataset.bound === 'true') return;
    root.dataset.bound = 'true';

    const slides = [...root.querySelectorAll<HTMLElement>('[data-testimonial-slide]')];
    const dots = [...root.querySelectorAll<HTMLButtonElement>('[data-testimonial-dot]')];
    const prev = root.querySelector<HTMLButtonElement>('[data-testimonial-prev]');
    const next = root.querySelector<HTMLButtonElement>('[data-testimonial-next]');
    let index = 0;

    const show = (nextIndex: number) => {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    };

    prev?.addEventListener('click', () => show(index - 1));
    next?.addEventListener('click', () => show(index + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
    show(0);
  });
}

export function initHeader() {
  const header = document.querySelector<HTMLElement>('.site-header');
  if (!header || header.dataset.bound === 'true') return;
  header.dataset.bound = 'true';

  const onScroll = () => {
    const solid = window.scrollY > 40;
    header.classList.toggle('is-solid', solid);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

export function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const header = document.querySelector<HTMLElement>('.site-header');
  if (!toggle || !menu || toggle.dataset.bound === 'true') return;
  toggle.dataset.bound = 'true';

  const openIcon = toggle.querySelector<HTMLElement>('[data-menu-icon="open"]');
  const closeIcon = toggle.querySelector<HTMLElement>('[data-menu-icon="close"]');

  const setOpen = (isOpen: boolean) => {
    menu.classList.toggle('hidden', !isOpen);
    menu.classList.toggle('menu-open', isOpen);
    menu.setAttribute('aria-hidden', String(!isOpen));
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    header?.classList.toggle('menu-is-open', isOpen);
    openIcon?.classList.toggle('hidden', isOpen);
    closeIcon?.classList.toggle('hidden', !isOpen);
    document.body.classList.toggle('overflow-hidden', isOpen);
  };

  toggle.addEventListener('click', () => {
    setOpen(menu.classList.contains('hidden'));
  });

  menu.querySelectorAll('[data-menu-link]').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.classList.contains('hidden')) {
      setOpen(false);
    }
  });
}

export function initBlogLoadMore() {
  const grid = document.querySelector<HTMLElement>('[data-blog-grid]');
  const button = document.querySelector<HTMLButtonElement>('[data-blog-load-more]');
  if (!grid || !button || button.dataset.bound === 'true') return;
  button.dataset.bound = 'true';

  const step = Number(grid.dataset.initial || 4);

  button.addEventListener('click', () => {
    const hidden = [...grid.querySelectorAll<HTMLElement>('[data-blog-card].is-hidden')];
    hidden.slice(0, step).forEach((card) => {
      card.classList.remove('is-hidden');
      card.classList.add('is-visible');
    });

    if (grid.querySelectorAll('[data-blog-card].is-hidden').length === 0) {
      button.hidden = true;
    }
  });
}

export function initPlatformExplorer() {
  document.querySelectorAll<HTMLElement>('[data-platform-explorer]').forEach((root) => {
    if (root.dataset.bound === 'true') return;
    root.dataset.bound = 'true';

    const tabs = [...root.querySelectorAll<HTMLButtonElement>('[data-platform-tab]')];
    const panels = [...root.querySelectorAll<HTMLElement>('[data-platform-panel]')];
    if (!tabs.length || !panels.length) return;

    const activate = (index: number) => {
      tabs.forEach((tab, i) => {
        const active = i === index;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
      });

      panels.forEach((panel, i) => {
        const active = i === index;
        panel.classList.toggle('is-active', active);
        panel.setAttribute('aria-hidden', String(!active));
        if (active) panel.removeAttribute('inert');
        else panel.setAttribute('inert', '');
      });
    };

    panels.forEach((panel, i) => {
      if (i === 0) panel.removeAttribute('inert');
      else panel.setAttribute('inert', '');
    });

    tabs.forEach((tab, index) => {
      tab.tabIndex = index === 0 ? 0 : -1;
      tab.addEventListener('click', () => activate(index));
      tab.addEventListener('keydown', (event) => {
        const nextKeys = ['ArrowDown', 'ArrowRight'];
        const prevKeys = ['ArrowUp', 'ArrowLeft'];
        if (![...nextKeys, ...prevKeys, 'Home', 'End'].includes(event.key)) return;

        event.preventDefault();
        let next = index;
        if (nextKeys.includes(event.key)) next = (index + 1) % tabs.length;
        if (prevKeys.includes(event.key)) next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        activate(next);
        tabs[next]?.focus();
      });
    });
  });
}

export function initRevealAnimations() {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!elements.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        target.classList.add('is-visible');
        observer.unobserve(target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -8% 0px',
    },
  );

  elements.forEach((el) => {
    if (el.classList.contains('is-visible')) return;
    observer.observe(el);
  });
}

export function initSiteScripts() {
  initAccordions();
  initTestimonials();
  initHeader();
  initMobileMenu();
  initBlogLoadMore();
  initPlatformExplorer();
  initRevealAnimations();
}

if (typeof window !== 'undefined') {
  initSiteScripts();
  document.addEventListener('astro:page-load', initSiteScripts);
}
