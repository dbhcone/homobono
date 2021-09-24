import { CartItem } from 'ng-shopping-cart';

export class TicketItem extends CartItem {
    public id: string;
    public name: string;
    public price: number;
    public quantity: number;
    public image: string;
    public ticketImage: string;

    constructor(ticket: any = {}) {
        super();
        this.id = ticket.id;
        this.name = ticket.name;
        this.image = ticket.image;
        this.price = ticket.price;
        this.quantity = ticket.quantity;
        this.ticketImage = ticket.ticketImage;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }

    getQuantity(): number {
        return this.quantity;
    }

    setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    getImage(): string {
        return this.image;
    }

    getTicketImage(): string {
        return this.ticketImage;
    }

}
