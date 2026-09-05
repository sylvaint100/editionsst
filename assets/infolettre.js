(function () {
  // Le formulaire EmailOctopus est injecté par leur script après le chargement :
  // son champ caché « Language » (field_3) n'existe pas dans le HTML servi, et
  // leur script ne lit ni paramètre d'URL ni attribut data-. On attend donc le
  // champ, puis on y écrit la langue de la page, pour segmenter les envois.
  var LANGUE = (document.documentElement.lang || 'fr').slice(0, 2).toLowerCase();
  var SELECTEUR = '#field_3, input[name="field_3"]';

  function renseigner(racine) {
    var champ = (racine || document).querySelector(SELECTEUR);
    if (!champ) return false;
    champ.value = LANGUE;
    return true;
  }

  if (!renseigner()) {
    var observateur = new MutationObserver(function () {
      if (renseigner()) observateur.disconnect();
    });
    observateur.observe(document.body, { childList: true, subtree: true });
    // Le formulaire arrive en quelques secondes ; au-delà, il n'arrivera pas.
    setTimeout(function () { observateur.disconnect(); }, 30000);
  }

  // Filet : si le formulaire est reconstruit, on renseigne aussi à l'envoi.
  document.addEventListener('submit', function (e) { renseigner(e.target); }, true);
})();
