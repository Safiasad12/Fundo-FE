import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchiveContainerComponent } from './archive-container.component';
import { NoteService } from 'src/app/services/note-service/note.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ArchiveContainerComponent', () => {
  let component: ArchiveContainerComponent;
  let fixture: ComponentFixture<ArchiveContainerComponent>;
  let mockNoteService: jasmine.SpyObj<NoteService>;

  beforeEach(async () => {

    mockNoteService = jasmine.createSpyObj('NoteService', ['fetchNotesApiCall']);

    await TestBed.configureTestingModule({
      declarations: [ArchiveContainerComponent],
      providers: [
        { provide: NoteService, useValue: mockNoteService }
      ],
      schemas: [NO_ERRORS_SCHEMA] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveContainerComponent);
    component = fixture.componentInstance;

    const mockResponse = { notes: [{ _id: '1', isArchive: true }, { _id: '2', isArchive: false }] };
    mockNoteService.fetchNotesApiCall.and.returnValue(of(mockResponse));

    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch archived notes on ngOnInit', () => {
    component.ngOnInit();

    expect(mockNoteService.fetchNotesApiCall).toHaveBeenCalled();
    expect(component.archiveNotesList).toEqual([{ _id: '1', isArchive: true }]);
  });

  it('should filter out unarchived notes from the response', () => {
    component.ngOnInit();
    expect(component.archiveNotesList.length).toBe(1);
    expect(component.archiveNotesList[0]._id).toBe('1');
  });

  it('should handle archive notes list update when action is "unarchive"', () => {
    component.archiveNotesList = [{ _id: '1', isArchive: true }, { _id: '2', isArchive: true }];
    
    component.handleArchiveNotesList({ data: { _id: '1' }, action: 'unarchive' });

    expect(component.archiveNotesList.length).toBe(1);
    expect(component.archiveNotesList[0]._id).toBe('2');
  });

  it('should handle archive notes list update when action is "trash"', () => {
    component.archiveNotesList = [{ _id: '1', isArchive: true }, { _id: '2', isArchive: true }];
    
    component.handleArchiveNotesList({ data: { _id: '2' }, action: 'trash' });

    expect(component.archiveNotesList.length).toBe(1);
    expect(component.archiveNotesList[0]._id).toBe('1');
  });

  it('should not modify the archive notes list when action is neither "unarchive" nor "trash"', () => {
    component.archiveNotesList = [{ _id: '1', isArchive: true }];
    
    component.handleArchiveNotesList({ data: { _id: '1' }, action: 'other-action' });

    expect(component.archiveNotesList.length).toBe(1);
    expect(component.archiveNotesList[0]._id).toBe('1');
  });
});
