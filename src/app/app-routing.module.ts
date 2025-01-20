import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { DashboardComponent } from './components/dashboard-container/dashboard.component';
import { NotesContainerComponent } from './components/notes-container/notes-container.component';
import { ArchiveContainerComponent } from './components/archive-container/archive-container.component';
import { TrashContainerComponent } from './components/trash-container/trash-container.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: SignupComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'notes',
        component: NotesContainerComponent
      },
      {
        path: 'archive',
        component: ArchiveContainerComponent
      },
      {
        path: 'trash',
        component: TrashContainerComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
