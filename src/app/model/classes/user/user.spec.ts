import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User(1, 'Doe', 'John', 'password123', 'john.doe@example.com', 'user', 'profile.jpg', false, 'role')).toBeTruthy();
  });
});
