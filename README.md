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
## How to Get your userId
#### 자신의 asked 주소에서 f12를 누르고, CTRL + SHIFT + C를 누릅니다
#### 팔로우 버튼을 선택합니다
![image](https://user-images.githubusercontent.com/88186573/156020502-e28226d6-0ac4-4013-8e7b-88c1dd150026.png)
#### 위 이미지에서 fw_OOOOOOOOO에서 fw_를 제외한 값이 ID입니다
