const express = require('express');
const app = express();
const fs = require('fs/promises');
const PORT = 5000;


app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });



app.get('/tasks', async (req, res) => {
  try {
    const tasks = await fs.readFile('./tasks.json');
    res.send(JSON.parse(tasks));
  } catch (error) {
    res.status(500).send({ error });
  }
});



/* Uppgift 2 C, hela app.post*/

/* MALIN
Lyssnar och tar emot data till backend. Svaret från backend är res. Svaret kommer från tasks.json
När ett request är gjort, kommer servern utföra funktionen.
Funktionen läser först request-bodyn och sparar den i variablen 'task'.
Sedan läser den innehållen av filen 'tasks.json' och sparar den i variabeln listBuffer.
För att kunna behandla listan av tasks i filen som JavaScript-objekt, behövs JSON.parse. 

EMMA
Vi parsar(formaterar) alltså innehållet av listBuffer och sparar objektet i variabeln 'currentTasks'.
Sedan tilldelas objektet ett id.
Sedan lägger den till det nya objektet till arrayen och skriver den resulterande arrayen till tasks.json.
Till sist skickar den det nya objektet tillbaka i responsen.
Om ett error förekommer någon gång under processsen, kommer servern skicka ett respons med statuskoden 500 (Internal Server Error) och errormeddelandet.
*/


app.post('/tasks', async (req, res) => {
  try {
    const task = req.body;
    const listBuffer = await fs.readFile('./tasks.json');
    const currentTasks = JSON.parse(listBuffer);
        
    let maxTaskId = 1;
    if (currentTasks && currentTasks.length > 0) {
      maxTaskId = currentTasks.reduce(
        (maxId, currentElement) =>
          currentElement.id > maxId ? currentElement.id : maxId,
        maxTaskId
      );
    }

    const newTask = { id: maxTaskId + 1, ...task };
    const newList = currentTasks ? [...currentTasks, newTask] : [newTask];
    await fs.writeFile('./tasks.json', JSON.stringify(newList));

    res.send(newTask);
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});


app.delete('/tasks/:id', async (req, res) => {
  console.log(req);
  try {
    const id = req.params.id;
    const listBuffer = await fs.readFile('./tasks.json');
    const currentTasks = JSON.parse(listBuffer);
    if (currentTasks.length > 0) {
      
      await fs.writeFile(
        './tasks.json',
        JSON.stringify(currentTasks.filter((task) => task.id != id))
      );
      res.send({ message: `Uppgift med id ${id} togs bort` });
    } else {
      res.status(404).send({ error: 'Ingen uppgift att ta bort' });
    }
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

app.listen(PORT, () => console.log('Server running on http://localhost:5000'));
