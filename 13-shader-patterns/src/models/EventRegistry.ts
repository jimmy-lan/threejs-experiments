/**
 * A callback function type when an event is triggered.
 */
export type EventCallback = (...args: unknown[]) => void;
/**
 * A record of events, where multiple callbacks can be added for one event.
 */
export type EventsRecord = { [eventType: string]: EventCallback[] };

export class EventRegistry {
  constructor(public events: EventsRecord = {}) {}

  /**
   * Register event <eventType> with <callback>.
   * @param eventType Type of event to register.
   * @param callback A Callback function to be invoked when event
   *    <eventType> is triggered.
   */
  register = (eventType: string, callback: EventCallback): void => {
    const eventCallbacks = this.events[eventType] || [];

    // Prevent duplicate callbacks
    if (eventCallbacks.includes(callback)) {
      return;
    }

    eventCallbacks.push(callback);
    this.events[eventType] = eventCallbacks;
  };

  /**
   * Unregister event callback <callback> from event with type
   * <eventType> so that the callback is no longer called on this
   * event.
   * @param eventType Type of event to register.
   * @param callback Callback function to remove.
   */
  unregister = (eventType: string, callback: EventCallback): void => {
    const eventCallbacks = this.events[eventType];

    if (!eventCallbacks) {
      throw new Error(`Event type '${eventType}' is not registered.`);
    }

    this.events[eventType] = eventCallbacks.filter(
      (eventCallback) => eventCallback !== callback
    );
  };

  /**
   * Trigger event <eventType>.
   * @param eventType Type of event to be triggered.
   * @param args Event options to be passed to the callback function.
   */
  trigger = (eventType: string, ...args: unknown[]): void => {
    this.events[eventType]?.forEach((callback: EventCallback) =>
      callback(...args)
    );
  };
}
