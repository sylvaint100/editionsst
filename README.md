# editionsst.com

Site statique et bilingue d'Éditions ST, servi par GitHub Pages.

- `/` — français, marque **Éditions ST**
- `/en/` — anglais, marque **ST Publishing** (l'empreinte anglophone de la maison)

Les deux pages partagent `assets/style.css`. Un changement de style se fait donc une seule fois.

## Aperçu local

```bash
python3 -m http.server 8000
```

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

## Images dans /assets

| Fichier                          | Dimensions  | Source                                                    |
|----------------------------------|-------------|-----------------------------------------------------------|
| logo-editions-st.png             | 208 × 144   | 01_editions_st_logo_principal_couleur.png                 |
| logo-editions-st-blanc.png       | 240 × 160   | 01_editions_st_logo_principal_noir_blanc_transparent.png, encre inversée |
| logo-st-publishing.png           | 525 × 144   | 02_st_publishing_horizontal.png                           |
| logo-st-publishing-blanc.png     | 240 × 160   | 01_st_publishing_white_transparent.png                    |
| icone-st.png                     | 180 × 180   | 04_icone_st_fond_bleu.png, carte bleue découpée — sert aux deux pages |
| couverture-lecart-cest-vous.jpg  | 700 × 1073  | couverture de l'epub français                             |
| couverture-lia-en-action.jpg     | 800 × 1236  | IA_en_action_front_cover.jpg                              |
| couverture-ai-in-action.jpg      | 800 × 1273  | couverture de l'epub anglais                              |
| og-editions-st.png               | 1200 × 630  | composée (logo blanc + filet or sur marine)               |
| og-st-publishing.png             | 1200 × 630  | composée (idem, marque anglaise)                          |

## À compléter

- **Liens Lulu et Amazon** (`href="#"` dans les blocs `.achats`) : quatre liens côté français
  (deux ouvrages), deux côté anglais. Aucune URL n'a été fournie à ce jour.
- ISBN et format de *L'IA en Action* / *AI in Action* (`class="a-completer"`).
- *The Gap Is You.* est annoncé « Translation in progress ». À basculer en ouvrage disponible
  quand la traduction sera publiée : couverture, ISBN, format, liens d'achat.
