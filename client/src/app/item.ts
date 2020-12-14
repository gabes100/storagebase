export class Item {
    name : String;
    typeId : Number;
    expiration : Date;
    price : Number;
    quantity: Number;

    constructor(obj : any){
        this.name = obj.name;
        this.typeId = obj.typeId;
        this.expiration = obj.expiration;
        this.price = obj.price;
        this.quantity = obj.quantity;
    }

}

