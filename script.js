

/* -------------------------------------------------------------------------- */
/*                                   Banner                                   */
/* -------------------------------------------------------------------------- */

gsap.to(".text-defilant", {
  x: "-50%",
  duration: 20,
  repeat: -1,
  ease: "linear"
});


/* -------------------------------------------------------------------------- */
/*                                 Card Height                                */
/* -------------------------------------------------------------------------- */

const cardRatio = 4 / 2.5;
const allCards = document.querySelectorAll('.card');
const cardsContainer = document.querySelector('.cards');
const containerMargin = 0;


function adjustCardHeights() {
  if (allCards.length > 0) {
    const cardWidth = allCards[0].offsetWidth;
    const cardHeight = cardWidth / cardRatio;

    allCards.forEach(card => {
      card.style.height = `${cardHeight}px`;
    });


    cardsContainer.style.height = `${cardHeight + containerMargin}px`;
  }
}

// Écouteurs d'événements pour ajuster les hauteurs lors du redimensionnement de la fenêtre et du chargement de la page
window.addEventListener('resize', adjustCardHeights); // ICI : Ajuste les hauteurs des cartes lors du redimensionnement
window.addEventListener('load', adjustCardHeights); // ICI : Ajuste les hauteurs des cartes lors du chargement de la page



/* -------------------------------------------------------------------------- */
/*                           Stacked cards on scroll                          */
/* -------------------------------------------------------------------------- */



gsap.registerPlugin(ScrollTrigger);

const cards = document.querySelectorAll('.card');
const header = document.querySelector('.scroll-title');
const animation = gsap.timeline();
let cardHeight;

function initCards() {
  animation.clear();

  cardHeight = cards[0].offsetHeight; // prends la hauteur de la carte 1
  console.log("initCards()", cardHeight);

  cards.forEach((card, index) => {
    if (index > 0) { //ignore la première card
      const startY = index * cardHeight * 1.5;
      gsap.set(card, { y: startY });
      animation.to(card, { y: 0, duration: index * 2, ease: "in" }, 0);
    }
  });
}

initCards();



ScrollTrigger.create({
  trigger: ".wrapper",
  start: "top top",
  pin: true,
  end: () => `+=${(cards.length * cardHeight) + header.offsetHeight}`,
  scrub: true,
  animation: animation,
  markers: false,
  invalidateOnRefresh: true
});



ScrollTrigger.addEventListener("refreshInit", initCards);

// window.addEventListener('resize', initCards);
window.addEventListener('load', initCards);

window.addEventListener('resize', () => {
  initCards();
  ScrollTrigger.refresh();
});


/* -------------------------------------------------------------------------- */
/*                                   Mantra                                   */
/* -------------------------------------------------------------------------- */


const mantraHeaders = document.querySelectorAll('.mantra-header');
const textMantras = document.querySelectorAll('.p-mantra');
const toggleButtons = document.querySelectorAll('.toggle-button');

// Ajouter un écouteur d'événements sur chaque .mantra-header
mantraHeaders.forEach((header, index) => {
  header.addEventListener('click', function () {


    if (textMantras[index].style.display === 'block') {

      textMantras[index].style.display = 'none';
      toggleButtons[index].querySelector('img').src = "Assets/Home/icon-plus.svg";
      toggleButtons[index].classList.remove('opened');
    }

    else {
      textMantras.forEach((text, i) => {
        text.style.display = 'none';
        toggleButtons[i].querySelector('img').src = "Assets/Home/icon-plus.svg"; // Réinitialiser les icônes à "plus"
        toggleButtons[i].classList.remove('opened'); // Enlever la classe 'opened' pour tous les autres boutons
      });

      
      textMantras[index].style.display = 'block';
      toggleButtons[index].querySelector('img').src = "Assets/Home/icon-moins.svg";
      toggleButtons[index].classList.add('opened');
    }
  });
});
