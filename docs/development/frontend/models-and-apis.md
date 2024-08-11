# Models and APIs

In this document, we will introduce how to use APIs
and how models help us safely constructing OJ Lab front's data transmission by TypeScript.

## Models

In OJ Lab front, models are classified into two types: `ServiceModel` and `ViewModel`.

- `ServiceModel` is expected to be exactly the format of the data returned by the backend APIs
- `ViewModel` on the other hand, provides a more user-friendly format for the front-end components.
They are usually transformed from the `ServiceModel` through `/pipes` module.

```ts
import { formatBytes, formatNanoSeconds } from "@/utils/unit";
import * as JudgeServiceModel from "@/models/service/judge";
import * as JudgeViewModel from "@/models/view/judge";

export const judgeVerdictPipe = (
  judgeVerdict: JudgeServiceModel.JudgeVerdict,
): JudgeViewModel.JudgeVerdict => {
  let verdict = judgeVerdict.verdict;
  let time_usage = formatNanoSeconds(judgeVerdict.time_usage.nanos);
  let memory_usage = formatBytes(judgeVerdict.memory_usage_bytes);

  return { verdict, time_usage, memory_usage };
};
```

In this example, we define a pipe function to transform the `JudgeServiceModel.JudgeVerdict` to `JudgeViewModel.JudgeVerdict` with `formatBytes` and `formatNanoSeconds` utility functions.

## APIs

For RESTful APIs, we use `axios` to send requests and handle responses.

```ts
export async function getCurrentUser(): Promise<UserServiceModel.UserInfo> {
  let res = await axiosClient.get<UserServiceModel.UserInfo>(
    "/api/v1/user/current",
  );
  if (res.status !== 200) {
    throw Error("failed to get current user");
  }
  return res.data;
}
```

`axiosClient` is a utility function that wraps `axios` with some default configurations.

### Use APIs in Hook

In OJ Lab front, we usually hook detailed APIs usage in customized hooks.

```ts
export const useJudge = (uid: string) => {
  const [judge, setJudge] = useState<JudgeServiceModel.JudgeInfo>();
  useEffect(() => {
    JudgeService.getJudge(uid)
      .then((res) => {
        setJudge(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [uid]);

  function getJudge() {
    return judge;
  }

  return { getJudge };
};
```

In the page component, we can use the `useJudge` hook to get the judge data and render the components.
This part of code has been introduced in [Making View](./making-view.md#pages).

### Use APIs in Redux Saga

A more advanced usage is to use APIs in Redux Saga.
This approach is usually used in global state management,
for example, getting the current user information when the app is initialized.

```ts
function* getCurrentUserSaga() {
  const user: UserServiceModel.UserInfo = yield call(getCurrentUser);
  yield put(setUserInfo(user));
}

const GetCurrentUserSagaPattern = "user/getCurrentUser/saga";

export const getCurrentUserAction: Action = {
  type: GetCurrentUserSagaPattern,
};

export function* watchGetUserInfo() {
  yield takeEvery(GetCurrentUserSagaPattern, getCurrentUserSaga);
}
```

Then in the layout component, we can dispatch the `getCurrentUserAction` to trigger the saga.

```tsx
const Layout: React.FC<LayoutProps> = (props) => {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ...
};
```

Finally, you can use the `useSelector` hook to get the user information in any component.

```tsx
const UserMenu: React.FC<UserMenuProps> = (props) => {
  // ...
  const userInfo = useSelector(userInfoSelector);
  const isLogined = userInfo !== undefined;

  // ...
};
```

## Best Practices

### Import with Alias

To avoid the confusion and conflicts of the same name modules,
we should use alias to import the models and APIs.

```ts
import * as JudgeServiceModel from "@/models/service/judge";
import * as JudgeService from "@/apis/judge";
```
