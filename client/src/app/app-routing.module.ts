import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BlogComponent } from './components/blog/blog.component';

const appRoutes: Routes = [
  { path: '**', component: BlogComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }