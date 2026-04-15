import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL || ''
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const supabase = createClient(supabaseUrl, serviceRoleKey)

async function main() {
  console.log('--- SERMONS ---')
  const { data: sermons } = await supabase.from('sermons').select('*')
  console.log(JSON.stringify(sermons, null, 2))

  console.log('\n--- PROGRAMS ---')
  const { data: programs } = await supabase.from('programs').select('*')
  console.log(JSON.stringify(programs, null, 2))

  console.log('\n--- PHOTOS ---')
  const { data: photos } = await supabase.from('photos').select('*')
  console.log(JSON.stringify(photos, null, 2))
}

main()
