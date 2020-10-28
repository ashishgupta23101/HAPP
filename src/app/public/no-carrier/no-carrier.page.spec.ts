import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoCarrierPage } from './no-carrier.page';

describe('NoCarrierPage', () => {
  let component: NoCarrierPage;
  let fixture: ComponentFixture<NoCarrierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoCarrierPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoCarrierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
