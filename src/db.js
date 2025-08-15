
export const addIncomeEntry = async (entry) => {
  const res = await fetch('/api/income', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  });
  return res.json();
};

export const addExpenseEntry = async (entry) => {
  const res = await fetch('/api/expense', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  });
  return res.json();
};

export const getIncomeEntries = async () => {
  const res = await fetch('/api/income');
  return res.json();
};

export const getExpenseEntries = async () => {
  const res = await fetch('/api/expense');
  return res.json();
};

export const deleteIncomeEntry = async (id) => {
  await fetch(`/api/income?id=${id}`, {
    method: 'DELETE',
  });
};

export const deleteExpenseEntry = async (id) => {
  await fetch(`/api/expense?id=${id}`, {
    method: 'DELETE',
  });
};

