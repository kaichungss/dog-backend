import pool from "@/model/db";
import { RowDataPacket } from "mysql2";
import { RequestParams } from "@/model/dogInfoModel";

export interface ClickInfo {
  id?: number
  dog_id: number;
  operate_id: number;
  insert_time: Date;
}

export interface CommentInfo {
  id?: number
  dog_id: number;
  comment: string;
  operate_id: number;
  insert_time: Date;
}

export interface FavoriteInfo {
  id?: number
  dog_id: number;
  operate_id: number;
  insert_time: Date;
}

export interface Message {
  id?: number;
  text?: string;
  sender_id?: number;
  receive_id?: number;
  insert_time: Date;
}

export const insertClickData = (data: ClickInfo) => {
  return new Promise((resolve, reject) => {
    pool.query('insert into dog_click set ? ', data, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

export const insertCommentData = (data: CommentInfo) => {
  return new Promise((resolve, reject) => {
    pool.query('insert into dog_comment set ? ', data, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

export const commentData = (id: string) => {
  return new Promise((resolve, reject) => {
    pool.query('select b.username,a.id,a.comment,a.insert_time' +
      ' from(' +
      ' select * from dog_comment where dog_id =? ' +
      ' ) a' +
      ' LEFT JOIN user b' +
      ' on a.operate_id = b.id' +
      ' order by a.insert_time desc ', id, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};


export const deleteCommentDataByDogId = (id: number) => {
  return new Promise((resolve, reject) => {
    pool.query('delete from dog_comment where dog_id = ?', id, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

export const deleteClickData = (id: number) => {
  return new Promise((resolve, reject) => {
    pool.query('delete from dog_click where dog_id = ?', id, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

export const deleteCommentDataById = (id: number) => {
  return new Promise((resolve, reject) => {
    pool.query('delete from dog_comment where id = ?', id, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};


export const insertFavoritesData = (data: FavoriteInfo) => {
  return new Promise((resolve, reject) => {
    pool.query('insert into dog_favorites set ? ', data, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

export const deleteFavoritesData = (dog_id: number, op_id: number) => {
  return new Promise((resolve, reject) => {
    pool.query('delete from dog_favorites where dog_id = ? and operate_id = ?', [dog_id, op_id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

export const getFavoritesCount = (params: RequestParams) => {
  const list: any[] = [];
  list.push(params.id);
  const existName = params.name != null && params.name.length > 0;
  const existBreed = params.breed != null && params.breed.length > 0;
  const existSize = params.size != null && params.size.length > 0;
  let sql = 'select count(1) count from' +
    ' (select * from dog_favorites) f' +
    ' JOIN dog_info a ON f.dog_id = a.id and f.operate_id = ? ';
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

export const getAllFavoritesData = (params: RequestParams) => {
  const exist = params.name != null && params.name.length > 0;
  const offset = (params.page - 1) * params.limit;
  const list: any[] = [];
  list.push(params.id);
  if (exist) {
    list.push("%".concat(params.name || '').concat("%"))
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
  let sql = ' SELECT a.*, ' +
    '    (SELECT COUNT(1) FROM dog_click b WHERE a.id = b.dog_id) AS click_num, ' +
    '    (SELECT COUNT(1) FROM dog_comment d WHERE a.id = d.dog_id) AS comment_num,' +
    '    MAX(UNIX_TIMESTAMP(f.insert_time)) AS insert_timestamp,' +
    '    1 AS is_collected,' +
    '    c.username ' +
    ' FROM dog_favorites f' +
    ' JOIN dog_info a ON f.dog_id = a.id' +
    ' LEFT JOIN dog_click b ON a.id = b.dog_id ' +
    ' LEFT JOIN user c ON a.operate_id = c.id ' +
    ' WHERE f.operate_id = ? '
  if (params.breed?.length || params.size?.length) {
    if (params.breed?.length) {
      sql += ' AND breed IN (?)';
    }
    if (params.size?.length) {
      sql += ' AND size IN (?)';
    }
  }
  sql += (exist ? 'and lower(name) like ?' : '') +
    ' GROUP BY a.id, c.username ' +
    ' ORDER BY insert_timestamp DESC' +
    ' LIMIT ?,?'
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

export const chatInfo = (id: number, receivedId: number) => {
  let sql = 'select * , (SELECT username FROM user b WHERE a.sender_id = b.id) AS sender_name ,(SELECT username FROM user b WHERE a.receive_id = b.id) AS receive_name from chat_info a' +
    ' where (a.sender_id = ? and a.receive_id = ?) or (a.sender_id = ? and a.receive_id = ?) order by a.insert_time'
  return new Promise((resolve, reject) => {
    pool.query(sql, [id, receivedId, receivedId, id], (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}


export const insertChat = (data: Message) => {
  return new Promise((resolve, reject) => {
    pool.query('insert into chat_info set ? ', data, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};


export const users = (id: number, name: string) => {
  const exist = name != null && name.length > 0;
  const list: any[] = [];
  list.push(id);
  let sql = 'select id , username from user where id !=?'
  sql += (exist ? ' and lower(username) like ?' : '')
  if (exist) {
    list.push("%".concat(name || '').concat("%"))
  }
  sql+=' order by username'
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

