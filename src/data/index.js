const { createClient } = require('redis');

class Db {
    static #client;
    static init = async () => {
        this.#client = createClient();
        this.#client.on('error', error => console.error(`Redis client error : ${error}`));
        await this.#client.connect();
    }
    static build = id => this.#client.rPush(id, '0');
    static add = async (id, num) => {
        const pre = await this.#client.lIndex(id, '-1');
        const answer = parseInt(pre) + parseInt(num);
        await this.#client.rPush(id, String(answer));
        return answer;
    }
    static subtract = async (id, num) => {
        const pre = await this.#client.lIndex(id, '-1');
        const answer = parseInt(pre) - parseInt(num);
        await this.#client.rPush(id, String(answer));
        return answer;
    }
    static multiply = async (id, num) => {
        const pre = await this.#client.lIndex(id, '-1');
        const answer = parseInt(pre) * parseInt(num);
        await this.#client.rPush(id, String(answer));
        return answer;
    }
    static divide = async (id, num) => {
        const pre = await this.#client.lIndex(id, '-1');
        const answer = parseInt(pre) / parseInt(num);
        await this.#client.rPush(id, String(answer));
        return answer;
    }
    static modulo = async (id, num) => {
        const pre = await this.#client.lIndex(id, '-1');
        const answer = parseInt(pre) % parseInt(num);
        await this.#client.rPush(id, String(answer));
        return answer;
    }
    static exponent = async (id, num) => {
        const pre = await this.#client.lIndex(id, '-1');
        const answer = parseInt(pre) ** parseInt(num);
        await this.#client.rPush(id, String(answer));
        return answer;
    }
    static undo = async id => {
        const results = await this.#client
            .multi()
            .rPop(id)
            .lIndex(id, '-1')
            .exec();
        const totalOps = await this.#client.lLen(id);
        return { result: results[1], totalOps };
    }
    static reset = id => {
        this.#client.del(id);
    }
}

module.exports = Db;