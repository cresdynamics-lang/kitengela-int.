const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding test programs (services) and sermons...')

  // Test programs (church services)
  const programs = [
    { title: 'Watch Hour', day: 'Sunday', startTime: '06:00', endTime: '08:00', venue: 'Main Sanctuary', contacts: [], description: 'Daily morning watch and prayer.', orderIndex: 0 },
    { title: 'Bible Study', day: 'Sunday', startTime: '08:00', endTime: '09:00', venue: 'Main Sanctuary', contacts: [], description: 'Sunday Bible study.', orderIndex: 1 },
    { title: 'SB1 Service', day: 'Sunday', startTime: '09:00', endTime: '10:30', venue: 'Main Sanctuary', contacts: [], description: 'Sunday first service.', orderIndex: 2 },
    { title: 'Word Manifest', day: 'Sunday', startTime: '10:30', endTime: '13:00', venue: 'Main Sanctuary', contacts: [], description: 'Word Manifest service.', orderIndex: 3 },
    { title: 'Discipleship', day: 'Sunday', startTime: '14:30', endTime: '16:00', venue: 'Main Sanctuary', contacts: [], description: 'Discipleship class.', orderIndex: 4 },
    { title: 'Tefillah Night', day: 'Friday', startTime: '20:00', endTime: '23:59', venue: 'Main Sanctuary', contacts: ['+254 722 566 399'], description: 'Friday night prayer with Rev. Evans Kochoo.', orderIndex: 5 },
    { title: 'Online Connect Fellowship', day: 'Thursday', startTime: '20:30', endTime: '21:30', venue: 'Google Meet', contacts: [], description: 'Online fellowship.', orderIndex: 6 },
  ]

  let createdPrograms = 0
  for (const p of programs) {
    const existing = await prisma.program.findFirst({ where: { title: p.title, day: p.day } })
    if (!existing) {
      await prisma.program.create({ data: p })
      createdPrograms++
    }
  }
  console.log(`Programs: ${createdPrograms} created, ${programs.length - createdPrograms} already existed.`)

  // Test sermons
  const sermons = [
    { title: 'Walking in Faith', description: 'A message on living by faith.', speaker: 'Rev. Evans Kochoo', date: new Date(), videoUrl: null, duration: 45 },
    { title: 'The Power of Prayer', description: 'Understanding the place of prayer.', speaker: 'Rev. Evans Kochoo', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), videoUrl: null, duration: 38 },
    { title: 'Building in Unity', description: 'The body of Christ working together.', speaker: 'Rev. Evans Kochoo', date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), videoUrl: null, duration: 42 },
  ]

  let createdSermons = 0
  for (const s of sermons) {
    const existing = await prisma.sermon.findFirst({ where: { title: s.title } })
    if (!existing) {
      await prisma.sermon.create({
        data: {
          title: s.title,
          description: s.description ?? null,
          speaker: s.speaker ?? null,
          date: s.date,
          videoUrl: s.videoUrl ?? null,
          audioUrl: null,
          thumbnailUrl: null,
          duration: s.duration ?? null,
        },
      })
      createdSermons++
    }
  }
  console.log(`Sermons: ${createdSermons} created, ${sermons.length - createdSermons} already existed.`)

  console.log('Seed complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
