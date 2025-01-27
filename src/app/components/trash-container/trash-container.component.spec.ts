import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrashContainerComponent } from './trash-container.component';
import { NoteService } from 'src/app/services/note-service/note.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TrashContainerComponent', () => {
  let component: TrashContainerComponent;
  let fixture: ComponentFixture<TrashContainerComponent>;
  let mockNoteService: jasmine.SpyObj<NoteService>;

  beforeEach(async () => {
  
    mockNoteService = jasmine.createSpyObj('NoteService', ['fetchNotesApiCall']);

    await TestBed.configureTestingModule({
      declarations: [TrashContainerComponent],
      providers: [
        { provide: NoteService, useValue: mockNoteService }
      ],
      schemas: [NO_ERRORS_SCHEMA] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashContainerComponent);
    component = fixture.componentInstance;


    const mockResponse = { notes: [{ _id: '1', isTrash: true }, { _id: '2', isTrash: false }] };
    mockNoteService.fetchNotesApiCall.and.returnValue(of(mockResponse));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch trash notes on ngOnInit', () => {
    component.ngOnInit();

    expect(mockNoteService.fetchNotesApiCall).toHaveBeenCalled();
    expect(component.trashNotesList.length).toBe(1);
    expect(component.trashNotesList[0]._id).toBe('1');
  });

  it('should filter out non-trash notes from the response', () => {
    component.ngOnInit();
    expect(component.trashNotesList.length).toBe(1);
    expect(component.trashNotesList[0]._id).toBe('1');
  });

  it('should handle trash notes list update when action is "delete"', () => {
    component.trashNotesList = [{ _id: '1', isTrash: true }, { _id: '2', isTrash: true }];
    
    component.handleTrashNotesList({ data: { _id: '1' }, action: 'delete' });

    expect(component.trashNotesList.length).toBe(1);
    expect(component.trashNotesList[0]._id).toBe('2');
  });

  it('should handle trash notes list update when action is "restore"', () => {
    component.trashNotesList = [{ _id: '1', isTrash: true }, { _id: '2', isTrash: true }];
    
    component.handleTrashNotesList({ data: { _id: '2' }, action: 'restore' });

    expect(component.trashNotesList.length).toBe(1);
    expect(component.trashNotesList[0]._id).toBe('1');
  });

  it('should not modify the trash notes list when action is neither "delete" nor "restore"', () => {
    component.trashNotesList = [{ _id: '1', isTrash: true }];
    
    component.handleTrashNotesList({ data: { _id: '1' }, action: 'other-action' });

    expect(component.trashNotesList.length).toBe(1);
    expect(component.trashNotesList[0]._id).toBe('1');
  });

  it('should display note cards in the template', () => {
    component.ngOnInit();

   
    fixture.detectChanges();

    const noteCards = fixture.debugElement.queryAll(By.css('app-note-card'));
    expect(noteCards.length).toBe(1); 
  });
});
