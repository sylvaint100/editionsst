# Graphie des titres

## La règle

Un titre de la série porte un **point final quand il forme une phrase complète**. C'est une
marque de commerce voulue, pas une coquille. Ne pas le « corriger ».

| Titre | Point final | Pourquoi |
|-------|-------------|----------|
| *L'écart, c'est vous.* | **oui** | phrase complète |
| *The Gap Is You.* | **oui** | phrase complète |
| *Personne n'a décidé ça.* | **oui** | phrase complète |
| *Nobody Decided That.* | **oui** | phrase complète |
| *L'IA en Action* | non | syntagme nominal |
| *AI in Action* | non | syntagme nominal |
| *Les mains dans l'IA* | non | syntagme nominal |
| *Hands-On AI* | non | syntagme nominal |

La règle vaut dans les deux langues et partout où le titre est **lu** : titre de page,
`<h3>`, texte de remplacement d'image, `og:title`, `meta description`, JSON-LD (`name`,
`headline`), fils d'Ariane, fichiers de contenu.

## Ce que la règle ne touche pas

Les **slugs, URL, noms de fichiers, identifiants, ISBN et liens externes** ne prennent pas
de ponctuation. `couverture-lecart-cest-vous.jpg`, `books.by/st-publishing/lecart-cest-vous`
et `amazon.ca/dp/B0HFWV11BX` sont corrects tels quels. Un slug sans point n'est pas une
incohérence à réparer.

## Le titre en milieu de phrase

Un titre-phrase suivi d'une virgule donnerait « vous., » et en fin de phrase « vous.. ».
Dans ces cas, **reformuler pour que le titre tombe en fin de proposition** plutôt que de
bricoler la ponctuation. Exemple en place, dans `en/index.html` :

> Also published in French as *L'écart, c'est vous.*

Le point du titre termine la phrase ; il n'en faut pas un second.
