---
name: xfive-remote-repo-code-review
description: Review code from GitHub pull requests or GitLab merge requests using CLI tools. ALWAYS use this skill when the user mentions: review a PR, review a MR, review pull request, review merge request, code review, check PR, check MR, look at PR, look at MR, or any variation of reviewing remote repository changes.
compatibility: Requires GitHub CLI (gh) for GitHub repositories or GitLab CLI (glab) for GitLab repositories
---

# Remote Repository Code Review

This skill helps you review code from GitHub pull requests or GitLab merge requests by fetching diffs, descriptions, and comments using the appropriate CLI tool.

> **IMPORTANT**: You MUST follow ALL steps in this workflow in order, without skipping any. Steps 1–6 are all mandatory. Do not stop after presenting the review summary — you MUST complete step 6 and ask the user whether to post the review.

## Workflow

### 1. Identify Remote Repository

First, check which remote repository is connected to the current project:

```bash
git remote -v
```

Look at the remote URL to determine if it's GitHub or GitLab:
- GitHub URLs contain `github.com`
- GitLab URLs contain `gitlab.com` or other GitLab instance domains

**If the remote is neither GitHub nor GitLab**, inform the user that this skill only supports GitHub and GitLab repositories and ask if they would like to proceed with a different approach.

### 2. Verify CLI Installation

Check if the appropriate CLI tool is installed:

**For GitHub:**
```bash
gh --version
```

**For GitLab:**
```bash
glab --version
```

**If the CLI is not installed**, inform the user that the required CLI tool is missing and provide installation instructions:
- GitHub CLI: https://cli.github.com/
- GitLab CLI: https://gitlab.com/gitlab-org/cli

Ask if they would like to install it or proceed with an alternative approach.

### 3. Fetch Pull Request or Merge Request Details

**For GitHub Pull Requests:**

Ask the user for the PR number if not already provided, then fetch the details:

```bash
# View PR details
gh pr view <PR_NUMBER>

# Get the diff
gh pr diff <PR_NUMBER>

# List comments
gh pr view <PR_NUMBER> --comments
```

**For GitLab Merge Requests:**

Ask the user for the MR number if not already provided, then fetch the details:

```bash
# View MR details
glab mr view <MR_NUMBER>

# Get the diff
glab mr diff <MR_NUMBER>

# List notes/comments
glab mr note list <MR_NUMBER>
```

### 4. Perform Code Review

Analyze the fetched information:
- Review the diff for code quality, potential bugs, security issues, and best practices
- Consider the PR/MR description and context
- Review existing comments to avoid duplicate feedback
- Check for:
  - Code style and consistency
  - Potential bugs or logic errors
  - Security vulnerabilities
  - Performance concerns
  - Missing tests or documentation
  - Breaking changes

### 5. Present Review Summary

Display a comprehensive review summary including:
- **Overview**: Brief summary of the changes
- **Positive aspects**: What's done well
- **Issues found**: Categorized by severity (critical, major, minor)
- **Suggestions**: Specific recommendations for improvement
- **Questions**: Any clarifications needed from the author

### 6. Post Review Comment (Required)

**You MUST always perform this step.** After presenting the review summary, you MUST ask the user:
> "Would you like me to post this review as a comment to the [pull request/merge request]?"

Do not end the workflow without asking this question.

**If the user agrees:**

**For GitHub:**
```bash
gh pr review <PR_NUMBER> --comment --body "<review_text>"
```

Or for more detailed reviews with specific feedback:
```bash
gh pr review <PR_NUMBER> --approve --body "<review_text>"
gh pr review <PR_NUMBER> --request-changes --body "<review_text>"
```

**For GitLab:**
```bash
glab mr note <MR_NUMBER> "<review_text>"
```

**If the user declines**, acknowledge and end the workflow.

## Gotchas

- **Authentication**: Both `gh` and `glab` require authentication. If commands fail with auth errors, the user needs to run `gh auth login` or `glab auth login` first.
- **Repository context**: CLI commands should be run from within the repository directory. If not in the repo, navigate there first or specify the repository using `--repo` flag.
- **Large diffs**: For very large PRs/MRs, consider reviewing specific files or sections rather than the entire diff at once.
- **Private repositories**: Ensure the user has appropriate access permissions to the repository.
- **Comment formatting**: When posting comments, escape special characters and consider using markdown formatting for better readability.

## Example Usage

**User request**: "Review PR #123"

**Workflow**:
1. Check remote: `git remote -v` → confirms GitHub
2. Verify CLI: `gh --version` → confirmed installed
3. Fetch PR: `gh pr view 123`, `gh pr diff 123`, `gh pr view 123 --comments`
4. Analyze the code changes
5. Present review summary
6. **Always ask**: "Would you like me to post this review as a comment to the pull request?"
7. If yes: `gh pr review 123 --comment --body "<summary>"`
