### Node-Moko

`Node-Moko` is used to generate configuration for [moco](https://github.com/dreamhead/moco), and it allows you to define `RESTFul` API(s) in seconds.

There is a related project for ruby [here](https://github.com/abruzzi/moko).

##### Installation

```sh
$ npm install node-moko -g
```

or 

```sh
$ npm install node-moko
```

#### define resources in node-moco

resource should be defined in file `moko.up`, the content of this file is just a simple json:

```json
{
    "user": {
        "id": "integer",
        "description": "string"
    },
    "listing": {
        "title": "string",
        "address": "string",
        "postcode": "integer"
    }
}
```

this configuration defined 2 resources: `users` and `listings`.

launch:

```sh
$ mokoup generate && mokoup server
```

if you installed `node-moko` locally, you should launch it by using:

```sh
$ ./node_modules/node-moko/bin/mokoup generate
$ ./node_modules/node-moko/bin/mokoup server
```
