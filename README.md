# cli-client

`juji` is a simple command line client for [Juji platform](https://juji.io). Juji
platform enables organizations to easily create chatbots to engage their
audience and to understand their audience through data analytics.

The source code of this project is intended to show the usage of Juji API. The
code is written in Javascript on Node.js. Please consult [Juji API reference](https://docs.juji.io/api) for description of the Juji API.

In this client, the following commands can be used:

```console
$ juji help
Usage: juji [options] [command]

Simple Juji client

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  chat <url>     chat with a Juji bot
  login          login to Juji
  logout         logout from Juji
  upload         upload data to Juji for analysis
  query          issue GraphQL query to Juji
  help [cmd]     display help for [cmd]
```

## Login and logout

Login to obtain a token from Juji, and the encrypted token is saved on disk.
Subsequent queries need this token in the request header.

Logout clears the token.

```console
$ juji help login
Usage: juji-login [options]

Login to Juji

Options:
  -e, --email <email>        email address used for Juji account
  -p, --password <password>  password for Juji account
  -j, --juji [host]          Juji host (default: "https://juji.io")
  -h, --help                 output usage information

Examples:
  juji login -e mvp@mycorp.com -p secret
```

## GraphQL query and mutation

After login, `juji query` command can be used to send query and mutation to Juji
GraphQL endpoint.

Query string is passed in as is, and the variables need to be the fields of a JSON string. The results is in a JSON document.

```console
$ juji help query
Usage: juji-query [options] <query>

Issue GraphQL query to Juji

Options:
  -v, --variables [variables]  supplies GraphQL variables in JSON format
  -h, --help                   output usage information

Examples:
  juji query '{getBrands {name}}'
  juji query -v '{"brandName": "mycorp"}' 'query engagements($brandName:
  String!) {getEngagementsByBrand(brandName: $brandName) {name order status}}'
```

For example, the first example query above returns something like this:

```json
{
  "getBrands": [
    {
      "name": "mycorp"
    }
  ]
}
```

Then the second example query above returns something like this:

```json
{
  "getEngagementsByBrand": [
    {
      "name": "Test Analytics",
      "order": 1,
      "status": "active"
    },
    {
      "name": "AI App 2",
      "order": 2,
      "status": "active"
    }
  ]
}
```
