export class User {
    firstName : String;
    lastName : String;
    username : String;

    constructor(obj : any){
        this.username = obj.username;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
    }
}
