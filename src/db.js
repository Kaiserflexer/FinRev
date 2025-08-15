import Dexie from 'dexie';

/**
 * Data stored in Edge Config under the `data` key follows this shape:
 * {
 *   incomeEntries: Array<IncomeEntry>,
 *   expenseEntries: Array<ExpenseEntry>
 * }
 */

const db = new Dexie('FinanceAppDatabase');
db.version(1).stores({
  incomeEntries: '++id,category,amount',
  expenseEntries: '++id,category,amount',
});

const syncEdgeConfig = async () => {
  const [incomeEntries, expenseEntries] = await Promise.all([
    db.incomeEntries.toArray(),
    db.expenseEntries.toArray(),
  ]);

  await fetch('/api/update-config', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ incomeEntries, expenseEntries }),
  });
};

export const addIncomeEntry = async (entry) => {
  const id = await db.incomeEntries.add(entry);
  await syncEdgeConfig();
  return id;
};

export const addExpenseEntry = async (entry) => {
  const id = await db.expenseEntries.add(entry);
  await syncEdgeConfig();
  return id;
};

export const getIncomeEntries = () => {
  return db.incomeEntries.toArray();
};

export const getExpenseEntries = () => {
  return db.expenseEntries.toArray();
};

export const deleteIncomeEntry = async (id) => {
  await db.incomeEntries.where('id').equals(Number(id)).delete();
  await syncEdgeConfig();
};

export const deleteExpenseEntry = async (id) => {
  await db.expenseEntries.where('id').equals(Number(id)).delete();
  await syncEdgeConfig();
};

export const openDB = async () => {
  await db.open();
  return db;
};

export default db;
