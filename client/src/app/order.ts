export class Order {
    name : String;
    date : String;
    id : Number;
    totalItems : Number;
    totalPrice : Number;

    constructor(obj : any){
        this.name = obj.name;
        this.id = obj.id;
        this.date = obj.enterDate;
        this.totalItems = obj.totalItems;
        this.totalPrice = obj.totalPrice;
    }

}

