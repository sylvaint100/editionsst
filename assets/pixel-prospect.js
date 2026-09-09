/* Événement Meta « Lead », page /merci/ seulement. Le
   pixel n'est initialisé qu'après consentement (assets/consentement.js) :
   plutôt que dupliquer sa logique de consentement ici, on attend simplement
   que window.fbq existe. Il n'existe que si le choix stocké est « accepte »
   (initialisation au chargement) ou si le visiteur vient de cliquer
   « Accepter » dans la boîte de consentement — dans les deux cas, fbq est
   déjà appelable avant même que fbevents.js ait fini de charger, grâce au
   bouchon synchrone posé par initialiserPixelMeta(). Un refus, ou une
   absence de choix, laisse fbq indéfini : l'intervalle s'arrête alors de
   lui-même après cinq minutes sans jamais déclencher Lead. */
(function(){
  "use strict";

  var tentatives = 0;
  var LIMITE = 600;

  var minuteur = setInterval(function(){
    tentatives++;
    if (window.fbq) {
      clearInterval(minuteur);
      fbq('track', 'Lead');
    } else if (tentatives >= LIMITE) {
      clearInterval(minuteur);
    }
  }, 500);
})();
