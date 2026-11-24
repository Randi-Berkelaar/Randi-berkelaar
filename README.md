# Randi – Portfolio

## Mapstructuur

```
index.html
style.css
script.js
images/
  hero-project.jpg   (kaart rechtsboven in de hero)
  golden-roast.jpg
  dj-toyax.jpg
  boekenzoeker.jpg
  project-4.jpg      (extra project, verwijder of vervang)
  randi.jpg          (foto bij "Digital designer")
```

Maak zelf de map `images/` aan en zet je foto's er met deze namen in
(of pas de bestandsnamen aan in `index.html`).

## Op GitHub Pages zetten

1. Maak een nieuwe repository op GitHub (bijv. `portfolio`).
2. Upload alle bestanden (inclusief de map `images/`).
3. Ga naar **Settings → Pages**.
4. Kies bij *Source*: **Deploy from a branch**, branch **main**, map **/ (root)**.
5. Na een minuut staat je site op `https://JOUWNAAM.github.io/portfolio/`.

## Contactformulier

GitHub Pages kan zelf geen formulieren verwerken. Gratis oplossing:

1. Maak een account op https://formspree.io en maak een nieuw formulier.
2. Kopieer de form-ID.
3. Vervang in `index.html` `JOUW_ID` in `https://formspree.io/f/JOUW_ID`.

## Projecten toevoegen

Kopieer in `index.html` een `<a class="project-card">` blok en pas afbeelding,
tag en titel aan. De dots en pijltjes passen zich automatisch aan.
