import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, fromEvent, of } from 'rxjs';
import { Produit } from './models/produit';
import { startWith, map, distinctUntilChanged, debounceTime, switchMap, catchError } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  model!: Observable<Produit[]>;
  name = 'Angular';
  searchField$!: Observable<string>;
  @ViewChild('input', { static: true }) input!: ElementRef;
  login: string = '';
  password: string = '';
  nom: string = '';
  prenom: string = '';
  cnx: boolean = false;
  produits$: Observable<Array<Produit>>;
  searchControl = new FormControl();
  searchFailed: boolean = false;

  constructor(private apiService: ApiService) {
    this.produits$ = this.apiService.getCatalogue();
  }

  ngOnInit() {
    this.produits$ = this.searchControl.valueChanges.pipe(
      startWith(''), // Démarre avec une chaîne vide pour charger tous les produits initialement
      debounceTime(300),
      switchMap(value => this.apiService.getSearchCatalogue(value)),
      catchError(() => {
        return of([]); // En cas d'erreur, retourne un tableau vide
      })
    );
  }

  connexion() {
      this.apiService.loginClient(this.login, this.password).subscribe((client) => {
      this.nom = client.nom;
      this.prenom = client.prenom;
      this.cnx = true;
    });
  }

  searchProducts(searchTerm: string) {
    if (!searchTerm) {
      // Si pas de terme de recherche, affichez le catalogue complet
      this.produits$ = this.apiService.getCatalogue();
    } else {
      // Recherche dynamique
      this.produits$ = this.apiService.getSearchCatalogue(searchTerm);
    }
  }


  ngAfterViewInit() {
    this.searchField$ = fromEvent(this.input.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(300),
      distinctUntilChanged(),
    );

    this.model = this.searchField$.pipe(
      switchMap(term => this.apiService.getSearchCatalogue(term).pipe(
        catchError(() => of([]))
      ))
    );
  }
}
