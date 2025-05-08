# Déploiement du projet sur Vercel

Ce guide explique comment déployer l'application Quasar sur Vercel et configurer l'intégration Supabase.

## Prérequis

- Un compte [Vercel](https://vercel.com)
- Un compte [Supabase](https://supabase.io)
- Un dépôt Git (GitHub, GitLab ou Bitbucket)

## Configuration de Supabase

1. Créez un nouveau projet sur Supabase
2. Exécutez les migrations SQL pour créer les tables nécessaires
   - Utilisez le fichier `supabase/migrations/20240430_create_locations_table.sql`
3. Notez votre URL Supabase et votre clé API (dans les paramètres du projet)

## Préparation du projet pour le déploiement

1. Assurez-vous que le projet est configuré pour une SSR (Server-Side Rendering) ou SPA (Single Page Application)
2. Créez un fichier `vercel.json` à la racine du projet :

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

3. Assurez-vous que votre fichier `.env` est correctement configuré avec les variables suivantes :

```
VITE_SUPABASE_URL=votre-url-supabase
VITE_SUPABASE_KEY=votre-cle-api-supabase
```

## Déploiement sur Vercel

### Option 1 : Déploiement via l'interface Vercel

1. Connectez-vous à votre compte Vercel
2. Cliquez sur "New Project"
3. Importez votre dépôt
4. Configurez le projet :
   - Framework preset : Vite
   - Build command : `npm run build`
   - Output directory : `dist`
5. Ajoutez les variables d'environnement Supabase
6. Cliquez sur "Deploy"

### Option 2 : Déploiement via CLI Vercel

1. Installez Vercel CLI :

```bash
npm install -g vercel
```

2. Connectez-vous à votre compte Vercel :

```bash
vercel login
```

3. Configurez et déployez le projet :

```bash
cd quasar-project
vercel
```

4. Suivez les instructions et configurez les variables d'environnement quand demandé

## Configuration du déploiement continu

Pour activer le déploiement continu :

1. Dans votre tableau de bord Vercel, allez dans les paramètres du projet
2. Activez les déploiements automatiques pour chaque push
3. Configurez les environnements de prévisualisation pour les pull requests

## Test du déploiement

Après le déploiement, vérifiez que :

1. L'application se charge correctement
2. La connexion avec Supabase fonctionne
3. Les fonctionnalités utilisant les nouvelles tables (comme les locations) fonctionnent

## Résolution des problèmes courants

- **Erreur 404 pour les routes** : Vérifiez la configuration des rewrites dans `vercel.json`
- **Erreurs de connexion Supabase** : Vérifiez que les variables d'environnement sont correctement configurées
- **Problèmes avec les requêtes API** : Vérifiez les règles CORS dans votre projet Supabase

## Ressources utiles

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Supabase](https://supabase.io/docs)
- [Documentation Quasar sur SSR/SPA](https://quasar.dev/quasar-cli/developing-spa/deploying) 