import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from '../app/components/clientes/clientes.component';
import { PageErrorComponent } from '../app/components/page-error/page-error.component';

const routes: Routes = [
  { path: 'clientes', component: ClientesComponent},
  { path: 'error', component: PageErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
