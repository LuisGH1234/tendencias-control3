// const { sql, config } = require("../config/mssql");
const { query, SQL } = require("../config/mysql");

class Pedido {
  constructor(me) {
    this.id = me.id;
    this.nombre = me.nombre;
    this.direccion = me.direccion;
    this.ubicacion = me.ubicacion;
    this.imagen = me.imagen;
    this.usuarioId = me.usuarioId;
    this.estado = me.estado;
  }

  static from(me) {
    return new Pedido(me);
  }

  static async getAll() {
    const [result, _, err] = await query(SQL`select * from Pedido`);
    return result;
  }

  /** @returns - { insertId: number } */
  static async insert(obj) {
    const pedido = Pedido.from(obj);
    const [res, _, err] = await query(SQL`insert into Pedido set ${pedido}`);
    return res;
  }

  static async update({ id, ...pedido }) {
    // const pedido = Pedido.from(obj);
    const [res, _, err] = await query(
      SQL`update Pedido set ${pedido} where id = '${id}'`
    );
    return err != null;
  }

  /* static async getAll() {
    try {
      // await sql.connect(config);
      const result = await sql.query`select * from Pedido`;
      return result.recordset;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async insert(me) {
    try {
      // await sql.connect(config);
      const p = Pedido.from(me);
      const result = await sql.query`
        INSERT INTO Pedido (nombre, direccion, ubicacion, imagen, usuarioId)
        VALUES ('${p.nombre}', '${p.direccion}', '${p.ubicacion}', '${p.imagen}', 1)`;
      return result.recordset;
    } catch (error) {
      console.error(error);
      return null;
    }
  }*/
}

module.exports = Pedido;
