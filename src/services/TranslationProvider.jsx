import React, { useState } from 'react'
import { IntlProvider } from 'react-intl'
import * as R from 'ramda'
import English from '../data/Languages/en.json'
import Indonesia from '../data/Languages/id.json'
import China from '../data/Languages/ch.json'
import Japan from '../data/Languages/jp.json'

export const TranslationContext = React.createContext()

const local = navigator.language;

let lang;

// R.cond([
//   [R.equals('id'), R.always(lang = Indonesia)],
//   [R.equals('ch'), R.always(lang = China)],
//   [R.equals('jp'), R.always(lang = Japan)],
//   [R.equals('en'), R.always(lang = English)],
//   [ R.T, R.always(lang = English) ]
// ])


switch (local) {
  case 'id':
    lang = Indonesia;
    break;
  case 'ch':
    lang = China;
    break;
  case 'jp':
    lang = Japan;
    break;
  case 'en':
    lang = English;
    break;
  default:
    lang = English;
}

const TranslationProvider = (props) => {
      const [locale, setLocale] = useState(local)
      const [messages, setMessages] = useState(lang);

      const handleLangChange = (e) => {
        const newLocale = e.target.value;
        
        setLocale(newLocale);
        
        // R.cond([
        //   // [R.equals('id'), R.always(console.log("ramda id"))],
        //   [R.equals('id'), R.always(setMessages(Indonesia))],
        //   // [R.equals('ch'), R.always(console.log("ramnda ch"))],
        //   [R.equals('ch'), R.always(setMessages(China))],
        //   [R.equals('jp'), R.always(setMessages(Japan))],
        //   [R.equals('en'), R.always(setMessages(English))],
        //   [ R.T, R.always(setMessages(English)) ]
        // ])
      
            switch (newLocale) {
              case 'id':
                setMessages(Indonesia)
                break;
              case 'ch':
                setMessages(China);
                break;
              case 'jp':
                setMessages(Japan);
                break;
              case 'en':
                setMessages(English);
                break;
              default:
                setMessages(English);
            }
            if (newLocale === 'en') {
                  setMessages(English)
            }
            if (newLocale === 'id') {
                  setMessages(Indonesia)
            }
      }
      
      return (
            <TranslationContext.Provider value={{ locale, handleLangChange }}>
                  <IntlProvider messages={messages} locale={locale}>
                        {props.children}
                  </IntlProvider>
            </TranslationContext.Provider>

      )
}

export default TranslationProvider;

