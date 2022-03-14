const octopus = require('octopus/ActionsRegistry');
const WebCardinal = require('../builder/actions');

const defaultActionsRegistry = octopus.getRegistry();

defaultActionsRegistry.registerActionHandler('buildWebCardinalComponents', WebCardinal.buildComponents);
defaultActionsRegistry.registerActionHandler('bundleWebCardinalComponents', WebCardinal.bundleComponents);

require('../../node_modules/octopus/scripts/run');