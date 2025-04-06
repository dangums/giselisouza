import { config } from './config.js';

// Update colors from config
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  root.style.setProperty('--primary', config.colors.primary);
  root.style.setProperty('--primary-light', `${config.colors.primary}18`);
  root.style.setProperty('--secondary', config.colors.secondary);
  root.style.setProperty('--secondary-light', `${config.colors.secondary}18`);
  root.style.setProperty('--light', config.colors.light);
  root.style.setProperty('--dark', config.colors.dark);
  root.style.setProperty('--glass', config.colors.glass); 
  
  // Update content
  updateContentFromConfig();

  // Initialize typing effect
  initTypingEffect();

  // Form handling
  initFormHandling();

  // Smooth scrolling for anchor links
  initSmoothScrolling();

  initImageAnimation();
});

// Função para animação da imagem ao rolar a página
function initImageAnimation() {
  const photoContainer = document.querySelector(".photo-container");
  const profileImage = document.querySelector(".profile-image");

  if (!photoContainer || !profileImage) {
    console.error("Elementos não encontrados");
    return;
  }

  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Observador de interseção para mobile
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          profileImage.classList.add("visible");
          observer.unobserve(entry.target); // Para de observar após a animação
        }
      });
    }, {
      threshold: 0.8 // Dispara quando 80% do container estiver visível
    });

    observer.observe(photoContainer);
  } else {
    // Animação original para desktop
    const aboutSection = document.querySelector(".glass-panel.about-panel");
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          profileImage.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

  if (aboutSection) observer.observe(aboutSection);
}


  function checkScroll() {
    const rect = aboutSection.getBoundingClientRect();

    console.log("Top:", rect.top, "Bottom:", rect.bottom, "Window Height:", window.innerHeight);

    // Se pelo menos 70% da seção "Sobre Mim" estiver visível, ativa a animação
    const sectionHeight = rect.bottom - rect.top;
    const visibleHeight = Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top);
    const visibilityRatio = visibleHeight / sectionHeight;

    console.log("🔍 Visibility Ratio:", visibilityRatio);

    if (visibilityRatio >= 0.7) {
      profileImage.classList.add("visible");
      console.log("✅ Classe 'visible' adicionada!");
      window.removeEventListener("scroll", checkScroll); // Para de escutar o scroll após a animação
    }
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll(); // Verifica no carregamento da página
}

function updateContentFromConfig() {
  document.title = `${config.content.name} - ${config.content.title}`;
  // Update other content as needed
}

function initTypingEffect() {
  const typingText = document.getElementById('typingText');
  const text = config.content.name;
  let index = 0;
  
  function type() {
    if (index < text.length) {
      typingText.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }
  
  type();
}

function initFormHandling() {
  const form = document.querySelector('.contact-form');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Simulate form submission
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.textContent = 'Enviando...';
      submitButton.disabled = true;
      
      try {
        // In a real scenario, you'd replace this with an actual API endpoint
        // Simulating network request
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        alert('Mensagem enviada com sucesso! Dra. Johnson entrará em contato em breve.');
        form.reset();
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        alert('Houve um erro ao enviar sua mensagem. Por favor, tente novamente.');
      } finally {
        submitButton.textContent = 'Enviar Mensagem';
        submitButton.disabled = false;
      }
    });
  }
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // Adjust for fixed navbar
          behavior: 'smooth'
        });
      }
    });
  });
}

// Add scroll reveal animations
window.addEventListener('scroll', () => {
  const glassElements = document.querySelectorAll('.glass-panel');
  
  glassElements.forEach(element => {
    const position = element.getBoundingClientRect();
    
    // If element is in viewport
    if(position.top < window.innerHeight && position.bottom >= 0) {
      element.classList.add('visible');
    }
  });
});