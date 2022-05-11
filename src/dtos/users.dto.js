export default class UsersDto {
  userId;
  email;

  constructor(user) {
    this.userId = user.id;
    this.email = user.email;
  }
}
