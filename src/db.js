import Dexie from 'dexie';

const db = new Dexie('FinanceAppDatabase');
db.version(1).stores({
  incomeEntries: '++id,category,amount',
  expenseEntries: '++id,category,amount',
});

export const addIncomeEntry = (entry) => {
  return db.incomeEntries.add(entry);
};

export const addExpenseEntry = (entry) => {
  return db.expenseEntries.add(entry);
};

export const getIncomeEntries = () => {
  return db.incomeEntries.toArray();
};

export const getExpenseEntries = () => {
  return db.expenseEntries.toArray();
};

export const deleteIncomeEntry = (id) => {
    return db.incomeEntries.where('id').equals(Number(id)).delete();
  };
  
  export const deleteExpenseEntry = (id) => {
    return db.expenseEntries.where('id').equals(Number(id)).delete();
  };

export const openDB = async () => {
  await db.open();
  return db;
};

export default db;
