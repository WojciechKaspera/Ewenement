import { Component, OnInit } from '@angular/core';
import { SectionNavItem } from '../shared/interfaces/section-nav-item.interface';
import { Router, ActivatedRoute, RouterEvent, NavigationStart } from '@angular/router';

@Component({
  selector: 'ewenement-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  home: boolean;

  sections: SectionNavItem[] = [
    { url: '/about', text: 'O MNIE' },
    { url: '/offer', text: 'OFERTA' },
    { url: '/references', text: 'REFERENCJE' },
    { url: '/projects', text: 'PROJEKTY' }
  ]

  constructor(private router: Router, private route: ActivatedRoute) { }

  navigate(url) {
    const timeout = (this.home || url === '/home') ? 300 : 0;
    if (url === '/home') {
      this.home = true;
    } else {
      this.home = false;
    }
    setTimeout(() => {
      this.router.navigateByUrl(url);
    }, timeout);
  }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/home') {
          this.home = true;
        }
      }
    });
  }

}
