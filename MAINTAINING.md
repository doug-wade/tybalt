# Contributing

Welcome to the team!

## How-tos

### Land a PR

There are, unfortunately, a few steps that need to take place when landing a pull request.

1. Merge the pr. Prefer rebase merging when possible, but squash merge if there's one with a lotta chatty commits, or if it can't be rebased due to conflicts.
2. Update the custom domain to be tybalt. This seems to be required every time the website is deployed.

### Publish a new release

Semantic versioning allows us to publish breaking changes in minor and patch versions before we
hit 1.0.0, so currently we're versioning all of our packages in lockstep (that is, all of the
version fields for all of the packages in the monorepo should have the same version). To update
the version, do a find-and-replace of "version": "0.0.x" with the new version. We don't need to
change the declared dependencies inside the monorepo because they declare a `workspace:^`
dependency, so yarn does the updating for us. Then, draft a new release in the Github UI,
creating a new tag called v0.0.x and publish it and the CI should do the rest! To sanity check
the release, you can update [tybalt-client](https://github.com/doug-wade/tybalt-client) to the
latest version and run the tests.
