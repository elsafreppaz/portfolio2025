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
/*                           Stacked cards on scroll                          */
/* -------------------------------------------------------------------------- */


gsap.registerPlugin(ScrollTrigger);

const cards = document.querySelectorAll('.card');
const header = document.querySelector('.scroll-title');
const animation = gsap.timeline();
let cardHeight;

function initCards() { //Donne à GSAP l'info de où sont / vont les cartes 
  animation.clear();

  // Définit `cardHeight` en fonction de la hauteur de la première carte. Cette valeur servira pour positionner chaque carte.
  cardHeight = cards[0].offsetHeight; // prends la hauteur de la carte 1
  console.log("initCards()", cardHeight);

  // Boucle sur chaque carte pour ajuster sa position initiale et définir les animations.
  cards.forEach((card, index) => {
    // Ignore la première carte, car elle reste en position initiale.
    if (index > 0) {
      gsap.set(card, { y: index * cardHeight });
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

  // Active le "scrubbing", ce qui signifie que l'animation suivra le défilement de manière synchronisée.
  scrub: true,
  animation: animation,
  markers: false, //Débogage
  invalidateOnRefresh: true
});

ScrollTrigger.addEventListener("refreshInit", initCards);


