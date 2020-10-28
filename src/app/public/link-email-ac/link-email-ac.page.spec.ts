import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LinkEmailACPage } from './link-email-ac.page';

describe('LinkEmailACPage', () => {
  let component: LinkEmailACPage;
  let fixture: ComponentFixture<LinkEmailACPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkEmailACPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkEmailACPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
