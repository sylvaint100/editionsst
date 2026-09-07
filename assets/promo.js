/* Boîte promotionnelle du guide gratuit.
   Règles de séquencement, volontairement strictes :
   - Jamais par-dessus ni pendant la modale de consentement (assets/
     consentement.js) : on attend sa fermeture avant de démarrer le délai.
   - Une seule fois par visiteur, pour toujours (pas de réapparition) —
     marqué comme « vu » dès l'affichage, pas seulement à la fermeture,
     pour ne pas revoir la boîte si le visiteur quitte l'onglet sans la
     fermer explicitement.
   - Jamais si le bloc .gratuit est déjà visible ou déjà dépassé au
     moment où le délai s'écoule : elle n'a alors plus de raison d'être. */
(function(){
  "use strict";

  var CLE_VU = "editionsst-promo-guide-vu";
  var DELAI_MS = 8000;

  function dejaVu(){
    try { return !!localStorage.getItem(CLE_VU); } catch(e){ return false; }
  }
  function marquerVu(){
    try { localStorage.setItem(CLE_VU, "1"); } catch(e){}
  }

  function blocVisibleOuDepasse(bloc){
    var rect = bloc.getBoundingClientRect();
    var hauteur = window.innerHeight || document.documentElement.clientHeight;
    return rect.bottom <= 0 || rect.top < hauteur;
  }

  function attendreConsentement(rappel){
    var voile = document.querySelector(".voile-cookies");
    if (!voile) { rappel(); return; }
    var observateur = new MutationObserver(function(){
      if (!document.body.contains(voile)) {
        observateur.disconnect();
        rappel();
      }
    });
    observateur.observe(document.body, { childList: true });
  }

  var textes = {
    fr: {
      etiquette: "Offre — guide gratuit",
      pastille: "Gratuit",
      titre: "Guide pratique pour les entrepreneurs et gestionnaires",
      texte: "Vous avez des outils d'IA. Le problème, c'est la décision qui les entoure — pas l'outil lui-même.",
      bouton: "Recevoir le guide gratuit",
      fermer: "Fermer"
    },
    en: {
      etiquette: "Offer — free guide",
      pastille: "Free",
      titre: "A practical guide for entrepreneurs and managers",
      texte: "You have AI tools. The problem is the decision that surrounds them — not the tool itself.",
      bouton: "Get the free guide",
      fermer: "Close"
    }
  };

  function creerPromo(t, bloc, elementActif){
    if (document.querySelector(".promo-guide")) return;

    marquerVu();

    var promo = document.createElement("div");
    promo.className = "promo-guide";
    promo.setAttribute("role", "dialog");
    promo.setAttribute("aria-label", t.etiquette);
    promo.setAttribute("tabindex", "-1");
    promo.innerHTML =
      '<button type="button" class="promo-guide-fermer" aria-label="' + t.fermer + '">&times;</button>' +
      '<span class="pastille">' + t.pastille + '</span>' +
      '<p class="promo-guide-titre">' + t.titre + '</p>' +
      '<p class="promo-guide-texte">' + t.texte + '</p>' +
      '<button type="button" class="promo-guide-action">' + t.bouton + '</button>';

    document.body.appendChild(promo);
    promo.focus();

    function fermer(){
      promo.remove();
      document.removeEventListener("keydown", surEchap);
      document.removeEventListener("click", surClicExterne, true);
      if (elementActif && typeof elementActif.focus === "function") {
        elementActif.focus();
      }
    }

    function surEchap(e){
      if (e.key === "Escape") fermer();
    }
    function surClicExterne(e){
      if (!promo.contains(e.target)) fermer();
    }

    promo.querySelector(".promo-guide-fermer").addEventListener("click", fermer);

    promo.querySelector(".promo-guide-action").addEventListener("click", function(){
      fermer();
      bloc.scrollIntoView({ behavior: "smooth", block: "start" });
      bloc.classList.add("mis-en-evidence");
      setTimeout(function(){ bloc.classList.remove("mis-en-evidence"); }, 1400);
    });

    document.addEventListener("keydown", surEchap);
    // Sur un même clic, le gestionnaire externe ne doit pas voir celui qui
    // vient d'ouvrir la boîte : on ne l'attache qu'au tour suivant.
    setTimeout(function(){
      document.addEventListener("click", surClicExterne, true);
    }, 0);
  }

  function demarrer(){
    if (dejaVu()) return;
    var bloc = document.querySelector(".gratuit");
    if (!bloc) return;

    var lang = (document.documentElement.lang || "fr").toLowerCase().indexOf("fr") === 0 ? "fr" : "en";

    attendreConsentement(function(){
      setTimeout(function(){
        if (dejaVu()) return;
        if (blocVisibleOuDepasse(bloc)) return;
        creerPromo(textes[lang], bloc, document.activeElement);
      }, DELAI_MS);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", demarrer);
  } else {
    demarrer();
  }
})();
