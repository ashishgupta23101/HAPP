import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LinkEmailAcPage } from './link-email-ac.page';

describe('LinkEmailAcPage', () => {
  let component: LinkEmailAcPage;
  let fixture: ComponentFixture<LinkEmailAcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkEmailAcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkEmailAcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
