/* Import av nodejs inbyggda modul för att hantera http-förfrågningar. Vi använder i slutänden express till att utföra dessa saker, men de går att göra utan det externa paketet express.  */
const http = require('http');

/* Med http-modulens metod createServer kan man skapa en server som lyssnar efter anrop. Den tar emot en callbackfunktion (här en anonym arrow-funktion) som får parametrarna req (objekt som representerar HTTP-förfrågan) och res (objekt som representerar HTTP-svar) */
const server = http.createServer((req, res) => {
  /* HTTP-modulen innehåller en rad olika egenskaper, såsom t.ex. methods. Console.log nedan skulle skriva ut de HTTP-metoder som finns, såsom t.ex. GET, POST, PUT, PATCH och DELETE. */
  console.log(http.METHODS);

  /* Här skulle man sedan kunna köra olika delar av koden beroende på vilken metod som skickades in, t.ex. hämta data om det var en GET-förfrågan */

  /* Ett exempel på en statuskod. */
  const statusCode = 425;
  /* För att sätta exempelvis status och statuskoder används metoden writeHead på responseobjektet. */
  res.writeHead(statusCode);
  /* När man sedan är färdig med behandlingen av förfrågan kan man skicka ett svar - response - med hjälp av res.end. Här skrivs endast befintliga egenskaper hos requestobjektet ut - req.method, vilken HTTP-metod som användes i förfrågan och req.url, till vilken url förfrågan gjordes. */
  res.end(`Du gjorde ett ${req.method}-anrop till ${req.url}`);
});

/* Med server.listen anger man först den port som man vill att servern ska köras på (standard är 80 och den behöver man heller aldrig ange i en url, men vid utveckling kan man ibland vilja ha andra för att kunna kontrollera sina miljöer bättre). Andra argumentet är en callbackfunktion som körs när servern lyckats starta. Här, ett enkelt meddelande som berättar att servern körs. */
server.listen('5000', () =>
  console.log('Server running on http://localhost:5000')
);

/* Denna fil används inte vidare utan är en del av exemplen från lektion 5. All kod som används vidare i applikationen finns i app.js. Det är också där ni ska skriva kod för labb 2 */
