# WebCardinal bundles

The content of each bundle can be viewed in the table below:

<table>
<thead>
  <tr>
    <th>namespace</th>
    <th>package</th>
    <th colspan="5" align="center">bundle</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td></td>
    <td></td>
    <th><pre>webcardinal</pre></th>
    <th><pre>cardinal</pre></th>
    <th><pre>minimal </pre></th>
    <th><pre>wiki    </pre></th>
    <th><pre>all     </pre></th>
  </tr>
  <tr>
    <td>webcardinal</td>
    <td><a href="https://github.com/webcardinal/webcardinal-core">core</a></td>
    <td>✔️</td>
    <td>❌</td>
    <td>✔️</td>
    <td>✔️</td>
    <td>✔️</td>
  </tr>
  <tr>
    <td rowspan="5">cardinal</td>
    <td><a href="https://github.com/webcardinal/cardinal-barcode">barcode</a></td>
    <td>✔️</td>
    <td>✔️</td>
    <td>❌</td>
    <td>❌</td>
    <td>✔️</td>
  </tr>
  <tr>
    <td><a href="https://github.com/webcardinal/cardinal-core">core</a></td>
    <td>❌</td>
    <td>✔️</td>
    <td>❌</td>
    <td>❌</td>
    <td>✔️</td>
  </tr>
  <tr>
    <td><a href="https://github.com/webcardinal/cardinal-essentials">essentials</a></td>
    <td>✔️</td>
    <td>✔️</td>
    <td>❌</td>
    <td>✔️</td>
    <td>✔️</td>
  </tr>
  <tr>
    <td><a href="https://github.com/webcardinal/cardinal-forms">forms</a></td>
    <td>✔️</td>
    <td>✔️</td>
    <td>❌</td>
    <td>❌</td>
    <td>✔️</td>
  </tr>
  <tr>
    <td><a href="https://github.com/webcardinal/cardinal-wiki">wiki</a></td>
    <td>✔️</td>
    <td>✔️</td>
    <td>❌</td>
    <td>✔️</td>
    <td>✔️</td>
  </tr>
</tbody>
</table>

# How to use WebCardinal bundler?

## For a WebApp

1. Clone this repository

```bash
git clone https://github.com/webcardinal/webcardinal-bundler
```

2. Install it

```bash
npm install
```

3. Bring your desired bundle

```bash
npm run bundle-<BUNDLE_NAME>
# example npm run bundle-minimal
```

4. Obtain the distribution

```
npm run build
```

The generated distribution is now in `/webcardinal` directory.

## For a SSApp

In the `octopus.json` of your workspace.

1. Add WebCardinal as a dependency

```json
{
    "name": "webcardinal",
    "src": "https://github.com/webcardinal/webcardinal-bundler",
    "actions": [
        {
            "type": "smartClone",
            "target": ".",
            "collectLog": false
        },
        {
            "type": "execute",
            "cmd": "cd webcardinal && npm install && npm run bundle-<BUNDLE_NAME> && npm run build"
        }
    ]
}
```

2. Add distribution in a new Dossier in `build` script

```json
{
    "name": "webcardinal-wallet-build",
    "actions": [
        {
            "type": "execute",
            "cmd": "cd webcardinal && npm run build-dossier"
        }
    ]
}
```

## How to freeze deps HEADs when them are stable
1. git clone https://github.com/webcardinal/webcardinal-bundler
2. npm install
3. npm run release
4. npm run freeze
