# Juji Client

[![npm version](https://badge.fury.io/js/juji-client.svg)](https://badge.fury.io/js/juji-client)

`juji` is a simple command line client for [Juji platform](https://juji.io). Juji
platform enables organizations to easily create chatbots to engage their
audience and to understand their audience through data analytics.

```console
npm install juji-client
```

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
  faq <file>      upload Q&A csv to engagement
  query <query>   issue GraphQL query to Juji
  help [cmd]      display help for [cmd]
```

## Chat

This client can be used to chat with the Web release of a Juji bot.

```console
$ juji chat
URL is required
Usage: juji-chat [options] <url>

Chat with a Juji bot. Does not require login.

Options:
  -f, --firstName <firstName>  first name (default: "Guest")
  -l, --lastName [lastName]    last name
  -e, --email [email]          email address
  -h, --help                   output usage information

Example:
  juji chat -f Mary https://juji.ai/pre-chat/mycorp/3
```

Currently, only text based chat is supported. GUI forms are not handled yet. A
sample chat session:

```console
$ juji chat -f John https://juji.ai/pre-chat/mycorp-962c7a5/2
=== Welcome to Juji Bot ===
Hey, John, it’s nice to connect again! I cannot wait to find out what you learned at school today.
What was your favorite subject studied today?
> i don't have a favorite
No favorite? It doesn't have to be your absolute favorite, just name one you enjoyed or would enjoy.
> ok, computer science
Sure thing. computer is my fav subject too.
Could you tell me why?
>
```

Authentication is not required to chat with Juji bots.

## Login and logout

The rest of the functionality of this client requires authentication.

Use email and password to login and obtain a token from Juji, and the encrypted token is saved on disk.
Subsequent queries need this token in the request header.

Logout clears the token.

```console
$ juji help login
Usage: juji-login [options]

Login to Juji

Options:
  -e, --email <email>        email address used for Juji account
  -p, --password <password>  password for Juji account
  -j, --juji [host]          Juji host (default: "https://juji.ai")
  -h, --help                 output usage information

Examples:
  juji login -e mvp@mycorp.com -p secret
```


## Upload data to analyze

Juji can perform individual trait analysis based on the text an individual
wrote. The traits currently include big5 personality and many others.

After login, CSV or JSON document containing id and text can be uploaded to Juji to obtain
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

## Upload Q&A csv to engagement

After login, user can upload Q&A csv to a specified engagement.

```console
$ juji help faq
Usage: juji-faq [options] <file>

Upload a file to update Juji Q&As. Requires login.

Options:
  -b, --brand <brand>             brand name of the engagement to update
  -e, --engagement-order <order>  engagement order of the engagement to update
  -op, --operation <operation>    specify the operation to carry out (default: "upload")
  -o, --overwrite                 whether to oevrwrite the existing Q&As
  -h, --help                      output usage information

Input:
  The input file name should have .csv suffix. Please follow the format described in https://juji.io/docs/design/#handle-free-text-qas. In addition, this client only support utf8 encoded file.

Output:
  The output will be operation status in json

Examples:
  juji faq -b mybrandid -e engagementorder -o my_faq.csv
```

## Upload config-doc edn or json to engagement

After login, user can upload config-doc to a specified engagement.

```console
$ juji help config
Usage: juji-config [options] <file>

Upload a file to update config-doc. Requires login.

Options:
  -op, --operation <operation>  specify the operation to carry out (default: "upload")
  -e, --engagement-id <id>      engagement id
  -j, --is-json                 indicate the data is in JSON format
  -h, --help                    output usage information

Input:
  The input file should be in Clojure EDN format or JSON format. Please follow the description in https://juji.io/docs/config-doc. In addition, this client only support utf8 encoded file.

Output:
  The output will be operation status in json

Examples:
  juji config -e my-engaement-id config-doc.edn
```

## GraphQL query and mutation

After login, `juji query` command can be used to send query and mutation to Juji
GraphQL endpoint. Consult Juji [GraphiQL](https://juji.ai/graphiql/graphiql.html) for
documentation on the available queries.

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

## Creating a new chat using only API, an example

This is useful if you have your own UI, and you would like to utilize Juji's powerful dialog management system. 

1. First you need to log in to your Juji account: 
```console
$ juji login -e my@email.com -p mypassword
```

2. Get your brand id if you don't have it: 
```console
$ juji query '{getMe {name}}'
```

3. At this point, you can either create a new engagement: 
```console
$ juji query 'mutation CreateEngagement{createEngagement(input: {brandName: "my-brand-id", name: "MY API BOT", useDefault: true}) {engagement{name, id, order, status}}}'
```
or you can use one of your existing engagements:
```console
$ juji query -v '{"brandName": "my-brand-id"}' 'query engagements($brandName: String!) {getEngagementsByBrand(brandName: $brandName) {name order status id}}’
```
Anyway, you will need to remember the engagement-id and engagement-order.

4. You can optionally update your config-doc if you want to customize your chatflow. The config-doc may be in EDN format:
```console
$ juji config -e "engagement-id" /path/to/config-doc.edn
```
or in JSON format:
```console
$ juji config -e "engagement-id" -j /path/to/config-doc.json
```
Refer to [Config-doc Guide](https://juji.io/docs/config-doc) on how to use config-doc to customize your chatflow.

5. You can optionally update your Q&As by upload your customized csv file:
```console
$ juji faq -b my-brand-id -e my-engagement-order -o /path/to/faqs.csv
```

6. Create a web release to deploy your engagement:
```console
$ juji query 'mutation CreateRelease{createRelease(input: {engagementId: "engagement-id", type: "web"}) {id, order, type}}'
```

7. Now your can either go to your web release to directly chat with it or use Juji API to connect to your chat interface. The url is `https://juji.ai/pre-chat/<engagement-id>` If you choose to use the API you can refer to the `juji chat` command above. To try it, just do
```console
$ juji chat -f <some-first-name> <chat-url>
```

You can continue to update your engagement after you have deployed. Follow step 4 and/or 5 to update your chatbot. Then, follow step 6 to create a new release so your change is updated to the chat url.