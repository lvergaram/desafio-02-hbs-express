import express from 'express'
import { engine } from 'express-handlebars';
import path from 'path'

const app = express()

const services = [
    {
      name: "Web Development",
      description: "We create web applications with the latest technologies.",
      url: "/services/web-development",
    },
    {
      name: "Mobile Development",
      description: "We create mobile applications with the latest technologies.",
      url: "/services/mobile-development",
    },
    {
      name: "DevOps",
      description: "We create CI/CD pipelines with the latest technologies.",
      url: "/services/devops",
    },
    {
      name: "QA",
      description: "We create test cases with the latest technologies.",
      url: "/services/qa",
    },
    {
      name: "UX/UI",
      description: "We create designs with the latest technologies.",
      url: "/services/ux-ui",
    },
    {
      name: "Training",
      description: "We create training with the latest technologies.",
      url: "/services/training",
    },
    {
      name: "Consulting",
      description: "We create consulting with the latest technologies.",
      url: "/services/consulting",
    },
    {
      name: "Outsourcing",
      description: "We create outsourcing with the latest technologies.",
      url: "/services/outsourcing",
    },
  ];

// ruta absoluta
const __dirname = import.meta.dirname

// middleware archivos estáticos
app.use(express.static('public'))
app.use('/assets/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/assets/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('home', { title: "Bienvenido a Mishu Servicios!", user: 'Luis' })
})

app.get('/nosotros', (req, res) => {
    res.render('nosotros')
})


app.get('/services', (req, res) => {
    res.render('services', { services })
})

app.get('/services/:param', (req, res) => {
    const paramValue = req.params.param;
    const service = services.find( serv => serv.url === `/services/${paramValue}`)
    if( service){
        res.render('services-id',{
            name: service.name,
            description: service.description
        })
    } else {
        res.status(404).render('404', {message: 'Este servicio no existe o ya no se encuentra'})
    }
  });



app.get('/*', (req,res) => {
    res.status(404).render('404', {message: 'Esta página no existe'})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})