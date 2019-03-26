# Datasweet Formula : a real time calculated metric plugin
[![GitHub stars](https://img.shields.io/github/stars/datasweet/kibana-datasweet-formula.svg)](https://github.com/datasweet/kibana-datasweet-formula/stargazers)
[![GitHub license](https://img.shields.io/github/license/datasweet/kibana-datasweet-formula.svg)](https://github.com/datasweet/kibana-datasweet-formula/blob/master/LICENSE)

[![datasweet-logo](docs/img/datasweet.png)](http://www.datasweet.fr)

Hi all !
We are Datasweet, a french startup providing full service (big) data solutions. We tweaked Kibana to fit our needs. We are happy to release Datasweet Formula, a real time calculated metric plugin, that works on any standard Kibana visualization. Check out what it can do in the [documentation.](http://www.datasweet.fr/datasweet-formula/)

# Example : simple ratio calculation

![tutorial-datasweet-formula](docs/img/tutorial-datasweet-formula.gif)

# Installation
This plugin is supported by : 
 - Kibana 6.4.x
 - Kibana 5.6

Copy the last installation url for your version of Kibana from the [repository releases](https://github.com/datasweet/kibana-datasweet-formula/releases/latest).
```
./bin/kibana-plugin install  https://github.com/datasweet-fr/kibana-datasweet-formula/releases/download/version_name/datasweet_formula-X.X.X_kibana-major.minor.patch.zip
```

# Features
Check out what it can do in the [documentation.](http://www.datasweet.fr/datasweet-formula/)

# Development

See the [kibana contributing guide](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md) for instructions setting up your development environment. Once you have completed that, use the following yarn scripts.

  - `yarn kbn bootstrap`

    Install dependencies and crosslink Kibana and all projects/plugins.

    > ***IMPORTANT:*** Use this script instead of `yarn` to install dependencies when switching branches, and re-run it whenever your dependencies change.

  - `yarn start`

    Start kibana and have it include this plugin. You can pass any arguments that you would normally send to `bin/kibana`

      ```
      yarn start --elasticsearch.url http://localhost:9220
      ```

  - `yarn build`

    Build a distributable archive of your plugin.

  - `yarn test:browser`

    Run the browser tests in a real web browser.

  - `yarn test:server`

    Run the server tests using mocha.

For more information about any of these commands run `yarn ${task} --help`. For a full list of tasks checkout the `package.json` file, or run `yarn run`.

# Questions ? problems ? suggestions ?
If you find a bug or want to request a feature, please create a [GitHub Issue](https://github.com/datasweet/kibana-datasweet-formula/issues/new).

# Credits
Datasweet Formula is built on [Javascript Expression Evaluator](https://silentmatt.com/javascript-expression-evaluator/) by Silent Matt.

# Contributors
<table>
 <tr>
  <td align="center"><a href="https://github.com/gmatheus"><img src="https://avatars0.githubusercontent.com/u/16384428?s=100&v=4" width="100" /><br><sub><b>Gustavo Matheus</b></a></td>
  <td align="center"><a href="https://github.com/itamarm10"><img src="https://avatars0.githubusercontent.com/u/41620871?s=100&v=4" width="100"/><br /><sub><b>itamarm10</b></sub></a></td>
  <td align="center"><a href="https://github.com/joeyJsonar"><img src="https://avatars0.githubusercontent.com/u/33907626?s=100&v=4" width="100"/><br /><sub><b>joeyJsonar</b></sub></a></td>
 </tr>
</table>

# License
```
This software is licensed under the Apache License, version 2 ("ALv2"), quoted below.

Copyright 2017-2018 Datasweet <http://www.datasweet.fr>

Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
```
