import { Accordion as AccordionPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
interface Props extends ComponentProps<typeof AccordionPrimitive.Trigger> {
    /** Heading level for the wrapping Accordion.Header (`aria-level`). */
    level?: 1 | 2 | 3 | 4 | 5 | 6;
}
declare const AccordionTrigger: import("svelte").Component<Props, {}, "">;
type AccordionTrigger = ReturnType<typeof AccordionTrigger>;
export default AccordionTrigger;
