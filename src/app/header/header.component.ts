import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { SectionNavItem } from '../shared/interfaces/section-nav-item.interface';
import { ScrollService } from '../shared/scroll.service';

@Component({
  selector: 'ewenement-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  fixed = false;

  @Input() activeSection: string;

  @ViewChild('header') headerElement: ElementRef;

  sections: SectionNavItem[] = [
    { url: '/about', text: 'O MNIE', id: 'about' },
    { url: '/offer', text: 'OFERTA', id: 'offer' },
    { url: '/references', text: 'REFERENCJE', id: 'references' },
    { url: '/projects', text: 'PROJEKTY', id: 'projects' }
  ]

  constructor(private scrollService: ScrollService) { }

  navigate(section) {
    this.scrollService.navigate(section);
  }

  ngOnInit() {
    this.scrollService.headerFixedObservable.subscribe((headerFixed: boolean) => this.fixed = headerFixed);
  }

}
