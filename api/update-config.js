/**
 * Updates Vercel Edge Config with the provided data.
 *
 * Expected request body:
 * {
 *   incomeEntries: Array<IncomeEntry>,
 *   expenseEntries: Array<ExpenseEntry>
 * }
 */

module.exports = async function handler(req, res) {
  if (req.method !== 'PATCH') {
    res.setHeader('Allow', ['PATCH']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { VERCEL_EDGE_CONFIG_ID, VERCEL_EDGE_CONFIG_TOKEN } = process.env;
  if (!VERCEL_EDGE_CONFIG_ID || !VERCEL_EDGE_CONFIG_TOKEN) {
    return res.status(500).json({ error: 'Missing Edge Config credentials' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    const response = await fetch(`https://api.vercel.com/v1/edge-config/${VERCEL_EDGE_CONFIG_ID}/items`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${VERCEL_EDGE_CONFIG_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          { operation: 'upsert', key: 'data', value: body },
        ],
      }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
