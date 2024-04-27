import pool from "@/model/db";
import { RowDataPacket } from "mysql2";

export interface UserModel {
  id?: number
  username: string;
  email: string;
  password: string;
  org_id: number;
  role: string;
  insert_time: Date;
}

export const insertData = (data: UserModel) => {
  return new Promise((resolve, reject) => {
    pool.query('insert into user set ? ', data, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

export const updateInfo = (data: {username:string, role:string, org_id:number},id:number) => {
  return new Promise((resolve, reject) => {
    pool.query('update user set ? where id = ?', [data,id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

export const getInfoByEmail: (email: string) => Promise<number> = (email: string) => {
  return new Promise((resolve, reject) => {
    pool.query('select count(id) count from user where email = ?', [email], (err, results: RowDataPacket[]) => {
      if (err) {
        reject(err)
      } else {
        const count = Number(results[0].count);
        resolve(count);
      }
    })
  })
}

export const getInfoByEmailAndPassword = ({
                                            email,
                                            password
                                          }: { email: string, password: string }): Promise<UserModel[]> => {
  return new Promise((resolve, reject) => {
    pool.query('select *  from user where email = ? and password = ?', [email, password], (err, results: RowDataPacket[]) => {
      if (err) {
        reject(err)
      } else {
        const users: UserModel[] = results.map(row => {
          return {
            id: row.id,
            username: row.username,
            email: row.email,
            password: row.password,
            org_id: row.org_id,
            role: row.role,
            insert_time: row.insert_time
          };
        });
        resolve(users);
      }
    })
  })
}

export const getOrgName = () => {
  return new Promise((resolve, reject) => {
    pool.query('select id, name from organization', [], (err, results: RowDataPacket[]) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

export interface OrgInfo {
  id: number
  name: string;
  code: string;
}

export const getOrgCountById = (
  id: number): Promise<OrgInfo[]> => {
  return new Promise((resolve, reject) => {
    pool.query('select * from organization where id = ?', [id], (err, results: RowDataPacket[]) => {
      if (err) {
        reject(err)
      } else {
        const users: OrgInfo[] = results.map(row => {
          return {
            id: row.id,
            name: row.name,
            code: row.code,
          };
        });
        resolve(users);
      }
    })
  })
}
