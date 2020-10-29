import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelpconfirmPage } from './helpconfirm.page';

describe('HelpconfirmPage', () => {
  let component: HelpconfirmPage;
  let fixture: ComponentFixture<HelpconfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpconfirmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpconfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
