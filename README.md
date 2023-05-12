Ez a verzió egy régebbi verzió.
A main2 branchen van az jó verzió.

Projekt készítő:
Gatyás Bence
Ha bármi kérdésed van a projekttel kapcsolatban megtalálasz discordon(BencE#6569) (vagy coospacen)
Van feltöltve egy pontozási táblázat is benne egy két segítséggel, hogy mit hol keress (nem írtam oda mindent és lehet ,hogy amit odaírtam arra nem is jár pont)

Ha esetleg az angular 15 miatt problémába ütközöl akkor ez a megoldás:
https://github.com/angular/angularfire/issues/3290
sajnos ez az npm modules beli hiba
A @angular/fire/compat/firestore/interfaces.d.ts-be kell átírni a típusokat.
