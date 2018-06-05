export const colors = [
    { colorName: 'default',     rgbValue: '205,215,197'}, //off-white
    { colorName: 'Black',       rgbValue: '0,0,0'}, //black
    { colorName: 'Blue',        rgbValue: '0,0,127'}, //blue
    { colorName: 'Green',       rgbValue: '0,147,0'}, //green
    { colorName: 'LightRed',    rgbValue: '255,0,0'}, //light red
    { colorName: 'Brown',       rgbValue: '127,0,0'}, //brown
    { colorName: 'Purple',      rgbValue: '156,0,156'}, //purple
    { colorName: 'Orange',      rgbValue: '252,127,0'}, //orange
    { colorName: 'Yellow',      rgbValue: '255,255,0'}, //yellow
    { colorName: 'LightGreen',  rgbValue: '0,252,0'}, //light green
    { colorName: 'Cyan',        rgbValue: '0,147,147'}, //cyan
    { colorName: 'LightCyan',   rgbValue: '0,255,255'}, //light cyan
    { colorName: 'LightBlue',   rgbValue: '0,0,252'}, //light blue
    { colorName: 'Pink',        rgbValue: '255,0,255'}, //pink
    { colorName: 'Grey',        rgbValue: '127,127,127'}, //grey
    { colorName: 'White',       rgbValue: '255,255,255'} //white
  //{ colorName: 'LightGrey',   rgbValue: '210,210,210'} //light grey
]

export const fonts = [
    'Kavivanar',
    'Tajawal',
    'Source Sans Pro',
    'Indie Flower',
    'Inconsolata',
    'Dosis',
    'Quicksand',
    'Josefin Sans',
    'Abel',
    'Dancing Script',
    'Exo',
    'Kanit',
    'Ropa Sans',
    'Courgette',
    'Permanent Marker',
    'Orbitron',
    'Concert One',
    'Fredoka One',
    'Luckiest Guy',
    'Jura',
    'Kalam',
    'Marck Script',
    'Audiowide',
    'VT323',
    'Architects Daughter'
]

//accepts a color name string (from above) and returns a string (eg '65,65,180') for use with styling. if the string isn't found it returns the 'default' color
export const colorNameToRGB = (name) => {
    const rgb = colors.filter(color => name == color.colorName)[0];
    if (rgb) {
        return rgb.rgbValue;
    } else {
        return colors[0].rgbValue;
    }
}