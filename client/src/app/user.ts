export class User {
    firstname : String;
    lastname : String;
    username : String;

    constructor(obj : any){
        this.username = obj.username;
        this.firstname = obj.firstname;
        this.lastname = obj.lastname;
    }
}
