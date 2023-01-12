class Api {
  url = '';
  constructor(url) {
    this.url = url;
  }

  
/* Uppgift 2B MALIN
  Här är en create-funktion som använder HTTP metoden POST (C i CRUD).
  Funktionen skickar ett request till ett specifikt URL med en JSON-fil innehållande datan som passerat som argument.
  Funktionen returnerar ett Promise som löses med svaret från json-filen från servern.

  EMMA
  Om ett error förekommer så kommer Promiset att nekas.

  Request-objektet används för att skapa en förfrågan till servern.
 */

  /* Fetch funktionen gör exakt samma som vår getAll funktion fast tar emot ett annat argument */

  create(data) {
    const JSONData = JSON.stringify(data);
    console.log(`Sending ${JSONData} to ${this.url}`);
    const request = new Request(this.url, {
      method: 'POST',
      body: JSONData,
      headers: {
        'content-type': 'application/json'
      }
    });
    
    return (
      fetch(request)
      .then((result) => result.json())
        .then((data) => data)
        .catch((err) => console.log(err))
    );
  }

/*
Uppgift 2A
1.1.1 EMMA
getAll är en HTTP metod, specifikt en GET-metod (R i CRUD) som gör ett anrop (request) till den URL som är lagrad i this.url variabeln.
Fetch funktionen används för att initiera vår förfrågan och returnerar ett promise som svarar på ett response objekt när förfrågan är klar.
Ett Promise är ett sätt att hantera asynkron programmering, vi kan kalla det ett löfte om att returnera ett svar.

MALIN
Then metoden berättar sen vad som ska göras med resultatet av promise funktionen. Result.json formaterar vårt response som json
och returenrar ett promise som inväntar svaret på denna datan.

Vi har sen ännu en then-metod för att ta hand om vårt tidigare svar/promise. Den returnerar alltså helt enkelt datan.
Catch metoden används ifall det sker något error. Ifall ett error sker så printas det ut i konsollen.
Generellt så skickar denna kod ett HTTP GET request till en specifik URL, omvandlar till JSON och returnerar den omvandlade datan. Och om ett error sker så meddelar den det. 
BYT TILLBAKS TILL SCRIPT 1.1.2
*/

  getAll() {
    return fetch(this.url)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  } 
  

  remove(id) {
    console.log(`Removing task with id ${id}`);
    return fetch(`${this.url}/${id}`, {
      method: 'DELETE'
    })
      .then((result) => result)
      .catch((err) => console.log(err));
  }
}
