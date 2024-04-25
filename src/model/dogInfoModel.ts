import pool from "@/model/db";
import { RowDataPacket } from "mysql2";

export interface RequestParams {
  page: number;
  limit: number;
  name?: string;
  id?: number;
}

export interface DogInfo {
  id?: number
  name?: string;
  gender?:string;
  color?:string;
  size?:string;
  sterilized?:string;
  vaccinated?:string;
  breed?: string;
  describe?: string;
  image_list?: string;
  insert_time?: Date;
  update_time?: Date;
  operate_id?: number;
}

export const getCount = (params: RequestParams) => {
  const list: any[] = [];
  const exist = params.name != null && params.name.length > 0;
  let sql = 'select count(id) count from dog_info';
  if (exist) {
    sql += " where lower(name) like ? ";
    list.push("%".concat(params.name || '').concat("%"))
  }
  if (params.id) {
    sql += (exist ? ' and ' : ' where ') + ' operate_id = ? '
    list.push(params.id);
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
  const offset = (params.page - 1) * params.limit;
  const list: any[] = [];
  let append = '';
  if (exist) {
    append += ' where lower(name) like ? '
    list.push("%".concat(params.name || '').concat("%"))
  }
  if (params.id) {
    append += (exist ? ' and ' : ' where ') + ' operate_id = ? '
    list.push(params.id);
  }
  list.push(offset, params.limit);
  let sql = 'select * from dog_info ' + append + ' order by update_time desc LIMIT ?,?'
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


export const getAllViewData = (params: RequestParams) => {
  const exist = params.name != null && params.name.length > 0;
  const offset = (params.page - 1) * params.limit;
  const list: any[] = [];
  list.push(params.id);
  if (exist) {
    list.push("%".concat(params.name || '').concat("%"))
  }
  list.push(offset, params.limit);
  let sql = 'SELECT a.*, ' +
    '    (SELECT COUNT(1) FROM dog_click b WHERE a.id = b.dog_id) AS click_num, ' +
    '    (SELECT COUNT(1) FROM dog_comment d WHERE a.id = d.dog_id) AS comment_num, ' +
    '    (SELECT COUNT(1) FROM dog_favorites c WHERE a.id = c.dog_id AND c.operate_id = ?) AS is_collected,' +
    '    c.username ' +
    'FROM (' +
    'SELECT * FROM dog_info ' + (exist ? 'where lower(name) like ?' : '') +
    ') a ' +
    'LEFT JOIN dog_click b ON a.id = b.dog_id ' +
    'LEFT JOIN user c ON a.operate_id = c.id ' +
    'GROUP BY a.id, c.username ' +
    'order by update_time desc LIMIT ?,?'
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



