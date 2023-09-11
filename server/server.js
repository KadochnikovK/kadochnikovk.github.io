const express = require('express')
const bodyParser = require('body-parser')

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Приветствие от сервера!')
})

const server = app.listen(3000, () => {
    console.log(`Сервер запущен на порту ${server.address().port}`)
})

app.post('/registr', (req, res) => {
    const { name, email, password } = req.body;

    if (name && email && password) {
        res.json({ message: 'Пользователь успешно зарегистрирован!' })
    }
    res.json({ message: 'Не удалось зарегистрировать пользователя, попробуйте еще раз' })

})

app.post('/login', (req, res) => {
    const { email, password } = req.body

    // проверяем данные в базе

    res.json({ message: 'Вы успешно авторизовались!' })
})

app.get('/articles', (req, res) => {
    const articles = db.articles.find()

    res.json(articles)
})