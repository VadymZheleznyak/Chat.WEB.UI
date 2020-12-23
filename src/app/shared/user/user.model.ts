export class User {
    UserName: string;
    Email: string;
    Password: string;
    Role: string;
    constructor(fb: any){
        this.UserName = fb.value.UserName;
        this.Email = fb.value.Email;
        this.Password = fb.value.Passwords.Password;
    }
}