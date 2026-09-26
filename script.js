// ============================================
// MENÚ RESPONSIVE
// ============================================
const navToggle = document.getElementById('navToggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const abierto = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  });

  // Cierra el menú al elegir un enlace (útil en mobile)
  mainNav.querySelectorAll('a').forEach((enlace) => {
    enlace.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============================================
// FORMULARIO DE CONTACTO
// Como aún no hay backend, el formulario arma un mensaje
// y lo envía directo por WhatsApp al número de Renzo y Rosita.
// ============================================
const WHATSAAP_NUMEROS = {
  renzo: '56993829933',
  rosita: '56940345771'
};

const formContacto = document.getElementById('formContacto');
const formEstado = document.getElementById('formEstado');

if (formContacto) {
  formContacto.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const condominio = document.getElementById('condominio').value.trim();
    const destinatario = document.getElementById('destinatario').value;
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !mensaje) {
      formEstado.textContent = 'Por favor completa nombre y mensaje.';
      return;
    }

    try {
      await fetch('http://localhost:3000/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, condominio, destinatario, mensaje })
      });
    } catch (error) {
      console.error('No se pudo guardar en la base de datos:', error);
     
    }

    const partes = [
      `Hola, mi nombre es ${nombre}.`,
      condominio ? `Condominio/edificio: ${condominio}.` : null,
      `Mensaje: ${mensaje}`
    ].filter(Boolean);

    const texto = encodeURIComponent(partes.join(' '));
    const numeroDestino = WHATSAAP_NUMEROS[destinatario] || WHATSAAP_NUMEROS.renzo;
    const url = `https://wa.me/${numeroDestino}?text=${texto}`;

    formEstado.textContent = 'Abriendo WhatsApp...';

    const otroDestino = destinatario === 'renzo' ? 'rosita' : 'renzo';
    const numeroOtro = WHATSAAP_NUMEROS[otroDestino];
    document.getElementById('linkOtroAdmin').href = `https://wa.me/${numeroOtro}?text=${texto}`;

    window.open(url, '_blank', 'noopener');
    formContacto.reset();
  });
}
//=============boton subir ========//
const btnSubir = document.getElementById('btn-subir');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        btnSubir.style.display = 'flex';
    } else {
        btnSubir.style.display = 'none';
    }
});

btnSubir.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// ========== Hora =========//
const elementoHora = document.getElementById('hora');
function actualizarHora() {
    const ahora = new Date();
    const hora = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
    elementoHora.textContent = `${hora}:${minutos}:${segundos}`;
}
actualizarHora();
setInterval(actualizarHora, 1000);

// ============================================
// LIGHTBOX — certificados MINVU
// ============================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

document.querySelectorAll('.cert-thumb').forEach((miniatura) => {
  miniatura.addEventListener('click', () => {
    lightboxImg.src = miniatura.src;
    lightboxImg.alt = miniatura.alt;
    lightbox.classList.add('activo');
  });
});

lightbox.addEventListener('click', (evento) => {
  // Si el clic fue directo sobre el fondo oscuro (no sobre la imagen), cierra
  if (evento.target === lightbox) {
    lightbox.classList.remove('activo');
  }
});