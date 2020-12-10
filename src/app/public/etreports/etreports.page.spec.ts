import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ETReportsPage } from './etreports.page';

describe('ETReportsPage', () => {
  let component: ETReportsPage;
  let fixture: ComponentFixture<ETReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ETReportsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ETReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
