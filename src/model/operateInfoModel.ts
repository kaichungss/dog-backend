import pool from "@/model/db";

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
    pool.query('select b.username,a.comment,a.insert_time' +
      ' from(' +
      ' select * from dog_comment where dog_id =? ' +
      ' ) a' +
      ' LEFT JOIN user b' +
      ' on a.operate_id = b.id'+
      ' order by a.insert_time desc ', id, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
