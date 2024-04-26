import pool from "@/model/db";
import { RowDataPacket } from "mysql2";

export interface RequestParams {
  page: number;
  limit: number;
  name?: string;
  id?: number;
  size?: string[];
  breed?: string[];
}

export interface DogInfo {
  id?: number
  name?: string;
  gender?: string;
  color?: string;
  size?: string;
  sterilized?: string;
  vaccinated?: string;
  breed?: string;
  describe?: string;
  image_list?: string;
  insert_time?: Date;
  update_time?: Date;
  operate_id?: number;
}

export const getCount = (params: RequestParams) => {
  const list: any[] = [];
  const existName = params.name != null && params.name.length > 0;
  const existBreed = params.breed != null && params.breed.length > 0;
  const existSize = params.size != null && params.size.length > 0;
  let sql = 'SELECT COUNT(id) AS count FROM dog_info';
  if (existName || existBreed || existSize) {
    sql += ' WHERE';
    if (existName) {
      sql += " LOWER(name) LIKE ? ";
      list.push("%".concat(params.name || '').concat("%"));
    }
    if (existBreed) {
      if (existName) sql += ' AND';
      sql += " breed IN (?)";
      list.push(params.breed);
    }
    if (existSize) {
      if (existName || existBreed) sql += ' AND';
      sql += " size IN (?)";
      list.push(params.size);
    }
  }
  if (params.id) {
    sql += (existName || existBreed || existSize ? ' AND' : ' WHERE') + ' operate_id = ? ';
    list.push(params.id);
  }
  return new Promise<number>((resolve, reject) => {
    pool.query(sql, list, (err, rows: RowDataPacket[]) => {
      if (err) {
        reject(err);
      } else {
        const count = rows[0].count;
        resolve(count);
      }
    });
  });
};

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
  const existName = params.name != null && params.name.length > 0;
  const offset = (params.page - 1) * params.limit;
  const list: any[] = [];
  list.push(params.id);
  if (existName) {
    list.push("%".concat(params.name || '').concat("%"));
  }
  if (params.breed?.length) {
    params.breed.forEach((breed) => {
      list.push(breed);
    });
  }
  if (params.size?.length) {
    params.size.forEach((size) => {
      list.push(size);
    });
  }
  list.push(offset, params.limit);
  let sql = 'SELECT a.*, ' +
    '    (SELECT COUNT(1) FROM dog_click b WHERE a.id = b.dog_id) AS click_num, ' +
    '    (SELECT COUNT(1) FROM dog_comment d WHERE a.id = d.dog_id) AS comment_num, ' +
    '    (SELECT COUNT(1) FROM dog_favorites c WHERE a.id = c.dog_id AND c.operate_id = ?) AS is_collected,' +
    '    c.username ' +
    'FROM (' +
    'SELECT * FROM dog_info ' + (existName ? 'WHERE lower(name) LIKE ? ' : ' WHERE 1=1')
  if (params.breed?.length || params.size?.length) {
    if (params.breed?.length) {
      sql += ' AND breed IN (?)';
    }
    if (params.size?.length) {
      sql += ' AND size IN (?)';
    }
  }
  sql += ') a ' +
    'LEFT JOIN dog_click b ON a.id = b.dog_id ' +
    'LEFT JOIN user c ON a.operate_id = c.id ';

  sql += ' GROUP BY a.id, c.username ' +
    'ORDER BY update_time DESC LIMIT ?,?';
  return new Promise((resolve, reject) => {
    pool.query(sql, list, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};



export const getDetailData = (id: number) => {
  let sql = 'SELECT *,(SELECT username FROM user b WHERE a.operate_id = b.id) AS username from dog_info a where id =? '
  return new Promise((resolve, reject) => {
    pool.query(sql, [id], (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}



