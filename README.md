# 🚀 ConvertX — Convertisseur de devises moderne

**ConvertX** est une application web moderne de conversion de devises en temps réel, construite avec **Next.js**, **React**, **Tailwind CSS**, et **ShadCN UI**.
Elle offre une interface professionnelle, intuitive, avec mode **clair/sombre**, sélection fluide des devises et des conversions instantanées.

---

## ✨ Fonctionnalités

* 🔄 **Conversion instantanée** entre plus de 15 devises (EUR, USD, XOF, XAF, GNF, GHS, NGN…)
* 🎨 **Interface moderne & responsive**
* 🌓 **Mode sombre et clair** avec bouton toggle global
* 🔁 Inversion des devises (swap)
* 🎯 Résultat clair, formaté automatiquement selon la devise
* ⚡ API de taux de change **en temps réel**
* 🚀 Déploiement automatique avec **Vercel**
* 🎛️ Composants UI élégants avec **ShadCN UI**
* 🪶 Code propre, optimisé et maintenable

---

## 🛠 Technologies utilisées

* **Next.js 14+** — Framework React moderne
* **React** — Construction des interfaces
* **Tailwind CSS** — Style rapide, responsive, propre
* **ShadCN UI** — Composants UI professionnels
* **CurrencyAPI** — Récupération des taux de change
* **TypeScript** — Typage strict et sûr
* **Vercel** — Déploiement continu
* **Git & GitHub** — Versioning

---

## 📦 Installation locale

1. Clone le projet :

```bash
git clone https://github.com/elprofessor2001/convertx.git
cd convertx
```

2. Installe les dépendances :

```bash
npm install
```

3. Configure ton fichier **.env** :

```env
NEXT_PUBLIC_API_KEY=ta_clef_api_ici
```

4. Lance l’application :

```bash
npm run dev
```

---

## 🧱 Structure du projet (mise à jour)

```
convertx/
├─ app/
│  ├─ components/
│  │  ├─ CurrencyConverter.tsx
│  │  ├─ Header.tsx
│  │  └─ ThemeToggle.tsx
│  ├─ layout.tsx
│  ├─ page.tsx
│  └─ globals.css
│
├─ components/
│  └─ ui/   (ShadCN)
│
├─ lib/
│  ├─ convert.ts
│  └─ utils.ts
│
├─ public/
│  └─ logos / icons / etc.
│
├─ tailwind.config.js
├─ package.json
├─ .env
└─ README.md
```

---

## 🌍 Déploiement

Le projet est hébergé sur **Vercel**, ce qui permet :

* déploiement automatique à chaque push sur GitHub
* prévisualisation instantanée
* URLs publiques prêtes à partager

---

## 👤 Auteur

**Parfait Gnawé**

* GitHub : [elprofessor2001](https://github.com/elprofessor2001)
* Email : [gnaweparfait1@gmail.com](mailto:gnaweparfait1@gmail.com)
