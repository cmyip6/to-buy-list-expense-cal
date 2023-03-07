import { Knex } from "knex";

export class AuthService {
    constructor(private knex: Knex) { }

    async login(username: string) {
        const [user] = await this.knex("users").where("username", username);
        if (user) {
            delete user.password;
            return user;
        } 
    }

    async getUserList() {
        
            const txn = await this.knex.transaction();
            try {
                const result = await txn("users").select('id as userID', 'username')

                await txn.commit();
                return result;

            } catch (e) {
                await txn.rollback();
                throw e;
            }
        
    }

    async getUser(id: number) {
        const [user] = await this.knex("users").where("id", id);
        if (user) {
            delete user.password;
            return user;
        } 
    }
}