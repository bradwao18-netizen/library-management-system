import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const fiction = await prisma.genre.upsert({
    where: { name: 'Fiction' },
    update: {},
    create: { name: 'Fiction', description: 'Imaginative narrative literature' },
  });

  const sciFi = await prisma.genre.upsert({
    where: { name: 'Science Fiction' },
    update: {},
    create: { name: 'Science Fiction', description: 'Futuristic science and technology' },
  });

  const history = await prisma.genre.upsert({
    where: { name: 'History' },
    update: {},
    create: { name: 'History', description: 'Past events and civilizations' },
  });

  const tech = await prisma.genre.upsert({
    where: { name: 'Technology' },
    update: {},
    create: { name: 'Technology', description: 'Software engineering and computing' },
  });

  const books = [
    { title: 'Things Fall Apart', author: 'Chinua Achebe', isbn: '978-0385474542', publishedYear: 1958, genreId: fiction.id },
    { title: 'Petals of Blood', author: 'Ngũgĩ wa Thiong\'o', isbn: '978-0143039174', publishedYear: 1977, genreId: fiction.id },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0061120084', publishedYear: 1960, genreId: fiction.id },
    { title: '1984', author: 'George Orwell', isbn: '978-0451524935', publishedYear: 1949, genreId: fiction.id },
    { title: 'Dune', author: 'Frank Herbert', isbn: '978-0441172719', publishedYear: 1965, genreId: sciFi.id },
    { title: 'Foundation', author: 'Isaac Asimov', isbn: '978-0553293357', publishedYear: 1951, genreId: sciFi.id },
    { title: 'Neuromancer', author: 'William Gibson', isbn: '978-0441569595', publishedYear: 1984, genreId: sciFi.id },
    { title: 'The Three-Body Problem', author: 'Cixin Liu', isbn: '978-0765382030', publishedYear: 2008, genreId: sciFi.id },
    { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '978-0062316097', publishedYear: 2011, genreId: history.id },
    { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', isbn: '978-0393317558', publishedYear: 1997, genreId: history.id },
    { title: 'The Silk Roads', author: 'Peter Frankopan', isbn: '978-1101912379', publishedYear: 2015, genreId: history.id },
    { title: 'Facing Mount Kenya', author: 'Jomo Kenyatta', isbn: '978-0394702100', publishedYear: 1938, genreId: history.id },
    { title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', publishedYear: 2008, genreId: tech.id },
    { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', isbn: '978-1449373320', publishedYear: 2017, genreId: tech.id },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', isbn: '978-0135957059', publishedYear: 2019, genreId: tech.id },
    { title: 'Refactoring', author: 'Martin Fowler', isbn: '978-0134757599', publishedYear: 2018, genreId: tech.id },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: book,
    });
  }

  console.log('Seed completed: 4 genres and 16 books inserted. - seed.ts:57');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });