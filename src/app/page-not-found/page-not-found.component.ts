import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ascendere-page-not-found',
  templateUrl: './page-not-found.component.html',
  styles: [
  ]
})
export class PageNotFoundComponent implements OnInit {

  constructor(private _ac: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    console.log(this._ac.snapshot.data);
  }

}
