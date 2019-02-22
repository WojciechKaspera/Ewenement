import { Component, OnInit } from '@angular/core';
import { ScrollService } from './shared/scroll.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Ewenement';

  activeSection$: Observable<string> = this.scrollService.changeActiveSectionObservable;

  parallaxConfig: {initialTop: number, background: string, id: string};

  constructor(private scrollService: ScrollService) {}

  ngOnInit() {
    this.scrollService.listen();
    this.scrollService.changeParallaxObservable.subscribe(parallaxConfig => this.parallaxConfig = parallaxConfig);
  }
}
