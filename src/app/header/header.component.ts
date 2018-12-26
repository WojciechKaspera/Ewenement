import { Component, OnInit } from '@angular/core';
import { SectionNavItem } from '../shared/interfaces/section-nav-item.interface';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'ewenement-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('topBottom', [
      state('top', style({
        top: '0px',
      })),
      state('bottom', style({
        top: 'calc(100vh - 69px)',
      })),
      transition('top => bottom', [
        animate('0.4s 0s ease-in')
      ]),
      transition('bottom => top', [
        animate('0.4s 0s ease-in')
      ]),
    ]),
  ]
})
export class HeaderComponent implements OnInit {

  sections: SectionNavItem[] = [
    { url: '/about', text: 'O MNIE' },
    { url: '/offer', text: 'OFERTA' },
    { url: '/references', text: 'REFERENCJE' },
    { url: '/projects', text: 'PROJEKTY' }
  ]

  onTop = false;

  constructor(private router: Router) { }

  shouldBeFixed() {
  }

  ngOnInit() {
    window.addEventListener('scroll', () => { });
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/home') {
          this.onTop = false;
          setTimeout(() => {
            this.shouldBeFixed = () => window.innerHeight - window.scrollY - 69 <= 0;
          }, 300);
        } else {
          this.onTop = true;
            this.shouldBeFixed = () => true;
        }
      }
    })
  }

}
