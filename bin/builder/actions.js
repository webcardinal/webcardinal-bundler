const WebCardinal = require('./index');

/**
 * buildComponents
 * @description Builds and merges all @webcardinal/<component>s and @cardinal/<component>s.
 *
 * @param {Object} action
 * @param {Object} dependency
 * @param {Function} callback
 */
function buildComponents(action, dependency, callback) {
    let src = action.src || dependency.src;
    let target = action.target;
    // WebCardinal.Builder has default values for src and target

    let options = action.options || { DEV: false, devComponents: null };

    const runner = require('octopus');
    const tasks = [...runner.tasks];
    const { Builder, TAG } = WebCardinal;

    const build = async () => {
        try {
            const builder = new Builder(runner, src, target, options);
            if (!options.devComponents) {
                // build all and merge (default)
                await builder.build();
                await builder.copy();
                await builder.merge();
            } else {
                // targeted build (development use only)
                await builder.build(options.devComponents);
                await builder.copy(options.devComponents);
            }
            console.log(TAG, 'buildWebCardinalComponents command finished.');
        } catch (error) {
            console.error(TAG, error);
        }
    }

    build()
        .then(() => callback(null, '', { tasks }))
        .catch(callback);
}

function bundleComponents(action, dependency, callback) {
    let src = action.src || dependency.src;
    let target = action.target;
    let options = action.options || {};
    let availableBundles;

    const runner = require('octopus');
    const tasks = [...runner.tasks];
    const { Builder, TAG } = WebCardinal;

    for (const key of ["targetedBundle", "availableBundles"]) {
        if (typeof options[key] !== 'string') {
            callback(`${TAG} "${key}" omited from options of bundleWebCardinalComponents!`);
            return;
        }
    }

    try {
        const path = require('path');
        const availableBundlesPath = path.resolve(options.availableBundles);
        console.log(TAG, `Reading bundles from "${availableBundlesPath}"`);
        availableBundles = require(availableBundlesPath)
    } catch (error) {
        callback(error);
    }

    if (typeof availableBundles !== 'object') {
        callback(`${TAG} "availableBundles" could not be resolved!`);
        return;
    }

    if (!Object.keys(availableBundles).includes(options.targetedBundle)) {
        callback(`${TAG} The targetedBundle "${options.targetedBundle}" not found in "bundles.json"!`);
        return;
    }

    const run = async () => {
        try {
            const builder = new Builder(runner, src, target, options);
            const components = availableBundles[options.targetedBundle];

            await builder.prerelease(components);
            await builder.merge(components)
        } catch (error) {
            console.error(TAG, error);
        }
    }

    run()
        .then(() => callback(null, '', { tasks }))
        .catch(callback);
}

module.exports = {
    buildComponents,
    bundleComponents
}