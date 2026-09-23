const examples = {
  build: {
    prompt: '“I have an idea for a study workspace, but I don’t know where to start.”',
    response: 'Let’s find the one flow that matters first: capture a source, turn it into a question, and return to it when it counts.',
    result: 'A focused first version, built and tested.',
    title: 'Reference → Revision',
    caption: 'A working page'
  },
  learn: {
    prompt: '“Why do metals conduct heat better than non-metals?”',
    response: 'Let’s start with mobile electrons carrying energy, then add the role of vibrations in the metal lattice.',
    result: 'A clear explanation you can use and remember.',
    title: 'From question → clarity',
    caption: 'An explanation that sticks'
  },
  fix: {
    prompt: '“This layout falls apart on my phone. Can you fix it?”',
    response: 'I’ll reproduce the problem at narrow widths, adjust the layout, and check the interaction with a keyboard too.',
    result: 'A specific change with a visible check.',
    title: 'Issue → tested fix',
    caption: 'A sturdier interface'
  }
};

const tabs = [...document.querySelectorAll('.example-tab')];
const panel = document.getElementById('example-panel');

function selectExample(tab, moveFocus = false) {
  const selected = examples[tab.dataset.example];
  if (!selected) return;
  tabs.forEach((item) => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
  });
  panel.setAttribute('aria-labelledby', tab.id);
  panel.dataset.example = tab.dataset.example;
  document.getElementById('example-prompt').textContent = selected.prompt;
  document.getElementById('example-response').textContent = selected.response;
  document.getElementById('example-result').textContent = selected.result;
  document.getElementById('artifact-title').textContent = selected.title;
  document.getElementById('artifact-caption').textContent = selected.caption;
  if (moveFocus) tab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectExample(tab));
  tab.addEventListener('keydown', (event) => {
    let nextIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else return;
    event.preventDefault();
    selectExample(tabs[nextIndex], true);
  });
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, current) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        current.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('in-view'));
}

const header = document.querySelector('.site-header');
const setHeaderState = () => header.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', setHeaderState, { passive: true });
setHeaderState();
