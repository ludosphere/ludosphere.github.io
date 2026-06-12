# 📅 Guide : Ajouter des événements Ludo'sphère

Bienvenue ! Ce guide explique comment ajouter des **soirées jeux** et des **événements partenaires** au calendrier Ludo'sphère.

---

## **Accéder au calendrier**

### **Option 1️⃣ : Directement sur Google Calendar**

1. Allez sur [Google Calendar](https://calendar.google.com)
2. Connectez-vous avec le compte `ludosphere.asso@gmail.com`
3. Sélectionnez le calendrier **"Ludo'sphère"**

### **Option 2️⃣ : Via le lien public**

Vous pouvez aussi consulter le calendrier sans être connecté :  
🔗 **[Calendrier Ludo'sphère](https://calendar.google.com/calendar/u/2?cid=MzVkNGNlNGFiYTIzY2I2M2IzNWRlNTIzZjljOTExYmQ3M2I0ZDkyNjUzZTZmM2U2MDhiODBmOWUxMWU0NDZjNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t)**

---

## **Ajouter une soirée jeux (événement normal)**

### **Étapes**

1. **Cliquez sur "Créer"** ou double-cliquez sur la date/heure souhaitée
2. **Remplissez les champs :**

| Champ | Exemple | Notes |
|-------|---------|-------|
| **Titre** | `Soirée Jeux Mars 2026` | Sans préfixe `[EVENT]` ! |
| **Date/Heure** | 20 mars 2026, 20:30 → 23:00 | Format standard |
| **Lieu** | `Salle Simone de Beauvoir, Vallet` | Optionnel mais recommandé |
| **Description** | `Stratégie, coopératif, ambiance. Entrée libre !` | Optionnel |

3. **Cliquez sur "Enregistrer"**

### **Résultat**

✅ L'événement s'affiche sur :
- La page d'accueil (section "Prochaines soirées jeux")
- Le calendrier mensuel
- La carte "Prochain rendez-vous"

---

## **Ajouter un événement partenaire**

### **C'est quoi ?**

Les **événements partenaires** sont des événements externes (forum des associations, fête locale, etc.) qui s'affichent dans le **bandeau bleu** en haut du site.

### **Comment faire**

**Important :** Commencez le titre par `[EVENT]`

1. **Cliquez sur "Créer"**
2. **Remplissez les champs :**

| Champ | Exemple | Notes |
|-------|---------|-------|
| **Titre** | `[EVENT] Forum des associations 2026` | **DOIT commencer par `[EVENT]`** |
| **Date/Heure** | 20 juin 2026, 09:30 → 12:30 | |
| **Lieu** | `Champilambart, Vallet` | Recommandé |
| **Description** | `https://www.vallet.fr/evenement/forum/` | **Mettez l'URL en première ligne** |

3. **Cliquez sur "Enregistrer"**

### **Résultat**

✅ L'événement s'affiche dans le **bandeau partenariats** avec :
- Titre sans `[EVENT]` (automatiquement enlevé)
- Compte à rebours (J-X)
- 🔴 Badge rouge si **moins de 7 jours** avant l'événement
- 🔗 Lien cliquable vers l'URL

---

## **Format de description recommandé**

Pour les événements partenaires, structurez la description comme ceci :

```
https://www.vallet.fr/evenement/forum-des-associations-2/

Description complète ici si vous voulez ajouter plus d'infos...
Détails, informations utiles, etc.
```

**La première ligne DOIT être l'URL** (c'est ce qui sera cliquable sur le site).

---

## **Exemple complet : Forum des associations**

```
Titre :              [EVENT] Forum des associations 2026
Date :               20 juin 2026
Heure de début :     09:30
Heure de fin :       12:30
Lieu :               Champilambart, Vallet
Description :        https://www.vallet.fr/evenement/forum-des-associations-2/
                     
                     Venez rencontrer Ludo'sphère !
                     Présentation des jeux, démonstrations,
                     animations gratuites toute la journée.
```

---

## **FAQ**

### ❓ Où voir les événements après les ajouter ?

**Soirées jeux** (sans `[EVENT]`) :
- Site : https://ludosphere-vallet.org
- Section : "Prochaines soirées jeux"
- Mise à jour : ~instantanée

**Événements partenaires** (avec `[EVENT]`) :
- Site : https://ludosphere-vallet.org
- Section : Bandeau bleu "Partenariats & Événements" (en haut)
- Mise à jour : ~instantanée

### ❓ Je viens de créer un événement mais il n'apparaît pas !

1. **Attendez 30 secondes** (cache navigateur)
2. **Appuyez sur F5** pour actualiser la page
3. **Vérifiez que :**
   - Le titre ne commence **pas** par `[EVENT]` pour les soirées
   - Le titre **commence** par `[EVENT]` pour les partenariats
   - L'événement est **dans le futur** (après d'aujourd'hui)

### ❓ Puis-je modifier un événement ?

**Oui !** Sur Google Calendar :
1. Cliquez sur l'événement
2. Cliquez sur le stylo (modifier)
3. Changez ce que vous voulez
4. Cliquez sur "Enregistrer"

Le site se mettra à jour automatiquement.

### ❓ Comment supprimer un événement ?

1. Ouvrez Google Calendar
2. Cliquez sur l'événement
3. Cliquez sur la poubelle (supprimer)

**Attention :** L'événement disparaîtra du site !

### ❓ Quel compte utiliser pour ajouter des événements ?

**ludosphere.asso@gmail.com**

Si vous n'avez pas accès, contactez :
- 📧 ludosphere.asso@gmail.com
- 👤 Un administrateur Ludo'sphère

### ❓ Peut-on ajouter des images aux événements ?

Pas directement dans Google Calendar sur le site Ludo'sphère.

**Workaround :** Mettez un emoji dans le titre !
```
🏅 Soirée Jeux Spéciale Mars 2026
🎉 [EVENT] Fête de Vallet
```

---

## **Points importants ⚠️**

| À faire ✅ | À ne pas faire ❌ |
|-----------|------------------|
| Titre clair et complet | Titre vide ou très court |
| Date et heure précises | Oublier la date |
| Lieu pour les soirées | Pas de contexte |
| `[EVENT]` au début SEULEMENT pour partenariats | `[EVENT]` partout |
| URL en première ligne pour partenariats | Pas d'URL ou enfouie |
| Minuscules/majuscules normales | TOUT EN MAJUSCULES |

---

## **Aide & Support**

**Des questions ?**

1. Relisez ce guide (section FAQ)
2. Testez directement sur Google Calendar
3. Contactez l'équipe Ludo'sphère :
   - 📧 ludosphere.asso@gmail.com
   - 👥 Message privé sur Facebook

---

## **Détails techniques (pour curieux 👨‍💻)**

- **API utilisée :** Google Calendar v3
- **Synchronisation :** Quasi-instantanée (cache 30s max)
- **Filtrage :** Événements dans le futur uniquement
- **Préfixe partenariat :** `[EVENT]` (exact, case-sensitive)
- **Stockage images :** Icônes emoji par catégorie

---

**Version :** 1.0  
**Dernière mise à jour :** 12 juin 2026  
**Mets à jour ce guide** si vous trouvez des problèmes ou des améliorations ! 📝
