const { EdgeConfigClient } = require('@vercel/edge-config');

const client = new EdgeConfigClient({
  id: process.env.VERCEL_EDGE_CONFIG_ID || 'ecfg_m9sacw7dylhygpujgmev96m0e8ao',
  token: process.env.VERCEL_EDGE_CONFIG_TOKEN,
});

const KEY = 'incomeEntries';

module.exports = async function handler(req, res) {
  const method = req.method;
  if (method === 'GET') {
    try {
      const data = (await client.get(KEY)) || [];
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (method === 'POST') {
    try {
      const entry = req.body;
      const data = (await client.get(KEY)) || [];
      data.push(entry);
      await client.set(KEY, data);
      res.status(201).json(entry);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (method === 'DELETE') {
    try {
      const { id } = req.query;
      const data = (await client.get(KEY)) || [];
      const filtered = data.filter((e) => String(e.id) !== String(id));
      await client.set(KEY, filtered);
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (method === 'PUT') {
    try {
      const entry = req.body;
      const data = (await client.get(KEY)) || [];
      const index = data.findIndex((e) => String(e.id) === String(entry.id));
      if (index !== -1) {
        data[index] = entry;
        await client.set(KEY, data);
      }
      res.status(200).json(entry);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
    res.status(405).end('Method Not Allowed');
  }
};
