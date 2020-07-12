import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/models/hero';
import { HEROES } from 'src/models/mock-heroes';
import { HeroService } from '../hero.service';
import { MessageServiceService } from '../message-service.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes:Hero[];
  selectedHero: Hero;
  constructor(private heroService: HeroService, private messageService: MessageServiceService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes()
  {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  onSelect(hero : Hero)
  {
    this.selectedHero = hero;
    this.messageService.add(`Hero component: selected hero id ${hero.id}`);
  }

  add(name: string): void{
    name = name.trim();
    if(!name){return;}
    this.heroService.addHero({name} as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void
  {
    this.heroes = this.heroes.filter(h => h!== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
