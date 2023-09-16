const { createClient } = require('redis');

class Db {
    static #client;
    static init = async () => {
        this.#client = createClient();
        this.#client.on('error', error => console.error(`Redis client error : ${error}`));
        await this.#client.connect();
    }
    static build = async id => this.#client.rpush(id, 'void');
    static add = async (id, num) => {
        const pre = await this.#client.lindex(id, -1);
        await this.#client.lset(id, -1, pre + num);
    }
    static subtract = async (id, num) => {
        const pre = await this.#client.lindex(id, -1);
        await this.#client.lset(id, -1, pre - num);
    }
    static multiply = async (id, num) => {
        const pre = await this.#client.lindex(id, -1);
        await this.#client.lset(id, -1, num * pre);
    }
    static divide = async (id, num) => {
        const pre = await this.#client.lindex(id, -1);
        await this.#client.lset(id, -1, pre / num);
    }
    static modulo = async (id, num) => {
        const pre = await this.#client.lindex(id, -1);
        await this.#client.lset(id, -1, pre % num);
    }
    static exponent = async (id, num) => {
        const pre = await this.#client.lindex(id, -1);
        await this.#client.lset(id, -1, pre ** num);
    }
}

module.exports = Db;