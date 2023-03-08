import express from "express";
import url from 'url';
import http from "http";
import path from "path";
import { Server } from "socket.io";

const __filename = url.fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const serverHttp = http.createServer(app);
const io = new Server(serverHttp);

// Views 
app.use(express.static(path.join(__dirname, "../public")));
app.set('views', path.join(__dirname, '../public'));
app.set('view engine', 'ejs');

// routes 
app.get('/', (req, res) => {
    res.render('index.ejs');
});
app.get('/Login', (req, res) => {
    res.render('login.ejs');
});
app.get('/Register', (req, res) => {
    res.render('register.ejs');
});
app.get('/About', (req, res) => {
    res.render('about.ejs');
});
app.get(/.*/, (req, res) => {
    res.render('404.ejs');
});

// Export server 
export { serverHttp, io }