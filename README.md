## example

```ts
import { RequestClient } from "./asked-client/dist/src";

const client = RequestClient.create();

(async () => {
    const form = {
        nickname: "riarisans",
        email: "riarisans12345@gmail.com",
        id: "riarisans12345",
        password: "qwe123",
    };

    await client.addComment("riarisans", "테스트");

    let cookie1 = await client.signUp(form);
    // let cookie2 = await client.signUp(); // Random name, email, id, password

    if (cookie1.success) {
        await client.follow(cookie1.result, 123456789 /* userId */);
    }
})();
```
