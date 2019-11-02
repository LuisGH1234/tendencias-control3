// const { sql, config } = require("../config/mssql");
const { query, SQL } = require("../config/mysql");

class User {
    constructor(me) {
        this.id = me.id;
        this.username = me.username;
        this.password = me.password;
    }

    static from(obj) {
        return new User(obj);
    }

    static async getByUsername(a, b) {
        const [res, _, err] = await query(SQL`select * from Usuario where username = ${a}`);
        return res[0];
    }

    static async findById(id) {
        const [res, _, err] = await query(SQL`select * from Usuario where id = ${id}`);
        return res[0];
    }

    /**
     * @param - { username: string, password hash-string }
     * @returns - { insertId: number }
     * */
    static async insert(obj) {
        const user = User.from(obj);
        // Tagged template strings
        const [res, _, err] = await query(SQL`insert into Usuario set ${user}`);
        return res;
    }

    /** @return User[] */
    /*static async getByPasswordAndUsername(u, pwd) {
    try {
      // await sql.connect(config);
      console.log(u, pwd);
      const result = await sql.query`select * from Usuario where username = '${u}' and password = '${pwd}'`;
      console.log(result);
      return result.recordset[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  }*/
}

module.exports = User;
