# context

A Claude Code mod that shows the current chat's context size in the status line, next to the model picker and the usage meter:

```
context: 104k/1M
```

The first number is how many input tokens the last response was answered over; the second is the model's context window. It updates after every response. In a new chat, or right after a compaction, it shows `–` until the next response arrives. It reads the figures Claude Code already measures, so it costs no extra tokens or API calls.

## Install

At the prompt of a terminal session:

```
/plugin install context --marketplace marrvin2/claude-context
```

From a shell:

```
claude plugin install context --marketplace marrvin2/claude-context
```

In the Claude desktop app: click + next to the prompt box, then Plugins, Add marketplace with `marrvin2/claude-context`, then Add plugin.

## License

MIT
