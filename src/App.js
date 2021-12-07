import {useState} from 'react'
import {logEvent} from 'firebase/analytics'
import * as WhatsAppConstants from './constants/whatsapp'
import {analytics} from './services/firebase'
import * as PhoneUtils from './utils/phone'

const App = () => {
  const [phone, setPhone] = useState('')

  const handleChange = event => {
    setPhone(PhoneUtils.mask(event.target.value))
  }

  const handleSubmit = event => {
    event.preventDefault()
    const unmaskedPhone = PhoneUtils.unmask(phone)
    const url = `${WhatsAppConstants.URL}?phone=+55${PhoneUtils.unmask(unmaskedPhone)}`
    logEvent(analytics, 'generate_lead', {value: unmaskedPhone})
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
