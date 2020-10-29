import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LinkEmailFailPage } from './link-email-fail.page';

describe('LinkEmailFailPage', () => {
  let component: LinkEmailFailPage;
  let fixture: ComponentFixture<LinkEmailFailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkEmailFailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkEmailFailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
