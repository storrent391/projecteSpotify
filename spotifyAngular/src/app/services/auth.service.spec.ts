import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
const baseUrl = 'http://localhost:5000/api/auth';

describe('AuthService (TDD)', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const dummyUser = {
    id: 1,
    username: 'juan',
    email: 'juan@ej.com',
    password: 'patata123',
    token: 'abc123'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      
      providers: [
        AuthService,
        provideHttpClientTesting() 
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should issue a POST to /auth/login and store token', () => {
    service.login(dummyUser.email, dummyUser.password).subscribe(user => {
      expect(user).toEqual(dummyUser);
      expect(localStorage.getItem('token')).toBe('abc123');
    });

    const req = httpMock.expectOne(`${baseUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
  });
});
