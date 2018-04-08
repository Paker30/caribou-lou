# caribou-lou-dao

This is the module that retrieves the resume information from mongo.

It has the next methods:
* find(section_id_name) -> returns the content of that section

It's required by caribou-lou-api.

## Usage

If you want to use the module just require it:

```
const DAO = require('caribou-lou-dao')(db);
```
