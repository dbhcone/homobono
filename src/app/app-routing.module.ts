import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ActivateaccountComponent } from './components/activateaccount/activateaccount.component';
import { AdminNavigationComponent } from './components/admin/admin-navigation.component';
import { EventformComponent } from './components/admin/events/eventformcomponent';
import { DashboardComponent as AdminDashboardComponent } from './components/admin/dashboard/dashboard.component';
import { SettingsComponent } from './components/admin/settings/settings.component';
// import { ContactComponent } from './components/contact/contact.component';
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
import { EventmanagementComponent } from './components/admin/events/eventmanagement.component';
const routes: Routes = [
  {
    path: '',
    // pathMatch: 'full',
    component: LayoutComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'logout', redirectTo: 'login' },
      { path: 'events', component: EventsComponent },
      { path: 'gallery', component: GalleryComponent },
      // { path: 'contact', component: ContactComponent },
      { path: 'contact-us', component: ContactusComponent },
      { path: 'about-us', component: AboutComponent },
      { path: 'activate-account', component: ActivateaccountComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminNavigationComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'events', component: AdminEventsComponent },
      {path: 'eventmanagement/:id', component: EventmanagementComponent},
      { path: 'settings', component: SettingsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'clients', component: ClientsComponent },
    ],
  },
  { path: '**', component: FourZeroFourComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
