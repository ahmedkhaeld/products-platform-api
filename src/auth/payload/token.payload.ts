/**
 * Define an interface to set the Token payload structure
 * this will be used accross all the application
 */
export interface ITokenPayload {
  id: number;
  email: string;
  tokenType: string;
  roles: string[];

  getTokenPayload();
}

export class UserTokenPayload implements ITokenPayload {
  id: number;
  tokenType: string;
  email: string;
  roles: string[];

  constructor(id: number, tokenType: string, email: string, roles: string[]) {
    this.id = id;
    this.tokenType = tokenType;
    this.email = email;
    this.roles = roles;
  }

  public getTokenPayload() {
    return {
      id: this.id,
      email: this.email,
      tokenType: this.tokenType,
      roles: this.roles,
    };
  }
}
