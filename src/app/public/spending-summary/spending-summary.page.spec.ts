import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpendingSummaryPage } from './spending-summary.page';

describe('SpendingSummaryPage', () => {
  let component: SpendingSummaryPage;
  let fixture: ComponentFixture<SpendingSummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendingSummaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpendingSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
