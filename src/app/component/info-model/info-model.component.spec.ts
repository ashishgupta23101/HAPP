import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoModelComponent } from './info-model.component';

describe('InfoModelComponent', () => {
  let component: InfoModelComponent;
  let fixture: ComponentFixture<InfoModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoModelComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
