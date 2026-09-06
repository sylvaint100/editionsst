(function () {
  // Le formulaire EmailOctopus est injecté par leur script après le chargement :
  // rien de tout cela n'existe dans le HTML servi, et leur script ne lit ni
  // paramètre d'URL ni attribut data-. On attend donc son apparition pour deux
  // corrections que leur interface ne permet pas :
  //
  //   1. renseigner le champ caché « Language » (field_3) avec la langue de la
  //      page, pour segmenter les envois ;
  //   2. rendre la case de consentement obligatoire. EmailOctopus l'affiche mais
  //      n'offre aucun réglage pour l'exiger, or une case qu'on peut ignorer ne
  //      constitue pas un consentement. Le formulaire poste par un bouton submit
  //      natif et ne désactive pas la validation du navigateur : marquer la case
  //      « required » suffit à bloquer l'envoi avant leur script.
  var LANGUE = (document.documentElement.lang || 'fr').slice(0, 2).toLowerCase();

  function ajuster(racine) {
    racine = racine || document;
    var langue = racine.querySelector('#field_3, input[name="field_3"]');
    var consent = racine.querySelector('#consent, input[name="consent"]');
    if (langue) langue.value = LANGUE;
    if (consent) consent.required = true;
    return !!(langue || consent);
  }

  if (!ajuster()) {
    var observateur = new MutationObserver(function () {
      if (ajuster()) observateur.disconnect();
    });
    observateur.observe(document.body, { childList: true, subtree: true });
    // Le formulaire arrive en quelques secondes ; au-delà, il n'arrivera pas.
    setTimeout(function () { observateur.disconnect(); }, 30000);
  }

  // Filet : si le formulaire est reconstruit, on réapplique à l'envoi.
  document.addEventListener('submit', function (e) { ajuster(e.target); }, true);
})();
