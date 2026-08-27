# editionsst.com

Site statique d'Éditions ST, servi par GitHub Pages.

## Mise en ligne

1. Créer un dépôt public `editionsst` sur GitHub.
2. Y déposer le contenu de ce dossier.
3. Settings → Pages → Source : `main` / racine.
4. Settings → Pages → Custom domain : `editionsst.com` (obligatoire, sinon le
   dépôt hérite du domaine du site utilisateur).
5. Cocher « Enforce HTTPS » une fois la vérification DNS passée.

## DNS chez Porkbun

| Type  | Hôte | Valeur                       |
|-------|------|------------------------------|
| ALIAS | @    | sylvaintremblay.github.io    |
| CNAME | www  | sylvaintremblay.github.io    |

editionsst.ca et stpublishing.ca : redirection d'URL vers https://editionsst.com

## Images à déposer dans /assets

| Fichier                             | Source                                              |
|-------------------------------------|-----------------------------------------------------|
| logo-editions-st.png                | 01_editions_st_logo_principal_couleur.png           |
| logo-editions-st-blanc.png          | 01_editions_st_logo_principal_noir_blanc_transparent.png |
| icone-st.png                        | 04_icone_st_fond_bleu.png (redimensionné 180 px)    |
| couverture-lecart-cest-vous.jpg     | couverture avant seule, ~800 px de large            |
| couverture-lia-en-action.jpg        | couverture avant seule, ~800 px de large            |
| og-editions-st.png                  | 1200 × 630 px, pour les partages sur les réseaux    |

## À compléter dans index.html

- Liens Lulu et Amazon (`href="#"` dans les blocs `.achats`)
- ISBN et format de *L'IA en Action* (`class="a-completer"`)
