'use strict';

// Reading, navigation, project details and contact links work without this file.
const header = document.querySelector('.site-header');
const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
const sections = [...document.querySelectorAll('[data-nav-section]')];

if (header) {
  let framePending = false;
  const updateNavigation = () => {
    framePending = false;
    const offset = header.getBoundingClientRect().height + 70;
    let activeId = '';
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= offset) activeId = section.id;
    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
      activeId = sections.at(-1)?.id ?? activeId;
    }
    for (const link of navLinks) {
      if (link.hash === `#${activeId}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  const queueUpdate = () => {
    if (!framePending) {
      framePending = true;
      requestAnimationFrame(updateNavigation);
    }
  };
  const updateHeaderHeight = () => {
    document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
    queueUpdate();
  };
  window.addEventListener('scroll', queueUpdate, { passive: true });
  window.addEventListener('resize', updateHeaderHeight, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(updateHeaderHeight).observe(header);
  updateHeaderHeight();
}

const copyButton = document.querySelector('[data-copy-email]');
const copyStatus = document.querySelector('.copy-status');
if (copyButton && copyStatus) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    copyButton.disabled = true;
    copyStatus.textContent = '';
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(copyButton.dataset.copyEmail);
      copyStatus.textContent = 'Email copied.';
    } catch {
      copyStatus.textContent = 'Could not copy. Select the email above or open your email app.';
    } finally {
      copyButton.disabled = false;
    }
  });
}
