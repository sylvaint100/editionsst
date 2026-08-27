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

Points de rupture : `44rem` (menu masqué), `46rem` (grilles ouvrage/collections/maison en
une colonne). Les préférences `prefers-reduced-motion` sont respectées.

### Logos du bandeau

Les deux marques du bandeau sont **le même emblème** : monogramme ST sur livre ouvert,
nom de la maison dessous entre deux filets or, signature en dessous. Seuls le nom et la
signature changent d'une langue à l'autre. À l'affichage : 112 × 77 px en français,
116 × 72 px en anglais. Le pied de page porte déjà le même emblème en blanc des deux
côtés.

Les deux fichiers sont **recadrés au contenu** — aucune marge transparente dans le PNG —
pour que `--hauteur-logo` soit la hauteur *réellement visible*. C'est le piège d'origine :
les fichiers livrés portaient des marges dans la toile, si bien que `height` s'appliquait
au fichier et non au dessin, et que les deux marques ne pesaient pas pareil. Tout logo qui
remplace ceux-là doit être recadré de la même façon.

`--hauteur-logo` (4.5rem) est la hauteur de référence : elle pilote le `min-height` du
bandeau, qui vaut donc 96 px sur les deux pages. La régler suffit à tout redimensionner.

#### Pourquoi le français est tiré à 1,072

Le dessin lui-même — livre ouvert et monogramme — occupe **70,8 % de la hauteur du
fichier français contre 75,9 % du fichier anglais**, parce que le français empile
« ÉDITIONS » et « ST » sur deux lignes là où l'anglais tient « ST PUBLISHING » sur une
seule. À hauteur totale identique, le livre français sortait donc 7,2 % plus court, ce qui
se voit à l'œil. D'où `--echelle-logo`, à `1` par défaut et à `1.072` sous
`:root:lang(fr)` : les deux livres font alors 55 px de haut.

Seule l'image est mise à l'échelle — le `min-height` du bandeau reste calé sur
`--hauteur-logo`, pour que les deux pages gardent un bandeau de même hauteur. **Ne pas
« corriger » ce facteur en le ramenant à 1** : le déséquilibre reviendrait. Il est à
recalculer si l'un des deux fichiers de logo est remplacé.

### Où vivent les sources de logo

Attention : le dossier `Logos/` de la charte **ne contient que les fichiers Éditions ST**
plus deux ou trois variantes ST Publishing. Le jeu ST Publishing complet est dans un
dossier distinct, `Logos_ST_Publishing/`, qui n'existe que sur le Drive :

```
~/sylvain@sylvaintremblay.com - Google Drive/Mon disque/Éditions ST/
    Logos/                 → Éditions ST (copié aussi dans ~/Downloads)
    Logos_ST_Publishing/   → ST Publishing, Drive seulement
```

C'est là que se trouve `01_st_publishing_primary_color.png`, l'emblème anglais. Il est
**aplati sur fond noir opaque**, alors que son équivalent français est déjà détouré : la
transparence a été récupérée par remplissage depuis les bords de l'image. L'opération est
sûre parce que l'emblème ne contient que du bleu marine et de l'or, jamais de noir pur —
mais il faut la refaire si le fichier est regénéré.

Il n'existe **aucune version horizontale française** de la marque, alors que l'anglais en a
une (`02_st_publishing_horizontal.png`). Ne pas en fabriquer une en composant du texte :
la police du lettrage n'est pas identifiée avec certitude.

## Fichiers d'infrastructure — ne pas supprimer

- `CNAME` (`editionsst.com`) : sans lui, GitHub Pages fait hériter au dépôt le domaine du site
  utilisateur `sylvaintremblay.github.io`.
- `.nojekyll` : désactive le traitement Jekyll de GitHub Pages.

## État incomplet du site

- **Cinq liens d'achat sont encore `href="#"`** : Lulu pour les trois ouvrages, plus Amazon
  pour *L'IA en Action* / *AI in Action*. Ne pas inventer d'URL. Les seuls liens réels sont
  les deux préventes Kindle, vérifiées sur Amazon.ca le 27 août 2026 :
  `B0HFWV11BX` (*L'écart, c'est vous.*, Éditions ST, 30 août 2026) et `B0HGN9P6RV`
  (*The Gap Is You.*, ST Publishing, 6 septembre 2026).
- Un ISBN par format dans la fiche, le format en retrait via `.mention-format`. Le numéro
  garde le poids typographique, le mot « broché » / « ePub » s'efface en gris.
- **Attention** : `B0HFCBM9B6` sur Amazon.ca est une **épreuve** (« ÉPREUVE : L'écart, c'est
  vous. »), publiquement visible et rattachée à la fiche Kindle comme format broché. Ne
  jamais y faire pointer le site.
- Les ISBN et formats de *L'IA en Action* / *AI in Action* restent marqués `.a-completer`.
- **Où trouver les ISBN.** Les fichiers `page-de-droits-*.md` du Drive ne sont pas fiables
  côté français : ils portent encore `[ISBN]` en placeholder. La source de vérité est la
  **page de droits dans l'epub livré** (`Manuscrit/*.epub`, page « Droits d'auteur »).
  C'est de là que viennent les trois numéros français, tous recoupés :
  broché `978-2-925678-00-7`, relié `978-2-925678-06-9`, ePub `978-2-925678-01-4`.
  Les trois anglais viennent de `page-de-droits-en.md`, qui lui est rempli.
- **Ne jamais extrapoler un ISBN d'une suite.** Le relié français est `-06-9`, pas
  `-02-x` : la numérotation n'est pas séquentielle par ouvrage, et le dernier chiffre est
  une clé de contrôle. Les six numéros affichés ont été validés par leur clé.
- `og-editions-st.png` et `og-st-publishing.png` sont des compositions faites faute de source ;
  elles ne portent aucun texte.
- `logo-editions-st-blanc.png` provient d'un logo à encre **noire** inversée en blanc : la
  charte ne fournit pas de version blanche côté français. Côté anglais,
  `01_st_publishing_white_transparent.png` est déjà en blanc pur, sans inversion.
- *The Gap Is You.* : **la traduction est terminée** (seize chapitres, cinq annexes,
  ~56 600 mots, 26 août 2026), les couvertures sont produites et les trois ISBN sont
  attribués — broché `978-2-925678-12-0`, relié `978-2-925678-13-7`, ePub
  `978-2-925678-14-4`. La fiche porte donc l'ISBN broché, le format et la couverture.
  **Mais la parution n'est pas datée** : la page de droits porte encore un
  `[[TO CONFIRM]]` sur l'année, et aucun lien d'achat n'existe. L'ouvrage reste donc
  « Forthcoming ». Ne pas le basculer en disponible sans confirmation et sans URL d'achat.
  Source : `Amazon KDP/Oeuvres de non-fiction/2. The Gap Is You./` sur le Drive.
