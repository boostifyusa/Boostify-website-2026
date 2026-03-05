import fetch from 'node-fetch';

async function testRoutes() {
  console.log('Testing Routing Edge Cases...');
  const site = 'https://boostifyusa.com';

  // 1. Trailing Slash
  try {
    const res1 = await fetch(`${site}/about/`, { redirect: 'manual' });
    console.log(`[Trailing Slash /about/] Status: ${res1.status}, Location: ${res1.headers.get('location')}`);
  } catch(e) { console.error('Error /about/', e); }

  // 2. Trailing Slash on missing route
  try {
    const res2 = await fetch(`${site}/does-not-exist/`, { redirect: 'manual' });
    console.log(`[Trailing Slash /does-not-exist/] Status: ${res2.status}, Location: ${res2.headers.get('location')}`);
  } catch(e) { console.error('Error /does-not-exist/', e); }

  // 3. 404 Soft loop test
  try {
    const res3 = await fetch(`${site}/does-not-exist-at-all`);
    console.log(`[Soft 404 /does-not-exist] Status: ${res3.status}`);
  } catch(e) { console.error('Error /does-not-exist', e); }
}

testRoutes();
