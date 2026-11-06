/**
 * Main JavaScript for Idiomas Sousa Website
 * Interatividade refinada: Menu responsivo, Header dinâmico, Acordeão FAQ,
 * Filtro de Cursos, Cópia rápida e Integração WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // 2. Active Link Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-link');
  
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // 3. Header Glassmorphism Scroll Effect
  const header = document.querySelector('.global-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 4. Interactive FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.accordion-item');
      if (!parent) return;

      const isOpen = parent.classList.contains('open');

      // Fechar outros itens abertos para manter visual organizado
      document.querySelectorAll('.accordion-item.open').forEach(item => {
        if (item !== parent) {
          item.classList.remove('open');
        }
      });

      parent.classList.toggle('open', !isOpen);
    });
  });

  // 5. Interactive Course Filter Tabs (cursos.html)
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const courseCards = document.querySelectorAll('[data-course-category]');

  if (filterBtns.length > 0 && courseCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter') || 'all';

        courseCards.forEach(card => {
          const cardCats = card.getAttribute('data-course-category') || '';
          if (category === 'all' || cardCats.includes(category)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 6. Quick Copy to Clipboard (contato.html)
  const copyButtons = document.querySelectorAll('.btn-copy');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy') || '';
      if (textToCopy && navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '✓ Copiado!';
          btn.style.backgroundColor = '#ecfdf5';
          btn.style.color = '#059669';
          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.backgroundColor = '';
            btn.style.color = '';
          }, 2000);
        });
      }
    });
  });

  // 7. Contact Form Submission (Mock & WhatsApp Redirect)
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nome = document.getElementById('nome')?.value.trim() || '';
      const whatsapp = document.getElementById('whatsapp')?.value.trim() || '';
      const idioma = document.getElementById('idioma')?.value || 'Inglês';
      const modalidade = document.getElementById('modalidade')?.value || 'Grupo';
      const mensagem = document.getElementById('mensagem')?.value.trim() || '';

      const encodedMsg = encodeURIComponent(
        `Olá! Meu nome é ${nome}. Gostaria de informações sobre o curso de ${idioma} (Modalidade: ${modalidade}). ${mensagem ? 'Mensagem: ' + mensagem : ''}`
      );
      const waUrl = `https://wa.me/5583999999999?text=${encodedMsg}`;

      if (formFeedback) {
        formFeedback.style.display = 'block';
        formFeedback.innerHTML = `Obrigado, <strong>${nome}</strong>! Sua mensagem foi preparada. Abrindo o WhatsApp da escola...`;
      }

      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 1000);
    });
  }

  // 8. Efeito Cinematográfico de Partículas & Luzes Estelares Sutis na Hero
  const heroCanvas = document.querySelector('.hero-particles-canvas');
  if (heroCanvas) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      const ctx = heroCanvas.getContext('2d');
      let animationFrameId = null;
      let width = 0;
      let height = 0;
      let dpr = 1;

      // Partículas discretas (pequenos pontos luminosos semelhantes a estrelas/poeira de luz)
      const PARTICLE_COUNT = 32;
      const particles = [];

      // Paleta sutil de iluminação: dourado suave, marfim estelar, azul cristalino
      const particleColors = [
        '255, 250, 235', // Marfim estelar
        '255, 236, 179', // Dourado suave/champagne
        '224, 242, 254', // Azul cristalino sutil
        '255, 255, 255'  // Branco puro suave
      ];

      function resizeCanvas() {
        const parent = heroCanvas.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        dpr = Math.min(window.devicePixelRatio || 1, 2);

        heroCanvas.width = width * dpr;
        heroCanvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }

      function createParticle(initial = false) {
        return {
          x: Math.random() * width,
          y: initial ? Math.random() * height : height + Math.random() * 20,
          radius: 0.75 + Math.random() * 1.5, // 0.75px a 2.25px (muito delicadas)
          baseAlpha: 0.15 + Math.random() * 0.35, // Opacidade suave
          pulseSpeed: 0.010 + Math.random() * 0.018, // Velocidade suave de pulso/brilho
          phase: Math.random() * Math.PI * 2, // Ponto de partida da fase
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          vx: (Math.random() - 0.5) * 0.14, // Movimento horizontal quase imperceptível
          vy: -(0.10 + Math.random() * 0.20), // Flutuação suave ascendente
          glow: Math.random() > 0.45 // Halo sutil
        };
      }

      function initParticles() {
        particles.length = 0;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          particles.push(createParticle(true));
        }
      }

      let isPaused = false;

      function render() {
        if (isPaused) return;

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Atualiza pulso e posição
          p.phase += p.pulseSpeed;
          p.x += p.vx;
          p.y += p.vy;

          // Cálculo suave do brilho (oscilação senoidal suave)
          const pulse = (Math.sin(p.phase) + 1) / 2;
          const currentAlpha = p.baseAlpha * (0.35 + 0.65 * pulse);

          // Desenho da partícula
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

          if (p.glow && pulse > 0.45) {
            ctx.shadowBlur = p.radius * 3.2;
            ctx.shadowColor = `rgba(${p.color}, ${(currentAlpha * 0.7).toFixed(3)})`;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.fillStyle = `rgba(${p.color}, ${currentAlpha.toFixed(3)})`;
          ctx.fill();

          // Reseta quando sai da tela
          if (p.y < -15 || p.x < -15 || p.x > width + 15) {
            particles[i] = createParticle(false);
          }
        }

        animationFrameId = requestAnimationFrame(render);
      }

      resizeCanvas();
      initParticles();
      render();

      // Responsividade e redimensionamento inteligente
      let resizeTimeout = null;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          resizeCanvas();
          initParticles();
        }, 150);
      }, { passive: true });

      // Pausa quando a aba não está visível para economia de CPU/bateria
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          isPaused = true;
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }
        } else {
          isPaused = false;
          render();
        }
      });
    }
  }
});
