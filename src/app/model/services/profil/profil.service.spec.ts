import { TestBed } from '@angular/core/testing';
import { ProfilService } from './profil.service';

/* Sert à transmettre l'information de succès ou d'échec d'une opération asynchrone comme les appels HTTP. */

describe('UserService', () => {
  let service: ProfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
