# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Nature du dépôt

Site vitrine statique et **bilingue** d'Éditions ST (maison d'édition québécoise, éditeur de
Sylvain Tremblay), servi tel quel par GitHub Pages sur `editionsst.com`. Aucun build, aucune
dépendance, aucun test, aucun gestionnaire de paquets.

## Commandes

```bash
python3 -m http.server 8000   # aperçu local : / et /en/
```

Le déploiement est un simple `git push` sur `main` : GitHub Pages sert la racine du dépôt.

## Architecture

Deux pages réelles, une par langue — pas de bascule JavaScript :

| Chemin | Langue | Marque | Image Open Graph |
|--------|--------|--------|------------------|
| `index.html` | `fr-CA` | Éditions ST | `og-editions-st.png` |
| `en/index.html` | `en` | ST Publishing | `og-st-publishing.png` |

**ST Publishing est l'empreinte anglophone d'Éditions ST**, pas une autre maison : la page
anglaise porte donc les logos ST Publishing, mais le même préfixe éditeur, le même courriel et
le même dépôt légal BAnQ.

Les deux pages partagent **`assets/style.css`**. Le CSS était à l'origine dans un `<style>` en
tête d'`index.html` ; il a été extrait quand la deuxième page est arrivée, pour qu'une
modification de style n'ait pas à être faite deux fois. Toute règle nouvelle va dans cette
feuille, jamais en double dans une page.

Chaque page garde la même ossature : bandeau collant → hero → `#catalogue` → `#collections` →
`#maison` (`#imprint` côté anglais, qui contient `#contact`) → pied. Les liens du menu sont des
ancres vers ces identifiants.

### Bascule de langue

Le lien `.langue` (« English » / « Français ») est placé **dans le bandeau mais hors du
`<nav class="menu">`**, parce que le menu est masqué sous 44 rem : dans le nav, la bascule
disparaîtrait en mobile. Les deux pages se déclarent mutuellement via `<link rel="alternate"
hreflang>` et la page française porte le `x-default`.

### Convention de nommage : français

Les classes CSS, les variables CSS et les identifiants sont **en français** (`.enveloppe`,
`.ouvrage`, `.couverture`, `.fiche`, `.achats`, `--encre`, `--papier`, `--or`, `--mesure`), y
compris dans la page anglaise. Les noms de fichiers d'assets suivent la même règle
(`logo-st-publishing-blanc.png`). Tout ajout doit suivre cette convention plutôt que des noms
anglais.

### Système visuel

Les jetons de design sont définis dans `:root` : `--encre` (bleu nuit), `--or`, `--papier`,
`--gris`, `--mesure` (largeur max du contenu). Deux polices Google Fonts : **Spectral** (serif,
corps de texte) et **IBM Plex Mono** (étiquettes, boutons, fiches bibliographiques). La classe
`.etiquette` porte le style monospace/majuscules/interlettrage utilisé partout comme signature.

Les fiches d'ouvrage (`dl.fiche`) sont des listes de définition présentées comme des notices
bibliographiques ; les métadonnées manquantes portent la classe `.a-completer`, ce qui sert de
marqueur pour ce qui reste à remplir. Un ouvrage non encore publié utilise `.couverture.attente`
(cartouche à la place de l'image) et `.mention-parution` à la place des boutons d'achat.

Points de rupture : `23rem` (logos du bandeau rétrécis), `44rem` (menu masqué), `46rem`
(grilles ouvrage/collections/maison en une colonne). Les préférences
`prefers-reduced-motion` sont respectées.

### Logos du bandeau

Les deux marques du bandeau sont des lockups **verticaux** : emblème (monogramme ST sur
livre ouvert) côté français, « ST » sur « PUBLISHING » côté anglais. Elles sont
**recadrées au contenu** — aucune marge transparente dans le PNG — pour que
`--hauteur-logo` soit la hauteur *réellement visible* et que les deux marques pèsent pareil
d'une langue à l'autre. Tout logo qui remplace ceux-là doit l'être aussi, sinon il
paraîtra plus petit à hauteur CSS égale.

`--hauteur-logo` (4.5rem) pilote à la fois la hauteur de l'image et le `min-height` du
bandeau : la régler suffit, il n'y a rien d'autre à ajuster. Les proportions diffèrent
(1,44:1 en français, 2,72:1 en anglais), donc le logo anglais est presque deux fois plus
large à hauteur égale ; c'est ce qui impose le repli à `23rem`.

La source anglaise (`06_st_publishing_compact.png`, contenu 207 × 76) est la seule version
verticale que fournit la charte : elle sort à 2x seulement, contre 3x côté français. Il
n'existe pas de version haute résolution de ce lockup.

## Fichiers d'infrastructure — ne pas supprimer

- `CNAME` (`editionsst.com`) : sans lui, GitHub Pages fait hériter au dépôt le domaine du site
  utilisateur `sylvaintremblay.github.io`.
- `.nojekyll` : désactive le traitement Jekyll de GitHub Pages.

## État incomplet du site

- **Les liens d'achat Lulu et Amazon sont encore `href="#"`** sur les deux pages. Aucune URL
  n'a jamais été fournie ; ne pas en inventer.
- Les ISBN et formats marqués `.a-completer` restent à remplir.
- `og-editions-st.png` et `og-st-publishing.png` sont des compositions faites faute de source ;
  elles ne portent aucun texte.
- `logo-editions-st-blanc.png` provient d'un logo à encre **noire** inversée en blanc : la
  charte ne fournit pas de version blanche côté français. Côté anglais,
  `01_st_publishing_white_transparent.png` est déjà en blanc pur, sans inversion.
- *The Gap Is You.* est au catalogue anglais en « Translation in progress » : la traduction
  était à peine commencée (3 sections sur 16 chapitres au 19 août 2026). Ne pas la présenter
  comme disponible tant que ce n'est pas confirmé.
