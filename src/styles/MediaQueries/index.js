// breakpoints
const sizes = {
      tablet: [600, 959], //MD
      laptop: [960, 1279], //LG
      desktop: [1280, 1919], //XL
      ultraWide: [1920], //XXL
}


const MD = `@media screen and (min-width:${sizes.tablet[0]}px)`
const LG = `@media screen and (min-width:${sizes.laptop[0]})`
const XL = `@media screen and (min-width:${sizes.desktop[0]})`
const XXL = `@media screen and (min-width:${sizes.ultraWide[0]})`

export { MD, LG, XL, XXL }