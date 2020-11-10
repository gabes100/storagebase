export class Order {
    name : String;
    id : Number;
    date : String;
   
    constructor(obj : any){
        this.name = obj.name;
        this.id = obj.id;
        this.date = obj.enterDate;
    }

}

