import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';



import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard-container/dashboard.component';
import { ArchiveContainerComponent } from './components/archive-container/archive-container.component';
import { NotesContainerComponent } from './components/notes-container/notes-container.component';
import { TrashContainerComponent } from './components/trash-container/trash-container.component';
import { SearchPipe } from './pipe/search.pipe';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AddNoteComponent,
    NoteCardComponent,
    DashboardComponent,
    ArchiveContainerComponent,
    NotesContainerComponent,
    TrashContainerComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatMenuModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
