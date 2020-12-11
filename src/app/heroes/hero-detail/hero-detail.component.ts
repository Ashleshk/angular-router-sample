import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero$: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) {
    // In the ngOnInit() method, use the ActivatedRoute service to
    //  retrieve the parameters for the route, pull the hero id
    //   from the parameters, and retrieve the hero to display.
  }


  ngOnInit() {
   // When the map changes, paramMap gets the id parameter from the changed parameters.
    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getHero(params.get('id')))
    );
    // The switchMap operator does two things. It flattens the 
    // Observable<Hero> that HeroService returns and cancels 
    // previous pending requests. If the user re-navigates to
    //  this route with a new id while the HeroService is still
    //   retrieving the old id, switchMap discards that old 
    //   request and returns the hero for the new id.
  }

  gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/superheroes', { id: heroId, foo: 'foo' }]);
  }
}
