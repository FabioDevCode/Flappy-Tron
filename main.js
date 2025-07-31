// Enregistrement du service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/Flappy-Tron/service-worker.js');
  });
}

// Gestion de l'installation PWA (optionnel)
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Affiche un bouton ou une UI pour proposer l'installation
  // Exemple :
  // document.getElementById('installBtn').style.display = 'block';
});

// Fonction pour déclencher l'installation (à appeler sur clic bouton)
function promptInstallPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null;
    });
  }
}