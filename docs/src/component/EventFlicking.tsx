import React, { useRef, useState } from "react";
import Flicking, { EVENTS } from "@egjs/react-flicking";

export default ({ children, ...others }) => {
  const flicking = useRef<Flicking>();
  const [events, setEvents] = useState<string[]>([]);

  let lastEvt = EVENTS.READY;

  return <div>
    <Flicking ref={flicking} {...others} onReady={() => {
      Object.keys(EVENTS).forEach(key => {
        const eventName = EVENTS[key];

        flicking.current.on(eventName, evt => {
          if (evt.eventType === EVENTS.HOLD_START) {
            setEvents(() => [evt.eventType]);
          } else if (lastEvt !== evt.eventType) {
            setEvents((evts) => [...evts, evt.eventType]);
          }

          lastEvt = evt.eventType;
        });
      });
    }}>
      { children }
    </Flicking>
    <div>{
      events.map((evt, idx) => <span className="bulma-tag mr-2 is-info" key={idx}>{evt}</span>)
    }</div>
  </div>;
};
