import { animate, state, style, transition, trigger } from '@angular/animations';

// Component transition animations
export const slideInDownAnimation =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateY(-100%)'
      }),
      animate('1s ease-in')
    ]),
    transition(':leave', [
      animate('1.5s ease-out', style({
        opacity: 0.3,
        transform: 'translateY(100%)'
      }))
    ])
  ]);


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/