import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UrlChangerPage } from './url-changer.page';

describe('UrlChangerPage', () => {
  let component: UrlChangerPage;
  let fixture: ComponentFixture<UrlChangerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlChangerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UrlChangerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
