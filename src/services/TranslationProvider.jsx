import React, { useState } from 'react'
import { IntlProvider } from 'react-intl'
import English from '../data/Languages/en.json'
import Indonesia from '../data/Languages/id.json'

export const TranslationContext = React.createContext()

const local = navigator.language;

let lang;

if (local === 'id') {
      lang = Indonesia
} else {
      lang = English
}

const TranslationProvider = (props) => {
      const [locale, setLocale] = useState(local)
      const [messages, setMessages] = useState(lang);

      const handleLangChange = (e) => {
            const newLocale = e.target.value;
            setLocale(newLocale);
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

