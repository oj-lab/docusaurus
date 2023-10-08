# Swag API Document Generation

OJ Lab use [swag](https://github.com/swaggo/swag) to generate Rest API document.

## Issue tracking

### Can not referencing object in other package

Check the generate command of swag. You may need to update the command:

```sh
# 👎 From
swag init -d application/server -ot go -o application/server/swaggo-gen
# 👍 To
swag init -d application/server,service/model -ot go -o application/server/swaggo-gen
```

Which means you might forget to add the object's package (in this case is `service/model`) to the `-d` option.
