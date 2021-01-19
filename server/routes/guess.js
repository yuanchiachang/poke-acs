import express from 'express'
import getNumber from '../core/getNumber'
import axios from 'axios';
const router = express.Router()

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

router.get('/poke',(req, res)=> {
  const POKE_API_ROOT = "https://acs-web-final-project.herokuapp.com/api";

    const pokeInstance = axios.create({
    baseURL: POKE_API_ROOT
    })

    setTimeout(( () => {
        const {
            message
              } = pokeInstance.get('/poke');
        console.log('poking')
        
    } ), 1000 * 3)
    res.status(200).send({message: 'success poking'});
}) 


// nothing needed to do here, just getNumber to set a number.
router.post('/start', (_, res) => {
  getNumber(true)

  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()

  const guessed = roughScale(req.query.number, 10)

  if (guessed !== 0 && !guessed)
    res.status(500).send({ msg: 'No number provided.' })
  else if(guessed < number)
    res.status(200).send({msg: 'Guess Bigger!'})
  else if(guessed > number)
    res.status(200).send({msg: 'Guess Smaller!'})
  else if(guessed === number)
    res.status(200).send({msg: 'Bingo!'})
  else
    res.status(404).send({msg: 'Something goes wrong'})

  
  // TODO: checked if number and guessed are the same, response with some hint
})


// TODO: add router.post('/restart',...)

router.post('/restart', (_, res) => {
  getNumber(true)

  res.json({ msg: 'The game has restarted.' })
})

export default router
