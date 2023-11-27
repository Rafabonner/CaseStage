import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PessoasService } from './pessoas.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap/modal' ;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoasComponent } from './components/pessoas/pessoas.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    PessoasComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
  ],
  providers: [HttpClientModule, PessoasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
