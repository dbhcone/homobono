import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ActivateaccountComponent } from './components/activateaccount/activateaccount.component';
import { AdminNavigationComponent } from './components/admin/admin-navigation.component';
import { DashboardComponent as AdminDashboardComponent } from './components/admin/dashboard/dashboard.component';
import { SettingsComponent } from './components/admin/settings/settings.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { EventsComponent } from './components/events/events.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FourZeroFourComponent } from './components/shared/four-zero-four/four-zero-four.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { SignupComponent } from './components/signup/signup.component';
import { EventsComponent as AdminEventsComponent } from './components/admin/events/events.component';
import { UsersComponent } from './components/admin/users/users.component';
import { ClientsComponent } from './components/admin/clients/clients.component';
import { EventmanagementComponent } from './components/admin/events/management/eventmanagement.component';
import { EventdetailComponent } from './components/events/eventdetail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthGuard } from './guards/auth.guard';
import { CartComponent } from './components/checkout/cart.component';
import { ScannerComponent } from './components/scanner/scanner.component';
import { UserNavigationComponent } from './components/user/user-navigation.component';
import { UserdashboardComponent } from './components/user/dashboard/userdashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { EventPortalComponent } from './components/admin/events/portal/eventportal.component';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserpurchasesComponent } from './components/user/purchases/userpurchases.component';
import { ProcesspaymentComponent } from './components/checkout/processpayment/processpayment.component';
const routes: Routes = [
  {
    //#region General routes
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'logout', redirectTo: 'login' },
      { path: 'events', component: EventsComponent },
      { path: 'events/:id', component: EventdetailComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'contact-us', component: ContactusComponent },
      { path: 'about-us', component: AboutComponent },
      { path: 'activate-account', component: ActivateaccountComponent },
      { path: 'cart', component: CartComponent },
      // { path: 'checkout', component: CheckoutComponent },
      { path: 'checkout', component: ProcesspaymentComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },
  //#endregion

  //#region Admin routes
  {
    path: 'admin',
    component: AdminNavigationComponent,
    canActivate: [AuthGuard, AdminGuard],
    // canActivateChild: [AuthGuard, AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'events', component: AdminEventsComponent, pathMatch: 'full' },
      { path: 'eventmanagement/:id', component: EventmanagementComponent },
      // { path: 'events/portal', component:  },
      { path: 'events/portal/:id', component: EventPortalComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'clients', component: ClientsComponent },
    ],
  },
  //#endregion

  {
    path: 'user',
    component: UserNavigationComponent,
    canActivate: [AuthGuard, UserGuard],
    // canActivateChild: [AuthGuard, UserGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: UserdashboardComponent },
      { path: 'purchase-history', component: UserpurchasesComponent },
    ],
  },
  //#region Other routes
  { path: 'scanner', component: ScannerComponent },
  { path: '**', component: FourZeroFourComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
