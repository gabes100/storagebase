export class Item {
    name : String;
    type : String;
    expiration : Date;
    price : Number;
    quantity: Number;

    constructor(obj : any){
        this.name = obj.name;
        this.type = obj.type;
        this.expiration = obj.expiration;
        this.price = obj.price;
        this.quantity = obj.quantity;
    }

}

