import React, { useRef, useState } from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";

export default ({ children, events, ...others }) => {
  const flicking = useRef<Flicking>();
  const [loggedEvents, setEvents] = useState<Array<{ eventType: string; count: number }>>([]);

  let lastEvt = null;

  const evtHandlers = events.reduce((handlers, evtName) => {
    const reactHandlerName = `on${evtName[0].toUpperCase()}${evtName.slice(1)}`;

    handlers[reactHandlerName] = evt => {
      if (lastEvt !== evt.eventType) {
        setEvents((evts) => [...evts, { eventType: evt.eventType, count: 1 }]);
      } else {
        setEvents((evts) => [...evts.slice(0, evts.length - 1), { eventType: evts[evts.length - 1].eventType, count: evts[evts.length - 1].count + 1 }]);
      }

      lastEvt = evt.eventType;
    };

    return handlers;
  }, {});

  return <div>
    <Flicking ref={flicking} {...evtHandlers} {...others}>
      { children }
      <ViewportSlot>
        <div className="field is-grouped is-grouped-multiline">
          {
            loggedEvents.map((evt, idx) => <div className="control mr-2 mb-1" key={idx}>
              <div className="bulma-tags has-addons">
                <span className="bulma-tag is-info">{evt.eventType}</span>
                <span className="bulma-tag is-dark">{evt.count}</span>
              </div>
            </div>)
          }
        </div>
        <div></div>
      </ViewportSlot>
    </Flicking>
  </div>;
};
