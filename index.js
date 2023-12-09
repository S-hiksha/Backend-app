
const express =require('express');
const cors=require('cors');
const { PrismaClient } =require('@prisma/client');
const prisma = new PrismaClient()

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
  res.status(200).send('server is runnning');
}
)

app.get('/showbooks', async (req, res) => {
  const allBooks = await prisma.book.findMany();
  res.json(allBooks);
});

app.post(`/addbooks`, async (req, res) => {
  const { title,author } = req.body;
  const result = await prisma.book.create({
    data: {
      title: title,
      author: author,
    },
  });
  res.json(result);
});

app.delete(`/deletebook/:id`, async (req, res) => {
  const { id } = req.params;
  const book = await prisma.book.delete(
    {
      where: {
        id: String(id), 
      },
    }
  );
  res.json(book);
});

app.put('/updatebook/:id', async (req, res) => {
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


