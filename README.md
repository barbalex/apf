#Neues Frontend für apflora.ch

verwendet:

- [react-boilerplate](https://github.com/mxstbr/react-boilerplate)
- [mobX](https://github.com/mobxjs/mobx)
- [socket.io](http://socket.io/)

##Ziele:

- veraltete Abhängikeiten loswerden (z.B. jsTree 2)
- mehrere Projekte verwalten
- Grundlage schaffen, um Berichte direkt aus der Webanwendung heraus produzieren zu können
- Grundlage schaffen, um auf das Access-Admin-Tool zu verzichten
- Architektur modernisieren
- Unterhalt- und Erweiterbarkeit verbessern
- (Infra-)Struktur für Tests bereitstellen
- nach und nach Tests einführen
- Sicherheit erhöhen
- URL ist Teil des Flux-Stores, steuert die Benutzeroberfläche und das Laden von Daten. Vorteile:
  - fast alles ist verlinkbar
  - auf einen Router kann verzichtet werden
- Die Daten in der Benutzeroberfläche werden laufend aktualisiert, wenn mehrere Personen gleichzeitig arbeiten
