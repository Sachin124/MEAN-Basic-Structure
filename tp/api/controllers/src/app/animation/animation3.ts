import { trigger, transition, animate, style, query, stagger } from '@angular/animations';

// Component transition animations
export const UpperAnimations = [
  trigger('pageAnimations', [
    transition(':enter', [
      query('.hero, form', [
        style({ opacity: 0, transform: 'translateY(-100px)' }),
        stagger(-30, [
          animate('1500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
        ])
      ])
    ])
  ]),
  trigger('filterAnimation', [
    transition(':enter, * => 0, * => -1', []),
    transition(':increment', [
      query(':enter', [
        style({ opacity: 0, width: '0px' }),
        stagger(50, [
          animate('1000ms ease-out', style({ opacity: 1, width: '*' })),
        ]),
      ], { optional: true })
    ]),
    transition(':decrement', [
      query(':leave', [
        stagger(50, [
          animate('1000ms ease-out', style({ opacity: 0, width: '0px' })),
        ]),
      ])
    ]),
  ]),
]


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/