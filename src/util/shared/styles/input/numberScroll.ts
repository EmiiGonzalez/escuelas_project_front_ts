export const customNumberInputStyles = {
  // Eliminar flechas en navegadores WebKit
  '& input[type=number]': {
    WebkitAppearance: 'none',
    MozAppearance: 'textfield',
    appearance: 'textfield',
  },
  // Evitar el scroll
  '& input[type=number]::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  '& input[type=number]::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  }
};
