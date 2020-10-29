import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PkgshipinfoPage } from './pkgshipinfo.page';

describe('PkgshipinfoPage', () => {
  let component: PkgshipinfoPage;
  let fixture: ComponentFixture<PkgshipinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PkgshipinfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PkgshipinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
