import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/showbooks', async (req: Request, res: Response) => {
  const allBooks = await prisma.book.findMany();
  res.json(allBooks);
});

app.post(`/addbooks`, async (req: Request, res: Response) => {
  const { title,author } = req.body;
  const result = await prisma.book.create({
    data: {
      title: title,
      author: author,
    },
  });
  res.json(result);
});

app.delete(`/showbooks/:id`, async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await prisma.book.delete({
    where: {
      id: String(id),
    },
  });
  res.json(book);
});

app.put('/showbooks/:id', async (req: Request, res: Response) => {
  const { title, author } = req.body;
  const { id } = req.params;

  try {
    const updatedBook = await prisma.book.update({
      where: { id: String(id) },
      data: {
        title: title,
        author: author,
      },
    });

    res.json(updatedBook);
  } catch (error) {
    res.json({ error: `Book with ID ${id} does not exist` });
  }
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});



