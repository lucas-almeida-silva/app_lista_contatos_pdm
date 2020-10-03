import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("contacts.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS tb_contact (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          number TEXT NOT NULL,
          imageURI TEXT NULL)`,
        [],
        () => {resolve()},
        (_, err) => {reject(err)},
      );
    });
  });
  return promise;
} 

export const getAllContacts = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tb_contact',
        [],
        (_, result) => {resolve(result)},
        (_, err) => {reject(err)}
      );
    });
  });
  return promise;
}

export const insertContact = (name, number, imageURI) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO tb_contact (name, number, imageURI) VALUES(?,?,?)',
        [name, number, imageURI],
        (_, result) => {resolve(result)},
        (_, err) => {reject(err)}
      )
    });
  });
  return promise;
}

export const deleteContact = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM tb_contact WHERE id = ?',
        [id],
        (_, result) => {resolve(result)},
        (_, err) => {reject(err)}
      );
    });
  });
  return promise;
}