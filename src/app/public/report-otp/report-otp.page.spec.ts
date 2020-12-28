import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportOtpPage } from './report-otp.page';

describe('ReportOtpPage', () => {
  let component: ReportOtpPage;
  let fixture: ComponentFixture<ReportOtpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOtpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportOtpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
