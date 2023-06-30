import path from 'path';
import express,{ Request, Response} from "express"
import  cors from 'cors'

const numberRegex = /^\d+$/
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// const __dirname = path.resolve();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (_: Request, res: Response) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req: Request, res: Response){
  let date = req.params.date
  if(! date){
    const now = new Date()
    return res.json({
      unix:  now.getTime(),
      utc: now.toUTCString()
    })
  }
  let d = numberRegex.test(date)? new Date(parseInt(date)): new Date(date)
  if(isNaN(d.getTime())){
    return res.json({ error : "Invalid Date" })
  }
  res.json({
    unix: d.getTime(),
    utc: d.toUTCString()
  });
});

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
