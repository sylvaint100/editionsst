/* Boîte de dialogue modale de consentement (pixel Meta) — Loi 25 (Québec) et
   RGPD. Le pixel n'est initialisé que si l'utilisateur clique « Accepter » ;
   un refus est mémorisé au même titre qu'un accord et n'est jamais redemandé
   tant que le choix n'est pas retiré depuis le lien « Cookies » du pied.
   Fond assombri, boîte centrée : un bandeau collé en bas se noyait dans le
   hero, de même bleu nuit. Refuser et Accepter portent le même traitement
   visuel — la CAI exige un poids égal entre les deux — et rien ne se ferme
   au clic hors de la boîte : seul un choix explicite vaut consentement. */
(function(){
  "use strict";

  var CLE_CONSENTEMENT = "editionsst-consentement-meta";
  var ID_PIXEL = "1334777188736124";

  var URL_POLITIQUE = {
    fr: "/confidentialite/",
    en: "/en/privacy/"
  };

  var lang = (document.documentElement.lang || "fr").toLowerCase().indexOf("fr") === 0 ? "fr" : "en";

  var textes = {
    fr: {
      etiquette:"Consentement aux témoins",
      texte:"Nous utilisons des témoins de Meta (Facebook) pour mesurer l'audience et personnaliser la publicité. Aucune donnée n'est transmise avant votre accord.",
      politique:"Politique de confidentialité",
      politiqueAttente:"Politique de confidentialité (à venir)",
      refuser:"Refuser",
      accepter:"Accepter"
    },
    en: {
      etiquette:"Cookie consent",
      texte:"We use Meta (Facebook) cookies to measure audience and personalize advertising. No data is shared until you agree.",
      politique:"Privacy policy",
      politiqueAttente:"Privacy policy (coming soon)",
      refuser:"Decline",
      accepter:"Accept"
    }
  };

  var elementDeclencheur = null;

  function lireChoix(){
    try { return window.localStorage.getItem(CLE_CONSENTEMENT); } catch(e){ return null; }
  }

  function ecrireChoix(valeur){
    try { window.localStorage.setItem(CLE_CONSENTEMENT, valeur); } catch(e){}
  }

  function initialiserPixelMeta(){
    if (window.fbq) return;
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', ID_PIXEL);
    fbq('track', 'PageView');
  }

  function fermerModale(voile){
    voile.remove();
    document.body.classList.remove("voile-cookies-ouvert");
    if (elementDeclencheur) {
      elementDeclencheur.focus();
      elementDeclencheur = null;
    }
  }

  function creerModale(t){
    if (document.querySelector(".voile-cookies")) return;

    var urlPolitique = URL_POLITIQUE[lang];
    var mentionPolitique = urlPolitique
      ? ' <a href="' + urlPolitique + '">' + t.politique + '</a>'
      : ' <span class="modale-cookies-politique-attente">' + t.politiqueAttente + '</span>';

    var voile = document.createElement("div");
    voile.className = "voile-cookies";
    voile.innerHTML =
      '<div class="modale-cookies" role="dialog" aria-modal="true" aria-label="' + t.etiquette + '" tabindex="-1">' +
        '<span class="etiquette">' + t.etiquette + '</span>' +
        "<p>" + t.texte + mentionPolitique + "</p>" +
        '<div class="modale-cookies-boutons">' +
          '<button type="button" class="modale-cookies-bouton refuser">' + t.refuser + "</button>" +
          '<button type="button" class="modale-cookies-bouton accepter">' + t.accepter + "</button>" +
        "</div>" +
      "</div>";

    document.body.appendChild(voile);
    document.body.classList.add("voile-cookies-ouvert");
    voile.querySelector(".modale-cookies").focus();

    voile.querySelector(".refuser").addEventListener("click", function(){
      ecrireChoix("refuse");
      fermerModale(voile);
    });
    voile.querySelector(".accepter").addEventListener("click", function(){
      ecrireChoix("accepte");
      fermerModale(voile);
      initialiserPixelMeta();
    });
  }

  function ouvrirPreferences(e){
    if (e && e.currentTarget) { elementDeclencheur = e.currentTarget; }
    creerModale(textes[lang]);
  }

  function demarrer(){
    var choix = lireChoix();
    if (choix === "accepte") {
      initialiserPixelMeta();
    } else if (choix !== "refuse") {
      creerModale(textes[lang]);
    }

    var lienPreferences = document.querySelector("[data-cookies-preferences]");
    if (lienPreferences) {
      lienPreferences.addEventListener("click", function(e){
        e.preventDefault();
        ouvrirPreferences(e);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", demarrer);
  } else {
    demarrer();
  }
})();
