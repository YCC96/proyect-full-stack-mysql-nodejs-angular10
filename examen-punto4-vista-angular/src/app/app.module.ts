import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clientes/clientes.component';

import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from './services/cliente.service';
import { PageErrorComponent } from './components/page-error/page-error.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    PageErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ClienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
