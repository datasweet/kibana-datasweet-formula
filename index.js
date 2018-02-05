export default kibana => new kibana.Plugin({
  id: 'datasweet_formula',
  require: ['kibana'],
  uiExports: {
    hacks: [ 'plugins/datasweet_formula/formula_hack' ]
  }
});