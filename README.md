# VRoggy Server


| Routes | Type | Querries | Success Response | Failed Response |
|:------:|:----:|:--------:|:----------------:|:---------------:|
|/users/ |GET   | -        |**200**:<br> `[{gameId: String, highScore: Number}]` |**400**:<br> `{error: "Error Message}`
|/users/ |POST   |**Body**:<br> `{gameId: String}`  |**201**:<br> `[{gameId: String, highScore: Number}]` |**400**:<br> `{error: "Error Message}`|
|/users/:gameId |GET   |**Params**:<br> `{gameId: String}`    |**200**:<br> `{gameId: String, highScore: Number}` |**400**:<br> `{error: "Error Message}`|
|/users/:gameId |PATCH   | **Params**:<br>`{gameId: String}` <br> **Body**:<br> `{highScore: Number}`|**201**:<br> `{gameId: String, highScore: Number}` |**400**:<br> `{error: "Error Message}`|