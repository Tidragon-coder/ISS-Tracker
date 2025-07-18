
# 🛰️ ISS Tracker

Un projet simple et futuriste pour suivre en temps réel la position de l’ISS (Station Spatiale Internationale) sur une carte interactive, avec affichage des coordonnées et de l’heure actuelle.

## 🚀 Fonctionnalités

- ✅ Affichage de la position en direct de l’ISS sur une carte grâce à Leaflet  
- ✅ Affichage de la latitude et de la longitude en temps réel  
- ✅ Bouton pour centrer la carte sur la position de l’ISS  
- ✅ Horloge dynamique affichant l’heure actuelle  
- ✅ Interface au style futuriste (police Orbitron, néons, dégradé)

## 📦 Technologies utilisées

- HTML5 / CSS3 / JavaScript (natif, sans framework)  
- Leaflet.js pour la carte et l’affichage de l’ISS  
- API publique Open Notify pour récupérer la position de l’ISS  
- Nominatim (OpenStreetMap) pour la recherche de lieu par coordonnées (optionnel)

## 🛠️ Installation et lancement

Télécharge le projet ou clone le dépôt :

```bash
git clone https://github.com/Tidragon-coder/ISS-tracker.git
cd iss-tracker
````

Lance le projet localement :
👉 Ouvre simplement le fichier `index.html` dans ton navigateur.
✅ Aucune installation de serveur n’est nécessaire.

## 📁 Structure du projet

```
.
├── index.html        # Page principale
├── style.css         # Styles (fond, map, horloge)
├── js.js             # Logique principale du tracker
├── horloge.js        # Script pour l'horloge
├── api/
│   └── iss.js        # Requêtes vers l’API ISS
└── media/
    └── iconISS.png   # Icône pour l’onglet
```

## 🌐 API utilisée

* Position ISS : [http://api.open-notify.org/iss-now.json](http://api.open-notify.org/iss-now.json)
* (Géocodage inverse (optionnel) : [https://nominatim.openstreetmap.org/reverse](https://nominatim.openstreetmap.org/reverse) — utilisation future)

## 👨‍💻 Auteur

Projet réalisé par **Théo Spetebroot** dans un but d’apprentissage et de démonstration.


