# Making View

This document will guide you through the process of creating a new view in
[OJ Lab front](https://github.com/oj-lab/frontend)
.

You will get to know with three main directories:
`/layouts`, `/pages` and `/components`.
So that you can understand how the view is structured and what kind of codes you need to provide in each directory.

:::tip

We will discuss the usage of
[React Hooks](https://reactjs.org/docs/hooks-intro.html) and state management
in some parts of the document.

If you are not familiar with React Hooks, you can check the official documentation.

:::

## Main Directories

### Layouts

Layout is a fundamental part of the view,
it usually provides `header`, `footer`, `sidebar`, `nav` and other common components.
In another word, layout is something it usually doesn't change between different pages.

The `/layouts` directory contains the layout components.
Currently, OJ Lab front has only one layout,
so all the components are placed in the root of the directory
(If we have more layouts in the future, we will create subdirectories for each layout).

In OJ Lab front's `Router.tsx`,
the layout component wraps other pages through React Router's [Outlet](https://reactrouter.com/en/main/components/outlet).

```tsx
// In Layout.tsx
<div>
    {!props.children && <Outlet />}
</div>

// In Router.tsx
<Route path="/" element={<Layout />}>
    <Route path="" element={<Navigate replace to="/problems" />} />
    {/* Other routes */}
</Route>
```

### Pages

Pages compose the main content of the view by combining different components and hooking in necessary states.

```tsx
const Judge: React.FC = () => {
  const uid = useParams().uid as string;
  const { getJudge } = useJudge(uid);

  const judge = getJudge();

  return (
    judge && (
      <div className="grid gap-4 overflow-x-auto">
        <div className="h-fit rounded border border-base-content/10 bg-base-100">
          <JudgeTable data={[judge]} />
        </div>
        <MarkdownRender content={getCodeBlock(judge.language, judge.code)} />
      </div>
    )
  );
};
```

In this example, we get the judge data by using the `useJudge` hook.
The judge data is got by calling backend's API
and then passed to the `JudgeTable` and `MarkdownRender` components.
When the judge data is ready, the page will render the components.

### Components

Components are reusable pieces of code that can be used in different pages.

:::warning

There are some special circumstances where you need to use state in components.
For example, the monaco editor component needs to change it's theme and size according to window settings.

But usually, components should be stateless.

:::

In OJ Lab front, components are classified into `control`,
`display`, `input`, `navigation` four categories.

- `control` components are used to control the view, such as buttons, dropdowns, etc.
- `display` components are used to display data, such as tables, cards, etc.
- `input` components are used to get user input, such as forms, inputs, etc.
- `navigation` components are used to navigate between pages, such as breadcrumbs, menus, etc.

```tsx
export interface UserMenuAction {
  name: string;
  href?: string;
  onClick?: () => void;
}

export interface UserMenuProps {
  avatarUrl?: string;
  actions?: Array<UserMenuAction>;
}

/**
 * @param {string} props.avatarUrl
 * @param {Array<{ name: string, href: string }>} props.navigation The name of navigation will be translated.
 */
const UserMenu: React.FC<UserMenuProps> = (props) => {
```

When working on a new view, you should first check if there are any existing components that can be reused.
Then, if a new component is needed, you should design the props to pass into the component.

## Tools

### Tailwind CSS

OJ Lab front uses [Tailwind CSS](https://tailwindcss.com/) as the main CSS framework.
You can control the style of each component in a regular way by simply adding inline Tailwind CSS classes.
With VSCode's [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension,
writing Tailwind CSS classes becomes much easier.

You may also need to use `joinClass` utility function to dynamically add classes to a component.

```tsx
<div
    className={joinClasses(
        "dropdown dropdown-end",
        open && "dropdown-open",
    )}
    onClick={() => {
        setOpen(!open);
    }}
>
```

:::tip

There are also many other useful utility functions
which can be used in different parts of the project
in the `utils` directory.

:::

## Best Practices

You should avoid using too many inline logic in the TSX code.
Instead, you should extract the logic into hooks or functions.

```tsx
const ProblemActions: React.FC<ActionsProps> = (props) => {
  const onClickDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    props.onClickDelete();
    const modal = document.getElementById(
      "delete_confirm_modal",
    ) as HTMLDialogElement;
    modal?.showModal();
  };

  return (
    <div className="flex space-x-1">
      <button className="btn btn-square btn-ghost btn-sm rounded hover:bg-primary/20">
        <PencilIcon className="h-5 w-5 text-primary" />
      </button>
      <button
        className="btn btn-square btn-ghost btn-sm rounded hover:bg-error/20"
        onClick={onClickDelete}
      >
        <TrashIcon className="h-5 w-5 text-error" />
      </button>
    </div>
  );
};
```

In this example, the `onClickDelete` function is extracted from the `onClick` event handler.
