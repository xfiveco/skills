# Skills Repository

This repository contains local agent skills used to guide task workflows.

## Install With `skills` CLI

Use the [`skills` npm package](https://www.npmjs.com/package/skills) to install these skills.

```bash
# Install skills from this repository (interactive)
npx skills add xfiveco/skills
```

## Repository Layout

- `skills/plan-task/SKILL.md`
- `skills/task-complete/SKILL.md`
- `skills/xfive-figma-to-wordpress/SKILL.md`

Each skill lives in its own directory and is defined by a `SKILL.md` file.

## Included Skills

### `plan-task`

Reads `task.md`, scans the repository, captures discoveries, asks clarifying questions, and prepares a detailed implementation plan before coding.

### `task-complete`

Finalizes a completed task by preparing MR/PR title and description, handling `task.md` cleanup, and guiding the final push/open-PR step.

### `xfive-figma-to-wordpress`

Implement Figma designs. Create WordPress pages from Figma designs. Create WordPress blocks and components from Figma designs. Compliment Figma MCP server.

## Notes

- This is a workflow/configuration repository, not an application codebase.
- Add new skills under `skills/<skill-name>/SKILL.md`.
