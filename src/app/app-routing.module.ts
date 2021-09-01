import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ActivateaccountComponent } from './components/activateaccount/activateaccount.component';
import { AdminNavigationComponent } from './components/admin/admin-navigation.component';
import { CreateEventComponent } from './components/admin/events/create-event.component';
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
const routes: Routes = [
  {
    path: '',
    // pathMatch: 'full',
    component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'logout', redirectTo: 'login' },
      { path: 'home', component: HomeComponent },
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
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'events', component: AdminEventsComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
  { path: '**', component: FourZeroFourComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
