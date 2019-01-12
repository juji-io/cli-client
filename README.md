# Juji Client

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
  -V, --version   output the version number
  -h, --help      output usage information

Commands:
  chat <url>      chat with a Juji bot
  login           login to Juji
  logout          logout from Juji
  analyze <file>  upload data to Juji for analysis
  query <query>   issue GraphQL query to Juji
  help [cmd]      display help for [cmd]
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

Query string is passed in as is, and the variables need to be the fields of a
JSON object string. The results, a JSON document, is printed to console.

```console
$ juji help query
Usage: juji-query [options] <query>

Issue GraphQL query to Juji

Options:
  -v, --variables [variables]  supplies GraphQL variables in JSON format
  -h, --help                   output usage information

Examples:
  juji query '{getBrands {name}}'
  juji query -v '{"brandName": "mycorp"}' 'query engagements($brandName: String!) {getEngagementsByBrand(brandName: $brandName) {name order status}}'
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

## Upload data to analyze

Juji can perform individual trait analysis based on the text an individual
wrote. The traits currently include big5 personality and many others.

CSV or JSON document containing id and text can be uploaded to Juji to obtain
trait analysis results.

```console
$ juji help analyze
Usage: juji-analyze [options] <file>

Upload a file to Juji for analysis

Options:
  -h, --help  output usage information

Input:
  The input file name should have either .json or .csv suffix. They should have similar structure: csv file should have two columns, the first being an id column, and the second a text column, and there should be no header; json file should be a vector of objects, where each object has two fields, an "id " and a "text"

Output:
  The output will be a csv file with a header, and column names are the name of traits. The output is printed directly to console.

Examples:
  juji analyze mytext.csv
  juji analyze mytext.json > result.csv
```
