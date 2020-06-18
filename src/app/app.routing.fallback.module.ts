import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
      { path: '**', redirectTo: 'inicio' }
    ])
  ],
  exports: [RouterModule]
})
export class FallbackRoutingModule { }
