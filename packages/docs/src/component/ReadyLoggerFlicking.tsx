import React, { useRef, useState } from "react";
import Flicking, { EVENTS } from "@egjs/react-flicking";

export default ({ children, ...others }) => {
  const flicking = useRef<Flicking>();
  const [events, setEvents] = useState<string[]>([]);

  let lastEvt = null;
  let stopLogging = false;

  const evtHandlers = Object.keys(EVENTS).reduce((handlers, evtKey) => {
    const evtName = EVENTS[evtKey];
    const reactHandlerName = `on${evtName[0].toUpperCase()}${evtName.slice(1)}`;

    handlers[reactHandlerName] = evt => {
      if (stopLogging) return;

      if (lastEvt !== evt.eventType) {
        setEvents((evts) => [...evts, evt.eventType]);
      }

      lastEvt = evt.eventType;
    };

    return handlers;
  }, {});

  return <div>
    <Flicking ref={flicking} {...others} {...evtHandlers} onReady={e => {
      stopLogging = true;
      if (lastEvt !== e.eventType) {
        setEvents((evts) => [...evts, e.eventType]);
      }
    }}>
      { children }
    </Flicking>
    <div>
      <span className="bulma-tag mb-2 is-rounded is-medium">Events triggered</span>
      <div className="bulma-tags">
        {
          events.map((evt, idx) => <span className="bulma-tag mr-2 is-info" key={idx}>{evt}</span>)
        }
      </div>
    </div>
  </div>;
};
