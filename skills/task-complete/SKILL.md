---
name: task-complete
description: 'Task is complete. Prepares MR/PR title and description. Removes task.md file.'
---

First, check if the task.md file is present in the repository. If not, ask user what to do. You may proceed based on the context if requested.

Second, check if there are any uncommitted changes in the repository. If there are, offer to commit first. Do not continue with uncommitted changes. Do not commit with `--no-verify` flag unless user explicitly requests it.

Based on the task.md file and any information in your context prepare a title and description of the changes for the merge request/pull request.

Title should have the format `ABC-123: Title` and use Title Case.

Description should start with a link to the task.md file. Build the link based on git remote. It should be to a specific commit (most recent one before removing). Examples: [task.md](https://gitlab.com/repo-path/-/blob/commit-hash/PROCESS.md) or [task.md](https://github.com/repo-path/blob/commit-hash/task.md) followed by empty line and the rest of the description. Ommit link if task.md file is not present.

Provide title in blocks like this:

```
... title ...
```

```md
... description ...
```

If task.md file is present, create commit that removes task.md file.

Offer user to push but do not do it without user's confirmation.

After pushing provide a link to the merge request/pull request or link to create one as markdown link.
