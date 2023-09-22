import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
// import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { LoginModule } from './pages/login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
// Toastr alert
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent
  ],
  providers: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PagesModule,
    LoginModule,
    HttpClientModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
