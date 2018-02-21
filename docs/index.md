# Datasweet Formula

Datasweet Formula makes it possible to calculate a metric in real time, based on any existing metrics, in a Kibana standard visualization. It allows to create pretty much any calculation, from simple ratios to more complex, chained treatments.

![tutorial-datasweet-formula](img/tutorial-datasweet-formula.gif)

## Usage
Select the metrics you need as input to your formula, then : 

* Add new metric > select _Datasweet Formula_
* Type your formula in the input textbox as follow : `aggX + aggY`, where X and Y are the #id attributed by Kibana to the metric you want as input.
* You can apply functions to your calculation : `avg(aggX + aggY)`
* Functions are chainables :  `floor(avg(aggX + aggY))`
* You can use a previously set formula as input for a new one.

## Credits

Datasweet Formula is built on [Javascript Expression Evaluator](https://silentmatt.com/javascript-expression-evaluator/) by Silent Matt.

## Questions ? problems ? suggestions ?
If you find a bug or want to request a feature, please create a [GitHub Issue](https://github.com/datasweet-fr/kibana-datasweet-formula/issues/new).

