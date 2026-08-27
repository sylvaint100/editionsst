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
| logo-editions-st.png             | 312 × 216   | 01_editions_st_logo_principal_couleur.png, recadré au contenu |
| logo-editions-st-blanc.png       | 240 × 160   | 01_editions_st_logo_principal_noir_blanc_transparent.png, encre inversée |
| logo-st-publishing.png           | 347 × 216   | 01_st_publishing_primary_color.png, détouré du fond noir puis recadré |
| logo-st-publishing-blanc.png     | 240 × 160   | 01_st_publishing_white_transparent.png                    |
| icone-st.png                     | 180 × 180   | 04_icone_st_fond_bleu.png, carte bleue découpée — sert aux deux pages |
| couverture-lecart-cest-vous.jpg  | 700 × 1073  | couverture de l'epub français                             |
| couverture-lia-en-action.jpg     | 800 × 1236  | IA_en_action_front_cover.jpg                              |
| couverture-ai-in-action.jpg      | 800 × 1273  | couverture de l'epub anglais                              |
| couverture-the-gap-is-you.jpg    | 800 × 1243  | Amazon KDP/…/2. The Gap Is You./Couverture/The Gap Is You. - front cover.jpg |
| og-editions-st.png               | 1200 × 630  | composée (logo blanc + filet or sur marine)               |
| og-st-publishing.png             | 1200 × 630  | composée (idem, marque anglaise)                          |

## À compléter

- **Liens Lulu** : trois liens encore `href="#"`, un par ouvrage. Aucune URL Lulu fournie.
  Les quatre liens Amazon sont câblés et vérifiés.
- **ISBN de *L'IA en Action* / *AI in Action*** : en attente de la republication sous les
  ISBN Éditions ST. À ce moment-là, ISBN, format et lien Amazon se remplissent ensemble —
  la republication crée de nouvelles fiches, donc de nouveaux ASIN.
- ISBN et format de *L'IA en Action* / *AI in Action* (`class="a-completer"`).
- *The Gap Is You.* : traduction terminée, couverture et ISBN en place, mais **parution non
  datée et sans liens d'achat** — l'ouvrage reste « Forthcoming ». Ne restent à obtenir que
  la date de parution et les URL Lulu/Amazon. Les deux autres ISBN existent si on veut les
  afficher : relié `978-2-925678-13-7`, ePub `978-2-925678-14-4`.
