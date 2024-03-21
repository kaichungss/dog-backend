import pool from "@/model/db";

export interface ClickInfo {
  id?: number
  dog_id: number;
  operate_id: number;
  insert_time: Date;
}

export const insertData = (data: ClickInfo) => {
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
