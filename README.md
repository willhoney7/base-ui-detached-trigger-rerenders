# Base UI: detached triggers re-render when the popup opens or closes

Reproduction for a Base UI issue: with detached triggers (one Root with a `handle`, many Triggers), opening or closing a Popover, Preview Card, Tooltip, or Dialog re-renders every trigger, including the ones that didn't open it. Menu is included as a control.

[Open in StackBlitz](https://stackblitz.com/github/willhoney7/base-ui-detached-trigger-rerenders)

Each trigger shows its render count in its label. Open and close a popup from Trigger 1 and watch the counts on Triggers 2 and 3.
