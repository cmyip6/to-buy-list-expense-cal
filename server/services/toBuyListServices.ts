import { Knex } from "knex";

export class ToBuyListService {
    constructor(private knex: Knex) { }

    async addNewItem(itemName: string, quantity: number, remarks: string) {
        const [item] = await this.knex("to_buy_lists").insert({
            item_name: itemName,
            quantity,
            remarks,
            state: 'pending',
        }).returning('*');
        
        return item
    }
    
    async getToBuyList() {
        const toBuyList = await this.knex("to_buy_lists").select('*').orderBy('id', 'asc')
        return toBuyList
    }

    async editItem(id: number, itemName: string, quantity: number, remarks: string | undefined, handler: number | undefined, state: string) {
        const [item] = await this.knex("to_buy_lists")
        .update({
            item_name: itemName,
            quantity,
            remarks,
            handler: handler ? handler : null,
            state
        }).returning('*')
        .where('id', id)
        return item
    }

    async deleteItem(id: number) {
        await this.knex("to_buy_lists")
        .where('id', id)
        .delete()
        return null
    }

}