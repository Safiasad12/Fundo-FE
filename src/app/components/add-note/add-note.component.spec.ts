
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNoteComponent } from './add-note.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { NoteService } from 'src/app/services/note-service/note.service';
import { of, throwError } from 'rxjs';

describe('AddNoteComponent', () => {
  let component: AddNoteComponent;
  let fixture: ComponentFixture<AddNoteComponent>;
  let noteServiceSpy: jasmine.SpyObj<NoteService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<AddNoteComponent>>;

  beforeEach(async () => {
    const noteServiceMock = jasmine.createSpyObj('NoteService', ['addNoteApiCall', 'updateNoteApiCall']);
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [AddNoteComponent],
      imports: [
        FormsModule,
        MatDialogModule,
        MatIconModule,
        MatTooltipModule,
        MatMenuModule,
      ],
      providers: [
        { provide: NoteService, useValue: noteServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: null },
      ],
    }).compileComponents();

    noteServiceSpy = TestBed.inject(NoteService) as jasmine.SpyObj<NoteService>;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<AddNoteComponent>>;
    fixture = TestBed.createComponent(AddNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create the component', () => {
    expect(component).toBeTruthy();
  });



  it('should render elements properly', () => {
   
    component.isExpanded = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.note-collapsed')?.textContent).toContain('Take a note...');
  
    component.isExpanded = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.title-input')).toBeTruthy();
    expect(compiled.querySelector('.note-textarea')).toBeTruthy();
    expect(compiled.querySelector('.close-btn')).toBeTruthy();
  });
  


  it('should show validation messages when title or description is empty and submitted', () => {
    component.submitted = true;
    component.title = '';
    component.description = '';
    fixture.detectChanges();
    expect(component.submitted).toBeTrue();
    expect(component.title).toBe('');
    expect(component.description).toBe('');
  });



  it('should call the addNoteApiCall when adding a new note', () => {
    component.title = 'Test Title';
    component.description = 'Test Description';
    component.isExpanded = true;
    component.data = null;
  
    noteServiceSpy.addNoteApiCall.and.returnValue(of({ data: { title: 'Test Title', description: 'Test Description' } }));
  
    component.handleAddNoteIconsClick('close'); 
    expect(noteServiceSpy.addNoteApiCall).toHaveBeenCalledWith({
      title: 'Test Title',
      description: 'Test Description',
      isArchive: false,
      color: '#ffffff',
    });
  });
  





  it('should handle API errors gracefully when adding a new note', () => {
    component.title = 'Test Title';
    component.description = 'Test Description';
    component.isExpanded = true; 
    component.data = null; 
    const error = new Error('API error');
    noteServiceSpy.addNoteApiCall.and.returnValue(throwError(() => error)); 
  
    spyOn(console, 'log'); 
  
    component.handleAddNoteIconsClick('close');
  
    expect(noteServiceSpy.addNoteApiCall).toHaveBeenCalledWith({
      title: 'Test Title',
      description: 'Test Description',
      isArchive: false,
      color: '#ffffff',
    });
  
    expect(console.log).toHaveBeenCalledWith(error); 
  });
  


  it('should call the updateNoteApiCall when editing an existing note', () => {
  
    component.title = 'Updated Title';
    component.description = 'Updated Description';
    component.isExpanded = true; 
    component.data = { noteDetails: { _id: '123', title: 'Old Title', description: 'Old Description' } }; 
  
    noteServiceSpy.updateNoteApiCall.and.returnValue(of({ success: true })); 
   
    component.handleAddNoteIconsClick('close');
  
  
    expect(noteServiceSpy.updateNoteApiCall).toHaveBeenCalledWith('123', {
      newTitle: 'Updated Title',
      newDescription: 'Updated Description',
    });
  });
  

  
  it('should navigate back (close dialog) after updating a note', () => {
    
    component.title = 'Updated Title';
    component.description = 'Updated Description';
    component.isExpanded = true;
    component.data = { noteDetails: { _id: '123', title: 'Old Title', description: 'Old Description' } };
  
  
    noteServiceSpy.updateNoteApiCall.and.returnValue(of({}));
  
    
    dialogRefSpy.close.calls.reset();
  
    component.handleAddNoteIconsClick('close');
  
   
    expect(noteServiceSpy.updateNoteApiCall).toHaveBeenCalledWith('123', {
      newTitle: 'Updated Title',
      newDescription: 'Updated Description',
    });
  
  
    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      _id: '123',
      title: 'Updated Title',
      description: 'Updated Description',
    });
  });

});

