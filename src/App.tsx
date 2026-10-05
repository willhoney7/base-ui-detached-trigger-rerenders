import * as React from 'react';
import { Popover } from '@base-ui/react/popover';
import { PreviewCard } from '@base-ui/react/preview-card';
import { Tooltip } from '@base-ui/react/tooltip';
import { Dialog } from '@base-ui/react/dialog';
import { Menu } from '@base-ui/react/menu';

const TRIGGER_COUNT = 3;
const triggerIndexes = Array.from({ length: TRIGGER_COUNT }, (_, index) => index);

/**
 * Returns a `render` prop for each trigger that counts how many times it renders and shows the
 * count in the trigger's label, so a re-render is visible without opening devtools.
 */
function createRenderCounter() {
  const counts = triggerIndexes.map(() => 0);

  return {
    button(index: number) {
      return (props: React.ComponentProps<'button'>) => {
        counts[index] += 1;
        return (
          <button {...props}>
            {props.children} <span className="count">renders: {counts[index]}</span>
          </button>
        );
      };
    },
    anchor(index: number) {
      return (props: React.ComponentProps<'a'>) => {
        counts[index] += 1;
        return (
          <a {...props}>
            {props.children} <span className="count">renders: {counts[index]}</span>
          </a>
        );
      };
    },
  };
}

const popoverHandle = Popover.createHandle();
const popoverCounter = createRenderCounter();

const previewCardHandle = PreviewCard.createHandle();
const previewCardCounter = createRenderCounter();

const tooltipHandle = Tooltip.createHandle();
const tooltipCounter = createRenderCounter();

const dialogHandle = Dialog.createHandle();
const dialogCounter = createRenderCounter();

const menuHandle = Menu.createHandle();
const menuCounter = createRenderCounter();

export function App() {
  return (
    <main>
      <h1>Base UI: detached triggers re-render when the popup opens or closes</h1>
      <p>
        Each group has one Root with a <code>handle</code> and three detached Triggers. Every
        trigger shows how many times it has rendered. Open and close the popup from{' '}
        <strong>Trigger 1</strong>, then look at Triggers 2 and 3: they re-render on every open and
        close even though nothing about them changed. Menu is included as a control; its inactive
        triggers don&apos;t re-render.
      </p>

      <section>
        <h2>Popover</h2>
        <p>
          Click Trigger 1, then press Escape. In v1.8.0 these counts also include a separate
          Popover-only cause, fixed in{' '}
          <a href="https://github.com/mui/base-ui/pull/5894">mui/base-ui#5894</a>.
        </p>
        <div className="triggers">
          {triggerIndexes.map((index) => (
            <Popover.Trigger
              key={index}
              handle={popoverHandle}
              render={popoverCounter.button(index)}
            >
              {`Trigger ${index + 1}`}
            </Popover.Trigger>
          ))}
        </div>
        <Popover.Root handle={popoverHandle}>
          <Popover.Portal>
            <Popover.Positioner sideOffset={8}>
              <Popover.Popup className="popup">Popover content</Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      </section>

      <section>
        <h2>Preview Card</h2>
        <p>Hover Trigger 1, then move the pointer away.</p>
        <div className="triggers">
          {triggerIndexes.map((index) => (
            <PreviewCard.Trigger
              key={index}
              handle={previewCardHandle}
              href="#"
              delay={0}
              closeDelay={0}
              render={previewCardCounter.anchor(index)}
            >
              {`Trigger ${index + 1}`}
            </PreviewCard.Trigger>
          ))}
        </div>
        <PreviewCard.Root handle={previewCardHandle}>
          <PreviewCard.Portal>
            <PreviewCard.Positioner sideOffset={8}>
              <PreviewCard.Popup className="popup">Preview card content</PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      </section>

      <section>
        <h2>Tooltip</h2>
        <p>
          Hover Trigger 1, then move the pointer away. Fixed in{' '}
          <a href="https://github.com/mui/base-ui/pull/5893">mui/base-ui#5893</a>.
        </p>
        <div className="triggers">
          {triggerIndexes.map((index) => (
            <Tooltip.Trigger
              key={index}
              handle={tooltipHandle}
              delay={0}
              closeDelay={0}
              render={tooltipCounter.button(index)}
            >
              {`Trigger ${index + 1}`}
            </Tooltip.Trigger>
          ))}
        </div>
        <Tooltip.Root handle={tooltipHandle}>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={8}>
              <Tooltip.Popup className="popup">Tooltip content</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </section>

      <section>
        <h2>Dialog</h2>
        <p>Click Trigger 1, then press Escape.</p>
        <div className="triggers">
          {triggerIndexes.map((index) => (
            <Dialog.Trigger key={index} handle={dialogHandle} render={dialogCounter.button(index)}>
              {`Trigger ${index + 1}`}
            </Dialog.Trigger>
          ))}
        </div>
        <Dialog.Root handle={dialogHandle}>
          <Dialog.Portal>
            <Dialog.Backdrop className="backdrop" />
            <Dialog.Popup className="popup dialog">
              <Dialog.Title>Dialog</Dialog.Title>
              <Dialog.Close>Close</Dialog.Close>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </section>

      <section>
        <h2>Menu (control)</h2>
        <p>Click Trigger 1, then press Escape. The counts on Triggers 2 and 3 don&apos;t change.</p>
        <div className="triggers">
          {triggerIndexes.map((index) => (
            <Menu.Trigger key={index} handle={menuHandle} render={menuCounter.button(index)}>
              {`Trigger ${index + 1}`}
            </Menu.Trigger>
          ))}
        </div>
        <Menu.Root handle={menuHandle}>
          <Menu.Portal>
            <Menu.Positioner sideOffset={8}>
              <Menu.Popup className="popup">
                <Menu.Item>Menu item</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </section>
    </main>
  );
}
