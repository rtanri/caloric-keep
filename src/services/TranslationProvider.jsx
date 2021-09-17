import React, { useState } from 'react'
import { IntlProvider } from 'react-intl'
import English from '../data/Languages/en.json'
import Indonesia from '../data/Languages/id.json'
import China from '../data/Languages/ch.json'
import Japan from '../data/Languages/jp.json'

export const TranslationContext = React.createContext()

const local = navigator.language;

let lang;


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

// if (local === 'id') {
//       lang = Indonesia
// } elseif (local ) {
//       lang = English
// }

const TranslationProvider = (props) => {
      const [locale, setLocale] = useState(local)
      const [messages, setMessages] = useState(lang);

      const handleLangChange = (e) => {
            const newLocale = e.target.value;
            setLocale(newLocale);
        
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
            // if (newLocale === 'en') {
            //       setMessages(English)
            // }
            // if (newLocale === 'id') {
            //       setMessages(Indonesia)
            // }
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

