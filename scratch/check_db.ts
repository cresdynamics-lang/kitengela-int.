import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL,
    },
  },
})

async function main() {
  console.log('--- SERMONS ---')
  const sermons = await prisma.sermon.findMany()
  console.log(JSON.stringify(sermons, null, 2))

  console.log('\n--- PROGRAMS ---')
  const programs = await prisma.program.findMany()
  console.log(JSON.stringify(programs, null, 2))

  console.log('\n--- PHOTOS ---')
  const photos = await prisma.photo.findMany()
  console.log(JSON.stringify(photos, null, 2))
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
