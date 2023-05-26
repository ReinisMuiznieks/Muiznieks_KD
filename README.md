# Latviešu valodas apguves sistēma - Verbum
### Kvalifikācijas darba uzdevums ir izveidot pašmācības latviešu valodas apmācību cittautiešiem un diasporas latviešiem A1 līmenī. Ar tās palīdzību cittautieši un diasporas latvieši varēs apgūt latviešu valodas apmācību pašmācības ceļā. Šī sistēma palīdzēs caur latviešu valodas apguvi cittautiešu integrācijai Latvijā un diasporas latviešiem stiprināt saiti ar dzimteni. Lietotājiem būs iespēja apgūt dotās vārdu kartiņas un tad veikt testus lai pārbaudītu savas apgūtās zināšanas. Kā arī redzēt apguves progresu un testa nepareizās atbildes.


## Izmantotās tehnoloģijas
Lai sistēmu realizētu kā modernu, efektīvu, kā arī ilgspējīgu, tās realizēšanā tika izmantot jaunākie tehniskie līdzekļi. Sistēmas pamatā ir MERN tehnoloģijas – MongoDB, Express, React, Node. Programmēšanas valodas tika izmantotas šo tehnoloģiju pamatā, kā arī attiecīgas palīgprogrammas, kas nodrošina efektīvu atkļūdošanu. 
- React ir atvērtā koda JavaScript bibliotēka, kas palīdz lietotāja saskarnes izveidē, kuru pamatā ir UI komponenti. Sistēmā tiek izmantota 18.2.0 versija.
- Express.js, jeb Express ir aizmugures tīmekļa lietojumprogrammu ietvars RESTful API izveidei ar Node.js. Sistēmā tiek izmantota 4.18.2 versija.
- MongoDB ir atvērtā koda starpplatformu dokumentiem orientēta datu bāzes programma. Tā izmanto JSON dokumentus ar izvēles shēmām. Sistēmā tiek izmantota 6.0 versija.
- Node ir atvērtā koda servera vide, tā ļauj rakstīt JavaScript kodu, kas darbojas tieši pašā datora procesā, nevis pārlūkprogrammā. Sistēmā tiek izmantota 16.14.1. versija.
- Postman ir API platforma izstrādātājiem, lai izstrādātu, izveidotu, pārbaudītu un atkārtotu savas API. Sistēmā tiek izmantota 9.4. versija.
- Redux DevTools lietojumprogramma palīdz Redux stāvokļa izmaiņu atkļūdošanai. Šis paplašinājums nodrošina Redux izstrādes darbplūsmas jaudu. Paplašinājumam tiek izmantota 3.0.15 versija.

### Aizgūtie modeļi
Izveidē tika arī pielietoti un aizgūti dažādi moduļi, kas vienozīmīgi paātrina izstrādes procesu, drošību un ātrumu. Sistēmai pilnveidojoties, aizgūto moduļu skaits visticamāk vēl pieaugs, taču šie pagaidām ir vieni no nozīmīgākajiem aizgūtajiem moduļiem:

- Axios
- React-Bootstrap
- Filestack-react
- Npm
- ReactDOM
- React Router DOM
- React-select
- React-circular-progressbar
- Mui/material
- Tss-react
- Styled-components
- React-toastify
- React-Redux
- Nodemon
- Bcryptjs
- CORS
- Dotenv
- Jsonwebtoken
- Mongoose
- Sass

## Uzstādīšanas instrukcija
Sistēmu ir iespējas palaist kā parasts sistēmas lietotājs, tam nepieciešams būtu tikai ievadīt sistēmas saiti pārlūkprogrammā, otrs veids ir instālēt un palaist sistēmu no cita datora, rediģēt tās saturu un kodu.
Lai sistēmu instalētu un palaistu no cita datora vai kā sistēmas administrators. Ir nepieciešams iegūt sistēmas kodu, instalēt nepieciešamos rīkus un iegūt nepieciešamās sistēmas atslēgas savienojumā ar datu bāzi un citiem rīkiem. Sistēmas kodu var iegūt un apskatīt GitHub repozitorijā. Kad kods tiek iegūts ar Git palīdzību, to var klonēt un atvērt projektu Visual Studio Code.

![6.1.att.](https://cdn.filestackcontent.com/KClmSZqwR1ewZrQ0xOb9)
 
Sistēmas palaišanai ir nepieciešams lejuplādē bibliotēkas. Tā kā projekts sastāv no frontend un backend daļas, katrai no šīm daļām ir savas bibliotēkas. Lai lejuplādētu attiecīgās bibliotēkas, ar termināles palīdzību ir jāpārvietojas uz backend un pēc tam uz frontend mapi un ar funkcijas npm palīdzību instalēt nepieciešamās bibliotēkas.

![6.2.att.](https://cdn.filestackcontent.com/WUtQ9XnxSd2acwmPB3WM)

Pēc bibliotēku instalēšanas, palaiž frontend daļu. Tā kā sistēma sastāv no divām daļām – frontend un backend, katra sistēma ir jāpalaiž atsevišķi. Sistēmām ir norādīti porti uz kādiem tā tiks palaista. Programmu palaiž, servera apakšmapē ierakstot “npm start”, tādas pašas darbības veicot ar ar klienta daļu (skatīt 6.3.att). Lai programma strādātu, ir vēl nepieciešami vides mainīgie jeb environmental variables. Šie mainīgie tiek saglabāt failā ar .env paplašinājumu un tie glabā dažādas API atslēgas un citas konfigurācijas vērtības. Lai strādātu servera daļa, ir nepieciešams norādīt JWT (jeb Jsonwebtoken slepenā atslēga), Mongo (jeb savienojuma atslēga ar datu bāzi), un Node vide, kas sniedz informāciju par vidi, kurā programma darbosies. Lai strādātu frontend daļā ir nepieciešams norādīt Filestack API atslēgu, lai būtu iespēja augšupielādēt attēlus, kā arī Node vide, kas sniedz informāciju par vidi, kurā programma darbosies. Tā kā šīs atslēgas ir slepenas un rada apdraudējumu programmas drošībai, tās netiek iekļautas kodā un repozitorijā.
Kad bibliotēkas ir ielādētas un vides mainīgie tiek norādīti, var veiksmīgi palaist programmu.

![6.3.att.](https://cdn.filestackcontent.com/J9X72hK2S2WeXrQz5vw5)
