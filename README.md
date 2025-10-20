# Sri Lanka — brochure Next.js

Site vitrine statique pour présenter un plan de voyage de 11 jours entre amis au Sri Lanka. Le projet est construit avec Next.js (App Router) et Tailwind CSS, optimisé pour un déploiement gratuit sur Vercel.

## Aperçu

- Hero minimaliste avec pitch, budget et highlights fun.
- Section "Pourquoi on y va" en mode punchlines.
- Budget détaillé + repères repas sur tableau lisible.
- Planning Google Sheet transformé en accordéon par jour.
- Galerie photos par étape pour se projeter.
- Carnet d'hébergements cliquables vers Booking/Airbnb.

## Prérequis

- Node.js 18.18+ (recommandé : 20 LTS)
- npm (installé avec Node.js)

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) pour visualiser le site. Les modifications sur `src/app/page.tsx` ou les styles se reflètent instantanément.

## Ajouter vos propres photos

1. Déposer vos images dans `public/photos` (le dossier contient un `.gitkeep` pour rester versionné).
2. Dans `src/app/page.tsx`, remplacer les URLs distantes par un chemin local, par exemple :
   ```tsx
   image: "/photos/unawatuna.jpg",
   ```
3. Relancer `npm run lint` pour vérifier que tout est valide, puis `npm run dev` pour contrôler le rendu.

Conseil : privilégier des photos d’au moins 1600 px de large pour conserver un rendu net.

Déployer sur Vercel ne pose aucun souci avec vos propres images : tout fichier placé dans `public/` est embarqué automatiquement lors du build.

## Déployer sur Vercel

1. Pousser ce dossier dans un dépôt Git (GitHub, GitLab ou Bitbucket).
2. Depuis [vercel.com](https://vercel.com), créer un projet et connecter le dépôt.
3. Laisser les paramètres par défaut (`npm run build`, sortie `.next`).
4. Déployer : l’offre gratuite suffit. Les domaines d’images externes (Unsplash, Altai Travel, Britannica) sont déjà autorisés dans `next.config.ts`.

Pour des itérations rapides, vous pouvez également utiliser la CLI :

```bash
npm install -g vercel
vercel
```

## Personnaliser davantage

- Ajuster le contenu et les visuels dans `src/app/page.tsx`.
- Modifier la palette ou la typographie globale dans `src/app/globals.css`.
- Mettre à jour les métadonnées (titre, description, Open Graph) dans `src/app/layout.tsx`.

Ce projet n'utilise pas de données dynamiques : il est prêt pour un hébergement statique performant sur Vercel.
