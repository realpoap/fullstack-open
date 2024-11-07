import express from 'express';
import cors from 'cors';

import diagnosesRouter from './routes/diagnoses';

const app = express();


app.use(cors());
app.use(express.json());


const PORT = 3001;

app.get('/api/ping', (_req,res) => {
	console.log('someone pinged');
	res.send('pong');
	
});

app.get('/api/patients', (_req, res) => {
	res.send({});
});

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, ()=> {
	console.log(`.: Server running on port ${PORT} :.`);
});
