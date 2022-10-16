import express from 'express'
import bodyParser from 'body-parser'
import { getWeatherData } from './weather-api.js'

const app = express()
const port = 80

app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// app.get('/info/:dynamic', (req, res) => {
//     const { dynamic } = req.params
//     const { key } = req.query
//     console.log(dynamic, key)
//     res.status(200).json({ info: 'preset text 😂' })
// })

// app.post('/', (req, res) => {
//     const request_variables = req.body
//     console.log(req.body)
//     if (!request_variables) {
//         return res.status(400).send({ status: "failed" })
//     }
//     res.status(200).send({ status: "received" })
// })

app.post('/', (req, res) => {
    const request_variables = req.body
    console.log(request_variables)
    if (!request_variables) {
        return res.status(400).send({ status: "failed" })
    }
    var weather_api_response = []
    weather_api_response = getWeatherData(request_variables.location, request_variables.unitGroup, request_variables.includeHours)
        .then((result) => {
            res.status(200).send(result)
            return result
        })
        //console.log(weather_api_response)
        //res.status(200).send({ status: "received" })
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))