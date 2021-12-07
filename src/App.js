import {useState} from 'react'
import {mask, unmask} from './utils/phone'

const App = () => {
  const [phone, setPhone] = useState('')

  const handleChange = event => {
    setPhone(mask(event.target.value))
  }

  const handleSubmit = event => {
    event.preventDefault()
    const url = `https://api.whatsapp.com/send?phone=${unmask(phone)}`
    window.open(url, '_blank')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="phone-input">Número: </label>
      <input
        type="tel"
        name="phone"
        id="phone-input"
        placeholder="(xx) xxxxx-xxxx"
        onChange={handleChange}
        value={phone}
      />
      <button type="submit">Ir</button>
    </form>
  )
}

export default App
