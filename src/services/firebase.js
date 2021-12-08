import {initializeApp} from 'firebase/app'
import {getAnalytics, logEvent as analyticsLogEvent} from 'firebase/analytics'

const options = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

export const app = initializeApp(options)
export const analytics = getAnalytics(app)

export const logEvent = (eventName, eventParams) =>
  analyticsLogEvent(analytics, eventName, eventParams)
