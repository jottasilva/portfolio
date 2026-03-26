import { createClient } from '@supabase/supabase-js';

// Since we are running outside Next.js, we should load keys
// Let's use the local .env to fetch the vars
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or ANON_KEY. Make sure they are in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  console.log("Testing insert into 'visits' table...");
  const { data, error } = await supabase.from('visits').insert([{
    visitor_id: 'test_id',
    ip: '127.0.0.1',
    city: 'TestCity',
    region: 'TestRegion',
    country: 'TestCountry',
    org: '',
    pathname: '/test-route',
    referer: '',
    user_agent: 'Node.js test',
    visited_at: new Date().toISOString()
  }]);

  if (error) {
    console.error("❌ Insert failed:", error);
  } else {
    console.log("✅ Insert succeeded!", data);
  }
}

testInsert();
