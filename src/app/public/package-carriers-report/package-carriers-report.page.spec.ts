import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PackageCarriersReportPage } from './package-carriers-report.page';

describe('PackageCarriersReportPage', () => {
  let component: PackageCarriersReportPage;
  let fixture: ComponentFixture<PackageCarriersReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageCarriersReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PackageCarriersReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
