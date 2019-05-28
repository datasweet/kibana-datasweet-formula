export default kibana => new kibana.Plugin({
  name: 'datasweet_formula',
  require: ['kibana'],
  uiExports: {
    hacks: [ 'plugins/datasweet_formula/formula_hack' ]
  }
});