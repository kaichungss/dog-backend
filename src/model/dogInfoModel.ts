import pool from "@/model/db";
import { RowDataPacket } from "mysql2";

export interface RequestParams {
  page: number;
  limit: number;
  name?: string;
}

export interface DogInfo {
  id?: number
  name?: string;
  describe?: string;
  image?: string;
  insert_time?: Date;
  update_time?: Date;
  operate_id?: number;
}

export const getCount = (params: RequestParams) => {
  const list: any[] = [];
  let sql = 'select count(id) count from dog_info';
  if (params.name != null && params.name.length > 0) {
    sql += " where lower(name) like ?";
    list.push("%".concat(params.name).concat("%"))
  }
  return new Promise((resolve, reject) => {
    pool.query(sql, list, (err, rows: RowDataPacket[]) => {
      if (err) {
        reject(err)
      } else {
        const count = rows[0].count;
        resolve(count);
      }
    })
  })
}

export const getAllData = (params: RequestParams) => {
  const exist = params.name != null && params.name.length > 0;
  const offset = (params.page - 1) * params.limit; // 计算偏移量
  const list: any[] = [];
  if (exist) {
    list.push("%".concat(params.name || '').concat("%"))
  }
  list.push(offset, params.limit);
  let sql = 'select s.* from dog_info s,(select id from dog_info ' + (exist ? 'where lower(name) like ?' : '') + ' order by id limit ?,?) t where s.id = t.id';
  return new Promise((resolve, reject) => {
    pool.query(sql, list, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

export const insertData = (data: DogInfo) => {
  return new Promise((resolve, reject) => {
    pool.query('insert into dog_info set ? ', data, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

export const updateData = (id: number, newData: DogInfo) => {
  return new Promise((resolve, reject) => {
    pool.query('update dog_info set ? where id = ?', [newData, id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

export const deleteData = (id: number) => {
  return new Promise((resolve, reject) => {
    pool.query('delete from dog_info where id = ?', id, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
