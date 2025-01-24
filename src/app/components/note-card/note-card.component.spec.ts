
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteCardComponent } from './note-card.component';
import { MatIconModule } from '@angular/material/icon'; 
import { MatMenuModule } from '@angular/material/menu'; 
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { DomSanitizer } from '@angular/platform-browser';
import { NoteService } from 'src/app/services/note-service/note.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { AddNoteComponent } from '../add-note/add-note.component';
import { By } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

describe('NoteCardComponent', () => {
  let component: NoteCardComponent;
  let fixture: ComponentFixture<NoteCardComponent>;
  let mockNoteService: jasmine.SpyObj<NoteService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockDomSanitizer: jasmine.SpyObj<DomSanitizer>;

  beforeEach(async () => {
    mockNoteService = jasmine.createSpyObj('NoteService', [
      'toggleArchiveApiCall',
      'toggleTrashApiCall',
      'changeColorApiCall',
      'deletePermanentlyApiCall',
    ]);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockDomSanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustHtml', 'sanitize']);

    
    mockDomSanitizer.sanitize.and.returnValue('safeHtml');

    await TestBed.configureTestingModule({
      declarations: [NoteCardComponent],
      imports: [
        MatIconModule, 
        MatMenuModule, 
        MatTooltipModule, 
        MatDialogModule, 
      ],
      providers: [
        { provide: NoteService, useValue: mockNoteService },
        { provide: MatDialog, useValue: mockMatDialog },
        MatIconRegistry,
        { provide: DomSanitizer, useValue: mockDomSanitizer },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render note title and description', () => {
   
    const mockMatIconRegistry = TestBed.inject(MatIconRegistry);
    spyOn(mockMatIconRegistry, 'getNamedSvgIcon').and.returnValue(of(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));
  
    component.noteDetails = { title: 'Test Title', description: 'Test Description', color: '#FFFFFF' };
    component.container = 'notes';
    fixture.detectChanges();
  
   
    const titleElement = fixture.debugElement.query(By.css('.note-title')).nativeElement;
    const descriptionElement = fixture.debugElement.query(By.css('.note-content')).nativeElement;
  
    
    expect(titleElement.textContent).toContain('TEST TITLE'); 
    expect(descriptionElement.textContent).toContain('Test Description');
  });
  
  it('should call handleEditNote when note header or body is clicked', () => {
    
    const mockMatIconRegistry = TestBed.inject(MatIconRegistry);
    spyOn(mockMatIconRegistry, 'getNamedSvgIcon').and.returnValue(of(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));
  
  
    spyOn(component, 'handleEditNote');
  
   
    component.noteDetails = { title: 'Test Title', description: 'Test Description', color: '#FFFFFF' };
    component.container = 'notes';
    fixture.detectChanges();
  
   
    const headerElement = fixture.debugElement.query(By.css('.note-card-header')).nativeElement;
    headerElement.click();
  
  
    const bodyElement = fixture.debugElement.query(By.css('.note-card-body')).nativeElement;
    bodyElement.click();
  
   
    expect(component.handleEditNote).toHaveBeenCalledTimes(2);
  });

  it('should call handleNoteIconsClick with "archive" when archive button is clicked', () => {
  
    const mockMatIconRegistry = TestBed.inject(MatIconRegistry);
    spyOn(mockMatIconRegistry, 'getNamedSvgIcon').and.returnValue(of(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));
  
   
    spyOn(component, 'handleNoteIconsClick');
  
   
    component.noteDetails = { _id: '123', title: 'Test Title', description: 'Test Description', color: '#FFFFFF' };
    component.container = 'notes';
    fixture.detectChanges();
  
   
    const archiveButton = fixture.debugElement.query(By.css('[aria-label="archive button"]')).nativeElement;
    archiveButton.click();
  
   
    expect(component.handleNoteIconsClick).toHaveBeenCalledWith('archive');
  });


//   it('should call handleNoteIconsClick with "color" when a color is selected', () => {
   
//     const mockMatIconRegistry = TestBed.inject(MatIconRegistry);
//     spyOn(mockMatIconRegistry, 'getNamedSvgIcon').and.returnValue(of(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));
  
//     spyOn(component, 'handleNoteIconsClick');
  
//     component.noteDetails = { _id: '123', title: 'Test Title', description: 'Test Description', color: '#FFFFFF' };
//     component.container = 'notes';
//     fixture.detectChanges();
  
//     const colorButton = fixture.debugElement.query(By.css('[aria-label="color button"]')).nativeElement;
//     colorButton.click();
//     fixture.detectChanges();
  
//     const colorMenu = fixture.debugElement.query(By.css('.color-palate-cnt'));
//     expect(colorMenu).toBeTruthy(); 
  
//     const colorOption = colorMenu.query(By.css('.col2')).nativeElement;
//     colorOption.click();
 
//     expect(component.handleNoteIconsClick).toHaveBeenCalledWith('color', '#FAAFA8');
//   });


  it('should call toggleArchiveApiCall when handleNoteIconsClick is called with "archive"', () => {
    mockNoteService.toggleArchiveApiCall.and.returnValue(of({}));
    component.noteDetails = { _id: '123', title: 'Test Title', description: 'Test Description', color: '#FFFFFF' };
    component.handleNoteIconsClick('archive');

    expect(mockNoteService.toggleArchiveApiCall).toHaveBeenCalledWith('123');
  });


  it('should call toggleTrashApiCall when handleNoteIconsClick is called with "trash"', () => {
    mockNoteService.toggleTrashApiCall.and.returnValue(of({}));
    component.noteDetails = { _id: '123', title: 'Test Title', description: 'Test Description', color: '#FFFFFF' };
    component.handleNoteIconsClick('trash');

    expect(mockNoteService.toggleTrashApiCall).toHaveBeenCalledWith('123');
  });

  it('should call changeColorApiCall when handleNoteIconsClick is called with "color"', () => {
    mockNoteService.changeColorApiCall.and.returnValue(of({}));
    component.noteDetails = { _id: '123', title: 'Test Title', description: 'Test Description', color: '#FFFFFF' };
    component.handleNoteIconsClick('color', '#FAAFA8');

    expect(mockNoteService.changeColorApiCall).toHaveBeenCalledWith('123', { color: '#FAAFA8' });
  });

  it('should open AddNoteComponent dialog when handleEditNote is called', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of({}));
    mockMatDialog.open.and.returnValue(dialogRefSpy);

    component.noteDetails = { _id: '123', title: 'Test Title', description: 'Test Description', color: '#FFFFFF' };
    component.handleEditNote();

    expect(mockMatDialog.open).toHaveBeenCalledWith(AddNoteComponent, {
      data: { noteDetails: component.noteDetails, openEditNote: true },
    });
  });
});