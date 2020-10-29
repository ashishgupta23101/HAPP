import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Pkgshipinfo2Page } from './pkgshipinfo2.page';

describe('Pkgshipinfo2Page', () => {
  let component: Pkgshipinfo2Page;
  let fixture: ComponentFixture<Pkgshipinfo2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pkgshipinfo2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Pkgshipinfo2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
