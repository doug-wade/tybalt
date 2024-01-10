const subscribedElements: Array<{ element: Element; events: Array<Event>; subscribed: Set<string> }> = [];
const dispatchEvent_original = EventTarget.prototype.dispatchEvent;
function dispatchEvent(event: Event) {
    for (const subscribedElement of subscribedElements) {
        if (!subscribedElement.subscribed.has(event.type)) {
            subscribedElement.element.addEventListener(event.type, (evt: Event) => {
                subscribedElement.events.push(evt);
            });
            subscribedElement.subscribed.add(event.type);
        }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore:next-line
    return dispatchEvent_original.apply(this, [event]);
}
EventTarget.prototype.dispatchEvent = dispatchEvent;

export default (elem: Element, events: Array<Event>) => {
    subscribedElements.push({ element: elem, events, subscribed: new Set() });
};
