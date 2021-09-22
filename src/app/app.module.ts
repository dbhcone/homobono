import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { LayoutModule } from '@angular/cdk/layout';
//#region Material Start
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
//#endregionMaterial End
import { MatTableExporterModule } from 'mat-table-exporter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartModule } from 'ng-shopping-cart';
import { SignupComponent } from './components/signup/signup.component';
import { UserLayoutComponent } from './components/shared/user-layout/user-layout.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { FourZeroFourComponent } from './components/shared/four-zero-four/four-zero-four.component';
import { EventsComponent } from './components/events/events.component';
import { EventsComponent as AdminEventsComponent } from './components/admin/events/events.component';
import { EventformComponent } from './components/admin/events/eventformcomponent';
import { UsersComponent } from './components/admin/users/users.component';
import { ClientsComponent } from './components/admin/clients/clients.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { ContactusComponent } from './components/contactus/contactus.component';
// import { ContactComponent } from './components/contact/contact.component';
import { ActivateaccountComponent } from './components/activateaccount/activateaccount.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminNavigationComponent } from './components/admin/admin-navigation.component';
import { SettingsComponent } from './components/admin/settings/settings.component';
import { EventmanagementComponent } from './components/admin/events/eventmanagement.component';
import { EventpricingComponent } from './components/admin/events/eventpricing.component';
import { EventdetailComponent } from './components/events/eventdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    SignupComponent,
    UserLayoutComponent,
    FourZeroFourComponent,
    EventsComponent,
    EventformComponent,
    UsersComponent,
    ClientsComponent,
    GalleryComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContactusComponent,
    // ContactComponent,
    ActivateaccountComponent,
    DashboardComponent,
    AdminNavigationComponent,
    SettingsComponent,
    AdminEventsComponent,
    EventmanagementComponent,
    EventpricingComponent,
    EventdetailComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    // Material Start
    MatButtonModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    MatBadgeModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatDialogModule,
    MatNativeDateModule,
    // Material End
    MatTableExporterModule,
    FormsModule,
    ReactiveFormsModule,
    ShoppingCartModule.forRoot({
      // itemType: PurchaseItem,
      serviceType: 'localStorage',
      serviceOptions: {
        storageKey: 'HomoBonoShoppingCart',
        clearOnError: true,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
