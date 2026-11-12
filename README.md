# Portfolio de Zoé Schliefer Berlioux

Site statique en français : présentation, projets, recherche d’alternance 2027/2028 dans la métropole de Bordeaux et contact. Aucun serveur applicatif nécessaire pour le publier.

## Lancer le site

Depuis ce dossier :

```sh
python -m http.server 8000
```

Ouvrir `http://localhost:8000`. Un serveur local est préférable à l’ouverture des fichiers directement dans le navigateur.

## Organisation

- `index.html` : accueil, projets, centres d’intérêt et contact.
- `projets/` : pages FALC, Addylink, Zinzin, démo du réseau et escape game.
- `assets/js/main.js` : contenu des cartes (`PROJETS`), compétences, filtres, tri et fiches.
- `assets/js/accessibility.js` et `assets/css/accessibility.css` : préférences communes et adaptations d’accessibilité. Cette feuille est chargée après les styles des projets.
- `assets/css/styles.css` et `assets/css/project.css` : composants communs. Les autres feuilles concernent les pages ou démos nommées.
- `assets/css/project-universes.css` : palettes des pages. Addylink et Escape possèdent aussi une palette dans leur feuille propre.
- `assets/images/` : portrait, logos, captures et pages du matériel Ethy’link.
- `assets/documents/` : CV, sources Python originales et archive du jeu C#.
- `.tools/` : extraction de documents, apprentissages et vérifications locales ; ne fait pas partie des fichiers à publier.
- `data/` : ressources de travail historiques, non chargées par le site actuel.

Les chemins dans `PROJETS` sont relatifs à `index.html`. Le cadrage du portrait se règle dans les règles `.profile-photo img` de `styles.css`.

## Interactions

Les fiches se parcourent avec les boutons, les flèches gauche/droite ou un geste horizontal au pavé tactile. Le tri est également appliqué à cet ordre de navigation. Échap ferme les fenêtres et les menus ; les liens d’évitement donnent accès au contenu au clavier.

Les préférences de thème, contraste renforcé, police, taille du texte et animations sont conservées dans `localStorage` sous `pf-prefs` et appliquées aux pages détaillées. Le contraste renforcé conserve les teintes principales des catégories ; les libellés évitent de transmettre l’information uniquement par la couleur.

La démonstration Ethy’link suit trois étapes : lecture de la situation, choix d’une action, observation des effets de la carte choisie. Une seule étape est affichée à la fois. Les conséquences et la plaquette ne sont visibles qu’à la fin. Le parcours explique que le jeu complet repose sur une discussion collective.

Sur mobile, la fenêtre défile verticalement et les actions se parcourent horizontalement. Les cartes peuvent être agrandies. Les livrets se parcourent page par page dans la fenêtre de lecture.

## Démos

- **Zinzin** : adaptation web courte en JavaScript, trois étages et trois minutes. Le jeu C# original est fourni séparément. La clé change de cachette à chaque nouvelle partie. Le classement de la démo est local au navigateur (`zinzin-demo-scores-v1`), pas partagé entre visiteurs.
- **Réseau récurrent** : alphabet et règle de reconnaissance transposés du Python fourni. Les poids ont été recalculés avec sa méthode d’apprentissage et sélectionnés parmi plusieurs entraînements ; ce ne sont pas les fichiers historiques des essais de licence. La reconnaissance peut échouer et les messages de résultat le signalent. Le fichier `reseau-original.py` reste inchangé.

## Vérifications

La syntaxe des scripts peut être contrôlée avec `node --check chemin/du/script.js`.

Les scripts locaux `.tools/check-mobile.py`, `.tools/check-interactions.py` et `.tools/check-walkthrough.py` utilisent Playwright et Chrome installé pour vérifier les dimensions, interactions et préférences. Le dernier vérifie le parcours des trois actions dans les trois étapes, y compris les retours en arrière et les effets plafonnés. Ils ne sont pas des dépendances du site. Les rapports et captures sont enregistrés dans `.tools/`.

Pour publier, utiliser `index.html`, `projets/` et `assets/`. Ne pas publier `.tools/`, qui contient des documents de travail, des données d’apprentissage et les outils de vérification.

## Aperçus de partage

Chaque page possède une capture JPEG de 1200 × 630 pixels dans `assets/images/social/`, déclarée dans ses métadonnées Open Graph. Ces images ne remplacent pas les miniatures des cartes.

L’adresse publique du portfolio n’étant pas encore connue, leurs chemins sont actuellement relatifs. Avant de partager le site sur LinkedIn, configurer les URL absolues depuis le dossier du portfolio :

```sh
python .tools/configure-sharing.py https://adresse-publique-du-portfolio/
```

Utiliser la vraie adresse de publication, en conservant son éventuel sous-dossier. Le script configure également les adresses canoniques. Pour régénérer les captures, `.tools/create-social-previews.py` utilise Chrome et Playwright installés localement.
