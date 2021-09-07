import React, { useState } from 'react'
import { IntlProvider } from 'react-intl'
import English from '../data/Languages/en.json'
import Indonesia from '../data/Languages/id.json'

export const Context = React.createContext()

const local = navigator.language;

let lang;
if (local === 'en') {
      lang = English
} else {
      lang = Indonesia
}

const TranslationProvider = (props) => {
      const [locale, setLocale] = useState(local)
      const [messages, setMessages] = useState(lang);

      const handleLangChange = (e) => {
            const newLocale = e.target.value;
            setLocale(newLocale);
            if (newLocale === 'id') {
                  setMessages(Indonesia)
            } else {
                  setMessages(English)
            }
      }
      
      return (
            <Context.Provider value={{ locale, handleLangChange }}>
                  <IntlProvider messages={messages} locale={locale}>
                        {props.children}
                  </IntlProvider>
            </Context.Provider>

      )
}

export default TranslationProvider;

