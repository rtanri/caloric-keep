import Default from './Default'
import DarkMode from './DarkMode'

const Color = (color, theme) => {
    switch (theme){
        case 'default':
            return Default[color]
        case 'darkmode':
            return DarkMode[color]
        default:
            return Default[color]
    }
}


const Palette = theme => {
    switch(theme){
        case 'default':
            return Default
        case 'darkmode':
            return DarkMode
        default:
            return Default
    }
}

export {Color, Palette}