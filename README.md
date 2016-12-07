#Neues Frontend für apflora.ch

verwendet:

- [react-boilerplate](https://github.com/mxstbr/react-boilerplate)
- [mobX](https://github.com/mobxjs/mobx)

##Ziele:

- veraltete Abhängikeiten loswerden (z.B. jsTree)
- mehrere Projekte verwalten
- Grundlage schaffen, um Berichte direkt aus der Webanwendung heraus produzieren zu können
- Berichte pro Projekt individualisieren
- Grundlage schaffen, um auf das Access-Admin-Tool zu verzichten
- Architektur modernisieren
- Unterhalt- und Erweiterbarkeit verbessern
- Infrastruktur für Tests bereitstellen
- Nach und nach Tests einführen
- Sicherheit erhöhen
- URL ist Teil des Flux-Stores, steuert UI. Vorteile:
  - fast alles ist verlinkbar
  - auf einen Router kann verzichtet werden
